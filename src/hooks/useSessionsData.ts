import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { fetchSessions } from '../lib/sessionApi';
import { listSessions, type StoredSession } from '../lib/storage';
import { useAuth } from './useAuth';
import type { AdapterKind } from '../types/interview';

export function sessionsQueryKey(adapter: AdapterKind, userId: string) {
  return ['sessions', adapter, userId] as const;
}

export function useSessionsData(adapter: AdapterKind) {
  const { user } = useAuth();
  const userKey = user?.id ?? 'guest';
  const queryKey = useMemo(() => sessionsQueryKey(adapter, userKey), [adapter, userKey]);

  const query = useQuery<StoredSession[]>({
    queryKey,
    queryFn: async () => {
      if (adapter === 'rest' && user) {
        try {
          return await fetchSessions();
        } catch (error) {
          console.warn('Falling back to local sessions:', error);
        }
      }
      return listSessions();
    },
    initialData: () => listSessions(),
    staleTime: 60_000,
  });

  return { ...query, queryKey };
}

export function useInvalidateSessions(adapter: AdapterKind) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: sessionsQueryKey(adapter, user?.id ?? 'guest'),
    });
}
