import { FieldObservationData } from '../types';

export function parseFieldObservation(message: string): FieldObservationData {
  const sections = message.split('____________________________________________________');
  
  return {
    sections: sections
      .map(section => {
        const trimmed = section.trim();
        if (!trimmed) return null;
        
        // Find content between quotes if it exists
        const matches = trimmed.match(/"([^"]+)":?\s*(.*)/s);
        if (matches) {
          const label = matches[1];
          const content = matches[2].trim();
          return {
            label,
            content
          };
        }
        
        // Handle sections without quotes
        const [label, ...contentParts] = trimmed.split('\n');
        return {
          label: label.replace(':', '').trim(),
          content: contentParts.join('\n').trim()
        };
      })
      .filter(Boolean)
  };
}