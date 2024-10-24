import React from 'react';

interface QuestionSectionProps {
  question: string;
  answer: string;
  details: string;
  className?: string;
}

export function QuestionSection({ question, answer, details, className = '' }: QuestionSectionProps) {
  return (
    <div className={`border-2 border-electric-blue rounded-lg p-4 mb-4 ${className}`}>
      <div className="bg-dark-blue bg-opacity-50 p-2 mb-2">
        <h3 className="text-xl font-bold text-electric-yellow">{question}</h3>
      </div>
      <div className="bg-blue-900 bg-opacity-30 p-3 rounded mb-2">
        <p className="font-bold text-electric-yellow">{answer}</p>
      </div>
      {details && (
        <div className="bg-blue-900 bg-opacity-30 p-3 rounded">
          <p className="text-electric-blue whitespace-pre-wrap">{details}</p>
        </div>
      )}
    </div>
  );
}