import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from './mocks/server';

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

type VoidCallback = () => void;
type UnknownCallback = (...args: unknown[]) => void;

class MockSpeechRecognition {
  continuous = false;
  interimResults = false;
  lang = 'en-US';
  onstart: VoidCallback | null = null;
  onresult: UnknownCallback | null = null;
  onerror: UnknownCallback | null = null;
  onend: VoidCallback | null = null;

  start() {
    this.onstart?.();
  }

  stop() {
    this.onend?.();
  }

  abort() {
    this.onend?.();
  }
}

type SpeechSynthesisHandler = () => void;

class MockSpeechSynthesisUtterance {
  text = '';
  lang = 'en-US';
  voice: SpeechSynthesisVoice | null = null;
  onstart: SpeechSynthesisHandler | null = null;
  onend: SpeechSynthesisHandler | null = null;
  onerror: SpeechSynthesisHandler | null = null;
  onboundary: SpeechSynthesisHandler | null = null;
  onmark: SpeechSynthesisHandler | null = null;
  onpause: SpeechSynthesisHandler | null = null;
  onresume: SpeechSynthesisHandler | null = null;

  constructor(text?: string) {
    if (text) this.text = text;
  }
}

interface MockSpeechSynthesis {
  speak: (utterance: MockSpeechSynthesisUtterance) => void;
  cancel: () => void;
  getVoices: () => SpeechSynthesisVoice[];
  onvoiceschanged: SpeechSynthesisHandler | null;
}

interface MockAnalyserNode {
  fftSize: number;
  smoothingTimeConstant: number;
  frequencyBinCount: number;
  getByteTimeDomainData: (array: Uint8Array) => void;
}

interface MockMediaStreamSource {
  connect: () => void;
}

class MockAudioContext {
  createAnalyser(): MockAnalyserNode {
    return {
      fftSize: 256,
      smoothingTimeConstant: 0.8,
      frequencyBinCount: 128,
      getByteTimeDomainData: () => undefined,
    };
  }

  createMediaStreamSource(): MockMediaStreamSource {
    return {
      connect: () => undefined,
    };
  }

  close() {
    return Promise.resolve();
  }
}

const testGlobals = globalThis as typeof globalThis & {
  SpeechRecognition: typeof MockSpeechRecognition;
  webkitSpeechRecognition: typeof MockSpeechRecognition;
  speechSynthesis: SpeechSynthesis & MockSpeechSynthesis;
  SpeechSynthesisUtterance: typeof SpeechSynthesisUtterance;
  AudioContext: typeof AudioContext;
};

testGlobals.SpeechRecognition = MockSpeechRecognition;
testGlobals.webkitSpeechRecognition = MockSpeechRecognition;

const speechSynthesisMock: SpeechSynthesis & MockSpeechSynthesis = {
  speak: () => undefined,
  cancel: () => undefined,
  getVoices: () => [],
  onvoiceschanged: null,
  paused: false,
  pending: false,
  speaking: false,
  addEventListener: () => undefined,
  removeEventListener: () => undefined,
  dispatchEvent: () => true,
  pause: () => undefined,
  resume: () => undefined,
};

testGlobals.speechSynthesis = speechSynthesisMock;

testGlobals.SpeechSynthesisUtterance =
  MockSpeechSynthesisUtterance as unknown as typeof SpeechSynthesisUtterance;
testGlobals.AudioContext = MockAudioContext as unknown as typeof AudioContext;

Object.defineProperty(navigator, 'mediaDevices', {
  writable: true,
  value: {
    getUserMedia: () =>
      Promise.resolve({
        getTracks: () => [{ stop: () => undefined }],
      }),
  } as Partial<MediaDevices> & {
    getUserMedia: () => Promise<{ getTracks: () => Array<{ stop: () => void }> }>;
  },
});
