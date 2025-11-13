import type { ApiError } from './apiTypes';

export interface ApiClientOptions {
  baseUrl: string;
  timeoutMs?: number;
  getAuthToken?: () => string | null;
  defaultRetry?: number;
}

export interface ApiRequestOptions extends RequestInit {
  retry?: number;
  skipAuth?: boolean;
}

const DEFAULT_TIMEOUT = 15_000;

export class ApiClient {
  private readonly baseUrl: string;
  private readonly timeoutMs: number;
  private readonly getAuthToken?: () => string | null;
  private readonly defaultRetry: number;

  constructor({ baseUrl, timeoutMs = DEFAULT_TIMEOUT, getAuthToken, defaultRetry = 1 }: ApiClientOptions) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.timeoutMs = timeoutMs;
    this.getAuthToken = getAuthToken;
    this.defaultRetry = defaultRetry;
  }

  async request<T>(path: string, init: ApiRequestOptions = {}): Promise<T> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    const attemptCount = init.retry ?? this.defaultRetry;
    let lastError: ApiError | null = null;

    const headers = {
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    } as Record<string, string>;

    if (!init.skipAuth && this.getAuthToken) {
      const token = this.getAuthToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    for (let attempt = 0; attempt <= attemptCount; attempt++) {
      try {
        const resp = await fetch(`${this.baseUrl}${path}`, {
          ...init,
          headers,
          signal: controller.signal,
        });

        if (!resp.ok) {
          const detail = await this.safeJson(resp);
          const detailMessage =
            detail && typeof detail.message === 'string'
              ? detail.message
              : undefined;
          const error: ApiError = {
            status: resp.status,
            message: detailMessage ?? `API ${resp.status}: ${resp.statusText}`,
          };
          lastError = error;
          if (resp.status >= 500 || resp.status === 429) {
            await this.delay(this.backoffMs(attempt));
            continue;
          }
          throw error;
        }

        clearTimeout(timeout);
        return (await resp.json()) as T;
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          lastError = { status: 0, message: 'Request timed out' };
        } else if (this.isApiError(error)) {
          lastError = error;
        } else {
          lastError = {
            status: 0,
            message: (error as Error).message || 'Network error',
          };
        }

        if (attempt >= attemptCount) {
          clearTimeout(timeout);
          throw lastError;
        }
        await this.delay(this.backoffMs(attempt));
      }
    }

    clearTimeout(timeout);
    throw lastError ?? { status: 0, message: 'Unknown error' };
  }

  private async safeJson(resp: Response): Promise<Record<string, unknown> | null> {
    try {
      return (await resp.json()) as Record<string, unknown>;
    } catch {
      return null;
    }
  }

  private isApiError(err: unknown): err is ApiError {
    return (
      !!err &&
      typeof err === 'object' &&
      'status' in err &&
      'message' in err
    );
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private backoffMs(attempt: number) {
    const base = 250;
    return base * 2 ** attempt;
  }
}

export function createApiClient(): ApiClient {
  const baseUrl =
    ((import.meta as unknown as { env?: { VITE_API_BASE_URL?: string } }).env?.VITE_API_BASE_URL ?? '/api');
  return new ApiClient({ baseUrl });
}
