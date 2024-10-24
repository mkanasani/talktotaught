import React from 'react';

interface FieldObservationFormProps {
  fieldObservationNumber: string;
  isFetchingSummary: boolean;
  onSubmit: () => void;
  onChange: (value: string) => void;
}

export function FieldObservationForm({
  fieldObservationNumber,
  isFetchingSummary,
  onSubmit,
  onChange,
}: FieldObservationFormProps) {
  return (
    <div className="mb-8 w-full max-w-md mx-auto text-center">
      <p className="text-white mb-4">
        You'll find the observation number in the email you received from Volty Alerts.
      </p>
      <input
        type="text"
        value={fieldObservationNumber}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter Field Observation Number"
        className="input mb-4 hover-glow text-center text-xl"
      />
      <button
        onClick={onSubmit}
        disabled={isFetchingSummary}
        className={`btn btn-primary w-full hover-spark ${isFetchingSummary ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isFetchingSummary ? 'PROCESSING...' : 'SUBMIT FIELD OBSERVATION NUMBER'}
      </button>
    </div>
  );
}