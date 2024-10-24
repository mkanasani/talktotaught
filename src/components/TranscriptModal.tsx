import React, { useState } from 'react';
import { X } from 'lucide-react';

interface TranscriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (transcript: string) => void;
}

export function TranscriptModal({ isOpen, onClose, onSubmit }: TranscriptModalProps) {
  const [transcript, setTranscript] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transcript.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(transcript);
      setTranscript('');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#111] w-full max-w-2xl mx-4 rounded-lg border-2 border-[#FFD700] p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-display font-bold text-[#FFD700]">Upload Meeting Transcript</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-[#FFD700] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Paste or type your meeting transcript here..."
            className="w-full h-64 bg-[#1A1A1A] text-white border-2 border-[#FFD700] 
                     rounded-lg p-4 focus:outline-none focus:border-[#FFA500] transition-colors
                     resize-none font-sans"
          />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-6 rounded-lg text-lg font-display font-bold
                       bg-[#1A1A1A] text-white border-2 border-[#FFD700]
                       hover:border-[#FFA500] transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !transcript.trim()}
              className={`py-3 px-6 rounded-lg text-lg font-display font-bold
                       transition-all duration-300 flex items-center
                       ${isSubmitting || !transcript.trim()
                         ? 'bg-[#FFA500] text-black cursor-not-allowed opacity-75'
                         : 'bg-[#FFD700] text-black hover:bg-[#FFA500] hover:shadow-[0_0_25px_rgba(255,215,0,0.5)]'
                       }`}
            >
              {isSubmitting ? 'Uploading...' : 'Upload Transcript'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}