import React from 'react';
import { X } from 'lucide-react';

interface ViewTranscriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  transcript: string | null;
}

export function ViewTranscriptModal({ isOpen, onClose, transcript }: ViewTranscriptModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#111] w-full max-w-2xl mx-4 rounded-lg border-2 border-[#FFD700] p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-display font-bold text-[#FFD700]">Meeting Transcript</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-[#FFD700] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="bg-[#1A1A1A] rounded-lg p-4 mb-6 h-96 overflow-y-auto border-2 border-[#FFD700]">
          {transcript ? (
            <pre className="text-white whitespace-pre-wrap font-sans text-lg leading-relaxed">
              {transcript}
            </pre>
          ) : (
            <p className="text-gray-400 text-center">No transcript available</p>
          )}
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="py-3 px-6 rounded-lg text-lg font-display font-bold
                     bg-[#FFD700] text-black hover:bg-[#FFA500]
                     transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,215,0,0.5)]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}