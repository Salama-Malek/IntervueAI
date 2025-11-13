/**
 * Control buttons for interview session
 */

import { PrimaryButton } from '../../design-system/components/PrimaryButton';

interface ControlsBarProps {
  isInterviewActive: boolean;
  onStart: () => void;
  onStop: () => void;
  onExport: () => void;
  canStart: boolean;
}

export function ControlsBar({
  isInterviewActive,
  onStart,
  onStop,
  onExport,
  canStart,
}: ControlsBarProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {!isInterviewActive ? (
        <PrimaryButton
          label="Begin Session"
          onClick={onStart}
          disabled={!canStart}
          aria-label="Start interview"
        />
      ) : (
        <PrimaryButton label="End Session" variant="danger" onClick={onStop} aria-label="Stop interview" />
      )}
      <PrimaryButton
        label="Export JSON"
        variant="ghost"
        onClick={onExport}
        disabled={isInterviewActive}
        aria-label="Export session as JSON"
      />
    </div>
  );
}
