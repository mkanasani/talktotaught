import React from 'react';
import { Process } from '../types';

interface ProcessCardProps {
  process: Process;
  isProcessing: boolean;
  isCompleted: boolean;
  webhookMessage?: string;
  onRunProcess: () => void;
  isSignedIn: boolean;
}

export function ProcessCard({
  process,
  isProcessing,
  isCompleted,
  webhookMessage,
  onRunProcess,
  isSignedIn,
}: ProcessCardProps) {
  return (
    <div className="bg-[#111] border-2 border-[#FFD700] rounded-lg p-6 hover:border-[#FFA500] transition-all duration-300">
      <div className="flex items-center mb-6">
        <div className="bg-[#FFD700] bg-opacity-20 p-3 rounded-full mr-4">
          {React.cloneElement(process.icon as React.ReactElement, {
            className: 'w-8 h-8 text-[#FFD700]',
          })}
        </div>
        <h3 className="text-2xl font-display font-semibold text-[#FFD700]">
          {process.name}
        </h3>
      </div>
      <p className="text-white mb-6 text-lg">{process.description}</p>
      <button
        onClick={onRunProcess}
        disabled={isProcessing || isCompleted}
        className={`w-full py-4 px-6 rounded-lg text-xl font-display font-bold transition-all duration-300
          ${isCompleted
            ? 'bg-green-600 text-white'
            : isProcessing
            ? 'bg-[#FFA500] text-black cursor-not-allowed opacity-75'
            : 'bg-[#FFD700] text-black hover:bg-[#FFA500] hover:shadow-[0_0_25px_rgba(255,215,0,0.5)]'
          }`}
      >
        {isCompleted ? 'COMPLETED' : isProcessing ? 'PROCESSING...' : process.action}
      </button>
      {isCompleted && webhookMessage && (
        <div className="mt-4 p-4 bg-[#1A1A1A] bg-opacity-50 rounded-lg border border-[#FFD700]">
          <p className="text-white text-sm">{webhookMessage}</p>
        </div>
      )}
    </div>
  );
}