/**
 * Hook for RMS-based microphone activity detection
 */

import { useCallback, useEffect, useRef, useState } from 'react';

const RMS_THRESHOLD = 0.01; // Adjust based on testing
const SMOOTHING_FACTOR = 0.8;

export function useRmsGate(stream: MediaStream | null) {
  const [isActive, setIsActive] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const cleanup = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (audioContextRef.current) {
      const ctx = audioContextRef.current;
      audioContextRef.current = null;
      ctx.close().catch(() => {});
    }
    analyserRef.current = null;
  }, []);

  useEffect(() => {
    if (!stream) {
      cleanup();
      setIsActive(false);
      return;
    }

    // Create audio context and analyser
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = SMOOTHING_FACTOR;

    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);

    audioContextRef.current = audioContext;
    analyserRef.current = analyser;

    // Start monitoring RMS
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    function checkRms() {
      if (!analyserRef.current) return;

      analyserRef.current.getByteTimeDomainData(dataArray);

      // Calculate RMS
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        const normalized = (dataArray[i] - 128) / 128;
        sum += normalized * normalized;
      }
      const rms = Math.sqrt(sum / dataArray.length);

      setIsActive(rms > RMS_THRESHOLD);

      animationFrameRef.current = requestAnimationFrame(checkRms);
    }

    checkRms();

    return () => {
      source.disconnect();
      cleanup();
    };
  }, [cleanup, stream]);

  return isActive;
}
