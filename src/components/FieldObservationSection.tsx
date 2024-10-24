import React from 'react';

interface FieldObservationSectionProps {
  title: string;
  content: string;
  className?: string;
}

export function FieldObservationSection({ title, content, className = '' }: FieldObservationSectionProps) {
  return (
    <div className={`border-2 border-electric-blue rounded-lg p-4 mb-4 ${className}`}>
      <div className="bg-dark-blue bg-opacity-50 p-2 mb-2">
        <h3 className="text-xl font-bold text-electric-yellow">{title}</h3>
      </div>
      <div className="bg-blue-900 bg-opacity-30 p-3 rounded">
        <p className="text-electric-blue whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}