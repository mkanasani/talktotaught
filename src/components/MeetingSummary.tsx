import React, { useState } from 'react';
import { FileText, Upload, Eye } from 'lucide-react';
import { TranscriptModal } from './TranscriptModal';
import { ViewTranscriptModal } from './ViewTranscriptModal';

interface MeetingSummaryProps {
  isFetchingMeetingSummary: boolean;
  meetingSummary: string | null;
  onFetchSummary: () => void;
  onUploadTranscript: (transcript: string) => void;
  fieldObservationNumber: string;
}

export function MeetingSummary({
  isFetchingMeetingSummary,
  meetingSummary,
  onFetchSummary,
  onUploadTranscript,
  fieldObservationNumber,
}: MeetingSummaryProps) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewTranscript, setViewTranscript] = useState<string | null>(null);
  const [isLoadingTranscript, setIsLoadingTranscript] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleViewTranscript = async () => {
    setIsLoadingTranscript(true);
    setError(null);
    
    try {
      const response = await fetch(
        'https://hook.us1.make.com/y1b0o51a5ep8b3jaqqveqj427tnv9mjl',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fieldObservationNumber,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch transcript');
      }

      const data = await response.text();
      try {
        const jsonData = JSON.parse(data);
        setViewTranscript(jsonData.message || data);
      } catch {
        setViewTranscript(data);
      }
      setIsViewModalOpen(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch transcript');
    } finally {
      setIsLoadingTranscript(false);
    }
  };

  const handleUploadTranscript = async (transcript: string) => {
    try {
      const response = await fetch(
        'https://hook.us1.make.com/zoua8uleumvl5bakno59dksorxv7kwi4',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fieldObservationNumber,
            transcript,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to upload transcript');
      }

      const data = await response.text();
      onUploadTranscript(data);
      setIsUploadModalOpen(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to upload transcript');
    }
  };

  return (
    <div className="w-full vw-100 bg-[#111] border-2 border-[#FFD700] rounded-lg p-6 my-8">
      <div className="flex items-center mb-6">
        <div className="bg-[#FFD700] bg-opacity-20 p-3 rounded-full mr-4">
          <FileText className="w-8 h-8 text-[#FFD700]" />
        </div>
        <h3 className="text-2xl font-display font-semibold text-[#FFD700]">
          Meeting Summary
        </h3>
      </div>
      
      <div className="space-y-6 w-full">
        {!meetingSummary ? (
          <button
            onClick={onFetchSummary}
            disabled={isFetchingMeetingSummary}
            className={`w-full py-4 px-6 rounded-lg text-xl font-display font-bold transition-all duration-300
              ${isFetchingMeetingSummary
                ? 'bg-[#FFA500] text-black cursor-not-allowed opacity-75'
                : 'bg-[#FFD700] text-black hover:bg-[#FFA500] hover:shadow-[0_0_25px_rgba(255,215,0,0.5)]'
              }`}
          >
            {isFetchingMeetingSummary ? 'FETCHING SUMMARY...' : 'FETCH MEETING SUMMARY'}
          </button>
        ) : (
          <div className="bg-[#1A1A1A] bg-opacity-50 p-6 rounded-lg border-2 border-[#FFD700]">
            <pre className="text-white whitespace-pre-wrap text-lg leading-relaxed font-sans">
              {meetingSummary}
            </pre>
          </div>
        )}

        {error && (
          <div className="bg-red-900 bg-opacity-70 text-red-200 p-4 rounded-lg border border-red-500">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-6 mt-6">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="py-4 px-6 rounded-lg text-xl font-display font-bold transition-all duration-300 
                     bg-[#333] text-white hover:bg-[#444] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]
                     flex items-center justify-center border-2 border-[#FFD700] hover:border-[#FFA500]"
          >
            <Upload className="w-6 h-6 mr-3" />
            UPLOAD TRANSCRIPT
          </button>
          <button
            onClick={handleViewTranscript}
            disabled={isLoadingTranscript}
            className={`py-4 px-6 rounded-lg text-xl font-display font-bold transition-all duration-300 
                     flex items-center justify-center border-2 border-[#FFD700] hover:border-[#FFA500]
                     ${isLoadingTranscript
                       ? 'bg-[#FFA500] text-black cursor-not-allowed opacity-75'
                       : 'bg-[#333] text-white hover:bg-[#444] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]'
                     }`}
          >
            <Eye className="w-6 h-6 mr-3" />
            {isLoadingTranscript ? 'LOADING...' : 'VIEW TRANSCRIPT'}
          </button>
        </div>
      </div>

      <TranscriptModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSubmit={handleUploadTranscript}
      />

      <ViewTranscriptModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        transcript={viewTranscript}
      />
    </div>
  );
}