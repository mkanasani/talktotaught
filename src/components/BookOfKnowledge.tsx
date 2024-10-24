import React from 'react';
import { Book, Lock } from 'lucide-react';

interface BookOfKnowledgeProps {
  onSignIn: () => void;
}

export function BookOfKnowledge({ onSignIn }: BookOfKnowledgeProps) {
  return (
    <div className="process-card">
      <div className="flex items-center mb-4">
        <div className="bg-high-voltage-yellow bg-opacity-20 p-3 rounded-full mr-4">
          <Book className="w-8 h-8 text-high-voltage-yellow" />
        </div>
        <h3 className="text-2xl font-semibold text-high-voltage-yellow hover-spark">
          Book of Knowledge
        </h3>
      </div>
      <p className="text-white mb-4">Access our comprehensive knowledge base and best practices</p>
      <button
        onClick={onSignIn}
        className="btn btn-secondary w-full hover-spark flex items-center justify-center font-bold"
      >
        <Lock className="w-4 h-4 mr-2" />
        SIGN IN TO ACCESS
      </button>
    </div>
  );
}