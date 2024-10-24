export interface FieldObservationSection {
  label: string;
  content: string;
}

export interface FieldObservationData {
  sections: FieldObservationSection[];
}

export interface Process {
  name: string;
  icon: React.ReactNode;
  description: string;
  action: string;
  recordId: string;
  requiresSignIn?: boolean;
}