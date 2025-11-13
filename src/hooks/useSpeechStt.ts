/**
 * Hook for Speech-to-Text using Web Speech API
 */

import { useEffect, useRef, useState, useCallback } from 'react';

export interface SttResult {
  text: string;
  isFinal: boolean;
}

export interface UseSpeechSttReturn {
  isListening: boolean;
  interimText: string;
  start: () => void;
  stop: () => void;
  isSupported: boolean;
}

export function useSpeechStt(
  language: string,
  onFinal: (text: string) => void
): UseSpeechSttReturn {
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Check if Web Speech API is supported
  const isSupported =
    'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;

  const start = useCallback(() => {
    if (!isSupported) {
      console.warn('Speech recognition not supported');
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language;

    recognition.onstart = () => {
      setIsListening(true);
      setInterimText('');
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript;
        } else {
          interim += transcript;
        }
      }

      if (interim) {
        setInterimText(interim);
      }

      if (final) {
        setInterimText('');
        onFinal(final);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'no-speech' || event.error === 'network') {
        recognition.stop();
        setTimeout(() => {
          if (recognitionRef.current === recognition) {
            recognition.start();
          }
        }, 200);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      setInterimText('');
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [isSupported, language, onFinal]);

  const stop = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
    setInterimText('');
  }, []);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return {
    isListening,
    interimText,
    start,
    stop,
    isSupported,
  };
}
