/**
 * Main interview room component
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { InterviewAdapter, InterviewConfig } from '../adapters/AdapterTypes';
import { LocalWebSpeechAdapter } from '../adapters/LocalWebSpeechAdapter';
import { RestLLMAdapter } from '../adapters/RestLLMAdapter';
import { useSpeechStt } from '../hooks/useSpeechStt';
import { useSpeechTts } from '../hooks/useSpeechTts';
import { useRmsGate } from '../hooks/useRmsGate';
import { generateId } from '../lib/ids';
import type { Utterance } from '../lib/summarize';
import { calculateSummary, type SessionSummary } from '../lib/summarize';
import { saveSession } from '../lib/storage';
import { persistSession } from '../lib/sessionApi';
import { MicGateIndicator } from './MicGateIndicator';
import { TranscriptList } from './TranscriptList';
import { ControlsBar } from './ControlsBar';
import { ReportPanel } from './ReportPanel';
import { useAuth } from '../hooks/useAuth';
import { sessionsQueryKey } from '../hooks/useSessionsData';
import type { AdapterKind } from '../types/interview';

interface InterviewRoomProps {
  config: InterviewConfig;
  adapter: AdapterKind;
  onSessionStateChange?: (isActive: boolean) => void;
}

export function InterviewRoom({ config, adapter, onSessionStateChange }: InterviewRoomProps) {
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [transcript, setTranscript] = useState<Utterance[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [summary, setSummary] = useState<SessionSummary | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function createAdapter(kind: AdapterKind): InterviewAdapter {
    return kind === 'rest' ? new RestLLMAdapter() : new LocalWebSpeechAdapter();
  }

  const adapterRef = useRef<InterviewAdapter>(createAdapter(adapter));
  const sessionIdRef = useRef<string | null>(null);
  const createdAtRef = useRef<string | null>(null);
  const resumeSttRef = useRef(false);
  const isActiveRef = useRef(isInterviewActive);
  const transcriptRef = useRef<Utterance[]>([]);
  const listeningRef = useRef(false);
  const handleFinalRef = useRef<(text: string) => void>(() => {});
  const queryClient = useQueryClient();
  const { user } = useAuth();

  useEffect(() => {
    isActiveRef.current = isInterviewActive;
  }, [isInterviewActive]);

  useEffect(() => {
    transcriptRef.current = transcript;
  }, [transcript]);

  const stt = useSpeechStt(config.language, (text) => handleFinalRef.current(text));
  const tts = useSpeechTts(config.language);
  const sttStart = stt.start;
  const sttStop = stt.stop;
  const ttsStop = tts.stop;
  const ttsSupported = tts.isSupported;

  useEffect(() => {
    listeningRef.current = stt.isListening;
  }, [stt.isListening]);

  const speakWithGate = useCallback(
    (text: string, resumeAfterSpeech: boolean) => {
      resumeSttRef.current = resumeAfterSpeech;
      if (stt.isListening) {
        stt.stop();
      }
      tts.speak(text, {
        onEnd: () => {
          if (resumeSttRef.current && isActiveRef.current) {
            stt.start();
          }
          resumeSttRef.current = false;
        },
      });
    },
    [stt, tts]
  );

  const isActive = useRmsGate(stream);

  const handleFinal = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || !isInterviewActive) return;

      const userUtterance: Utterance = {
        id: generateId(),
        speaker: 'user',
        text: trimmed,
        startedAt: Date.now(),
        endedAt: Date.now(),
      };

      const withUser = [...transcriptRef.current, userUtterance];
      transcriptRef.current = withUser;
      setTranscript(withUser);

      try {
        const reply = await adapterRef.current.onUserFinal(trimmed);

        const aiUtterance: Utterance = {
          id: generateId(),
          speaker: 'ai',
          text: reply.text,
          startedAt: Date.now(),
          endedAt: Date.now(),
        };

        const updatedTranscript = [...withUser, aiUtterance];
        transcriptRef.current = updatedTranscript;
        setTranscript(updatedTranscript);

        const shouldResumeListening = listeningRef.current;
        speakWithGate(reply.text, shouldResumeListening);

        try {
          const sessId = sessionIdRef.current ?? generateId();
          sessionIdRef.current = sessId;
          const createdAt = createdAtRef.current ?? new Date().toISOString();
          createdAtRef.current = createdAt;
          const snapshot = calculateSummary(updatedTranscript);
          saveSession({
            id: sessId,
            config,
            transcript: updatedTranscript,
            metrics: snapshot,
            createdAt,
          });
        } catch (e) {
          // ignore auto-save errors
        }
      } catch (error) {
        console.error('Error processing user response:', error);
        setErrorMessage(
          (error as Error)?.message || 'Failed to process response with adapter.'
        );
      }
    },
    [config, isInterviewActive, speakWithGate]
  );

  useEffect(() => {
    handleFinalRef.current = handleFinal;
  }, [handleFinal]);

  const handleStart = useCallback(async () => {
    try {
      // Request microphone
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setStream(mediaStream);

      // Initialize adapter
      await adapterRef.current.initialize(config);

      // Prepare session identifiers
      sessionIdRef.current = generateId();
      createdAtRef.current = new Date().toISOString();

      // Get first question
      const firstQuestion = await adapterRef.current.getFirstQuestion();

      const systemUtterance: Utterance = {
        id: generateId(),
        speaker: 'system',
        text: 'Interview started',
        startedAt: Date.now(),
        endedAt: Date.now(),
      };

      const aiUtterance: Utterance = {
        id: generateId(),
        speaker: 'ai',
        text: firstQuestion.text,
        startedAt: Date.now(),
        endedAt: Date.now(),
      };

      const initialTranscript = [systemUtterance, aiUtterance];
      setTranscript(initialTranscript);
      transcriptRef.current = initialTranscript;
      setIsInterviewActive(true);
      onSessionStateChange?.(true);
      setErrorMessage(null);

      if (ttsSupported) {
        speakWithGate(firstQuestion.text, true);
      } else {
        sttStart();
      }
    } catch (error) {
      console.error('Error starting interview:', error);
      setErrorMessage(
        (error as Error)?.message ||
          'Failed to start interview. Check microphone permissions and backend API availability.'
      );
    }
  }, [config, onSessionStateChange, speakWithGate, sttStart, ttsSupported]);

  const handleStop = useCallback(() => {
    resumeSttRef.current = false;
    // Stop STT and TTS
    sttStop();
    ttsStop();

    // Stop microphone
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }

    // Add system message
    const systemUtterance: Utterance = {
      id: generateId(),
      speaker: 'system',
      text: 'Interview stopped',
      startedAt: Date.now(),
      endedAt: Date.now(),
    };

    const updatedTranscript = [...transcriptRef.current, systemUtterance];
    transcriptRef.current = updatedTranscript;
    setTranscript(updatedTranscript);

    // Calculate summary
    const sessionSummary = calculateSummary(updatedTranscript);
    setSummary(sessionSummary);

    setIsInterviewActive(false);
    onSessionStateChange?.(false);

    // Cleanup adapter
    adapterRef.current.cleanup();

    // Persist session locally
    try {
      const id = sessionIdRef.current ?? generateId();
      const createdAt = createdAtRef.current ?? new Date().toISOString();
      saveSession({ id, config, transcript: updatedTranscript, metrics: sessionSummary, createdAt });

      const remoteSessionId = sessionIdRef.current;
      if (adapter === 'rest' && remoteSessionId) {
        persistSession({
          sessionId: remoteSessionId,
          config,
          transcript: updatedTranscript,
          summary: sessionSummary,
          createdAt,
        }).catch((error) => {
          console.warn('Failed to persist session remotely:', error);
          setErrorMessage(
            (error as Error)?.message || 'Could not sync session with backend.'
          );
        });
      }

      queryClient.invalidateQueries({
        queryKey: sessionsQueryKey(adapter, user?.id ?? 'guest'),
      });
    } catch (e) {
      console.warn('Failed to save session locally:', e);
    }
  }, [adapter, config, onSessionStateChange, queryClient, stream, sttStop, ttsStop, user?.id]);

  const handleExport = useCallback(() => {
    const exportData = {
      config,
      transcript,
      metrics: summary || calculateSummary(transcript),
      createdAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `intervueai_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [config, transcript, summary]);

  // Keyboard shortcut: Space to toggle listening
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && isInterviewActive) {
        e.preventDefault();
        if (stt.isListening) {
          stt.stop();
        } else {
          stt.start();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isInterviewActive, stt]);

  const canStart = stt.isSupported && tts.isSupported;

  return (
    <div className="flex min-h-[70vh] flex-col gap-6 text-white">
      {errorMessage && (
        <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-100" role="alert">
          <div className="flex items-start justify-between gap-4">
            <p>{errorMessage}</p>
            <button
              className="text-xs text-red-200 underline"
              onClick={() => setErrorMessage(null)}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
      {!canStart && (
        <div
          className="rounded-2xl border border-yellow-300/30 bg-yellow-400/10 p-4 text-yellow-100"
          role="alert"
        >
          <strong>Unsupported Browser:</strong> Your browser does not support
          Web Speech API (STT/TTS). You can still view the scripted questions,
          but voice interaction will not work. Please use Chrome or Edge over
          HTTPS.
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
        <MicGateIndicator isActive={isActive} isListening={stt.isListening} />
        <ControlsBar
          isInterviewActive={isInterviewActive}
          onStart={handleStart}
          onStop={handleStop}
          onExport={handleExport}
          canStart={canStart}
        />
      </div>

      <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Live feed</p>
            <h2 className="text-2xl font-semibold">Transcript</h2>
          </div>
          <div className="text-xs text-white/50">
            {isInterviewActive ? 'Capturing responses' : 'Idle'}
          </div>
        </div>
        <div className="h-[60vh] overflow-y-auto rounded-2xl border border-white/5 bg-black/30 p-4">
          <TranscriptList
            transcript={transcript}
            interimText={stt.interimText}
          />
        </div>
      </div>

      {summary && <ReportPanel summary={summary} />}
    </div>
  );
}
