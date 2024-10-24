import React from 'react';
import { FieldObservationData } from '../types';

interface FieldObservationSummaryProps {
  data: FieldObservationData;
  onConfirm?: () => void;
  onReject?: () => void;
  showActions?: boolean;
}

export function FieldObservationSummary({
  data,
  onConfirm,
  onReject,
  showActions = false,
}: FieldObservationSummaryProps) {
  const renderWorkTask = (section: { label: string; content: string }) => (
    <div className="border-2 border-high-voltage-yellow rounded-lg mb-4 hover-transform">
      <div className="bg-industrial-dark p-4">
        <h3 className="text-2xl font-bold text-high-voltage-yellow text-center hover-spark">
          {section.content}
        </h3>
      </div>
    </div>
  );

  const renderObservationOverview = (section: { label: string; content: string }) => (
    <div className="border-2 border-high-voltage-yellow rounded-lg mb-4 hover-transform">
      <div className="p-6">
        <p className="text-white whitespace-pre-wrap text-justify leading-relaxed">
          {section.content}
        </p>
      </div>
    </div>
  );

  const renderQuestionSection = (section: { label: string; content: string }) => {
    const [answer, ...contentParts] = section.content.split('\n');
    const details = contentParts.join('\n').trim();

    return (
      <div className="border-2 border-high-voltage-yellow rounded-lg h-full flex flex-col hover-transform">
        <div className="bg-industrial-dark p-4">
          <h4 className="text-xl font-bold text-high-voltage-yellow text-center hover-spark">
            {section.label}
          </h4>
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <div className="mb-4">
            <p className="text-2xl font-bold text-high-voltage-yellow text-center hover-spark">
              {answer}
            </p>
          </div>
          {details && (
            <div className="flex-grow">
              <p className="text-white whitespace-pre-wrap text-justify leading-relaxed">
                {details}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const workTaskSection = data.sections.find(s => s.label.includes('Work Task'));
  const observationSection = data.sections.find(s => s.label.includes('Observation Overview'));
  const questionSections = data.sections.filter(s => 
    !s.label.includes('Work Task') && 
    !s.label.includes('Observation Overview')
  );

  return (
    <div className="space-y-6">
      {workTaskSection && renderWorkTask(workTaskSection)}
      {observationSection && renderObservationOverview(observationSection)}
      
      <div className="relative">
        <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2">
          <div className="h-1 bg-high-voltage-yellow rounded-full shadow-[0_0_10px_rgba(255,215,0,0.5)]"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        {questionSections.map((section, index) => (
          <div key={index} className="h-full">
            {renderQuestionSection(section)}
          </div>
        ))}
      </div>

      {showActions && (
        <div className="mt-8 flex justify-center space-x-6">
          <button onClick={onConfirm} className="btn btn-primary hover-spark font-bold">
            Yes, Proceed
          </button>
          <button onClick={onReject} className="btn btn-secondary hover-spark font-bold">
            No, Enter Again
          </button>
        </div>
      )}
    </div>
  );
}