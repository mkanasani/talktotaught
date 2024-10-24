import React, { useState } from 'react';
import {
  AlertCircle,
  BookOpen,
  Users,
  FileCheck,
  Zap,
  FileSpreadsheet,
  Book,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { Process } from './types';
import { ProcessCard } from './components/ProcessCard';
import { FieldObservationForm } from './components/FieldObservationForm';
import { FieldObservationSummary } from './components/FieldObservationSummary';
import { MeetingSummary } from './components/MeetingSummary';
import { BookOfKnowledge } from './components/BookOfKnowledge';
import { parseFieldObservation } from './utils/parseFieldObservation';

const processes: Process[] = [
  {
    name: 'First Alert Notification',
    icon: <AlertCircle className="w-6 h-6" />,
    description: 'Initiate Immediate Team Response',
    action: 'ALERT SME',
    recordId: 'reccs3VBTTsW4GqM3',
  },
  {
    name: 'Investigation Prep',
    icon: <BookOpen className="w-6 h-6" />,
    description: 'Automate gathering of Facts',
    action: 'CREATE WORKBOOK',
    recordId: 'recDjrwboCsxquWXc',
  },
  {
    name: 'Investigation Meeting',
    icon: <Users className="w-6 h-6" />,
    description: 'Gather your Investigation Experts and SME',
    action: 'GENERATE MEETING INVITE',
    recordId: 'recQeqSeTRN8esBhJ',
  },
  {
    name: 'RCA Prep',
    icon: <FileSpreadsheet className="w-6 h-6" />,
    description: 'Automate the Investigation Documentation',
    action: 'CREATE RCA INVESTIGATION WORKBOOK',
    recordId: 'reclsUo5Bh4GbKiN8',
  },
  {
    name: 'Root Cause Analysis',
    icon: <FileCheck className="w-6 h-6" />,
    description: 'Get to the Bottom of it',
    action: 'GENERATE RCA',
    recordId: 'recgZwhznog8RWTyt',
  },
  {
    name: 'Lessons Learned',
    icon: <Zap className="w-6 h-6" />,
    description: 'Share your insights - Lead from the Front',
    action: 'GENERATE LESSON LEARNED',
    recordId: 'recyvN8KII6b9kshs',
  },
];

function App() {
  const [processingProcesses, setProcessingProcesses] = useState<Set<string>>(new Set());
  const [completedProcesses, setCompletedProcesses] = useState<Set<string>>(new Set());
  const [webhookMessages, setWebhookMessages] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string | null>(null);
  const [fieldObservationNumber, setFieldObservationNumber] = useState<string>('');
  const [isFieldObservationSubmitted, setIsFieldObservationSubmitted] = useState<boolean>(false);
  const [isFetchingSummary, setIsFetchingSummary] = useState<boolean>(false);
  const [meetingSummary, setMeetingSummary] = useState<string | null>(null);
  const [fieldObservationData, setFieldObservationData] = useState<any>(null);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  const handleFieldObservationSubmit = async () => {
    if (!fieldObservationNumber) {
      setError('Please enter a Field Observation Number');
      return;
    }

    setError(null);
    setIsFetchingSummary(true);

    try {
      const response = await fetch(
        'https://hook.us1.make.com/e4ss01f48akvv25b8ixhwa2pqtupv3la',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fieldObservationNumber }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseText = await response.text();
      let responseData;

      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        responseData = { message: responseText };
      }

      if (responseData.message) {
        setIsFieldObservationSubmitted(true);
        setFieldObservationData(parseFieldObservation(responseData.message));
        setError(null);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error submitting Field Observation Number:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsFetchingSummary(false);
    }
  };

  const handleRunProcess = async (process: Process) => {
    setProcessingProcesses((prev) => new Set(prev).add(process.name));
    setError(null);
    try {
      const response = await fetch(
        'https://hook.us1.make.com/c4gycpmat4svf4mdmcdcrftlkwrs7da7',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ recordId: process.recordId }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseText = await response.text();
      let responseData;

      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        responseData = { message: responseText };
      }

      setWebhookMessages((prev) => ({
        ...prev,
        [process.name]: responseData.message || 'Process completed successfully',
      }));
      setCompletedProcesses((prev) => new Set(prev).add(process.name));
    } catch (error) {
      console.error('Error in handleRunProcess:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setProcessingProcesses((prev) => {
        const newSet = new Set(prev);
        newSet.delete(process.name);
        return newSet;
      });
    }
  };

  const handleFetchMeetingSummary = async () => {
    setIsFetchingSummary(true);
    setError(null);
    setMeetingSummary(null);

    try {
      const response = await fetch(
        'https://hook.us1.make.com/sbk9pt81q49av761odja9cic7511jfms',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fieldObservationNumber }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseText = await response.text();
      let responseData;

      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        responseData = { message: responseText };
      }

      setMeetingSummary(responseData.message || 'Meeting summary fetched successfully');
    } catch (error) {
      console.error('Error fetching meeting summary:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsFetchingSummary(false);
    }
  };

  const renderProcesses = () => {
    return (
      <div className="space-y-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold text-high-voltage-yellow hover-spark">
            Talk To Taught
          </h2>
          <div className="mt-2 h-1 w-32 bg-high-voltage-yellow mx-auto rounded-full shadow-[0_0_10px_rgba(255,215,0,0.5)]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {processes.slice(0, 3).map((process) => (
            <ProcessCard
              key={process.recordId}
              process={process}
              isProcessing={processingProcesses.has(process.name)}
              isCompleted={completedProcesses.has(process.name)}
              webhookMessage={webhookMessages[process.name]}
              onRunProcess={() => handleRunProcess(process)}
              isSignedIn={true}
            />
          ))}
        </div>

        {completedProcesses.has('Investigation Meeting') && (
          <div className="my-12">
            <MeetingSummary
              isFetchingMeetingSummary={isFetchingSummary}
              meetingSummary={meetingSummary}
              onFetchSummary={handleFetchMeetingSummary}
              onUploadTranscript={(transcript: string) => {
                console.log('Transcript uploaded:', transcript);
              }}
              fieldObservationNumber={fieldObservationNumber}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {processes.slice(3).map((process) => (
            <ProcessCard
              key={process.recordId}
              process={process}
              isProcessing={processingProcesses.has(process.name)}
              isCompleted={completedProcesses.has(process.name)}
              webhookMessage={webhookMessages[process.name]}
              onRunProcess={() => handleRunProcess(process)}
              isSignedIn={true}
            />
          ))}
        </div>

        <div className="mt-16 w-full vw-100">
          <BookOfKnowledge onSignIn={() => window.open('https://volty.softr.app/sign-in', '_blank')} />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-power-industry flex flex-col">
      <header className="bg-industrial-dark bg-opacity-90 py-4 px-8 border-b-2 border-high-voltage-yellow">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center hover-spark">
            <Zap className="w-10 h-10 text-high-voltage-yellow mr-2" />
            <span className="text-3xl font-bold text-high-voltage-yellow">Volty AI</span>
          </div>
          <a
            href="https://www.volty.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary flex items-center hover-spark font-bold"
          >
            GO TO WEBSITE
            <ExternalLink className="w-5 h-5 ml-2" />
          </a>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <Zap className="w-12 h-12 text-high-voltage-yellow mr-4" />
          <h1 className="text-4xl font-bold text-high-voltage-yellow hover-spark">
            Volty Field Observations
          </h1>
        </div>

        {!isFieldObservationSubmitted ? (
          <FieldObservationForm
            fieldObservationNumber={fieldObservationNumber}
            isFetchingSummary={isFetchingSummary}
            onSubmit={handleFieldObservationSubmit}
            onChange={setFieldObservationNumber}
          />
        ) : !isConfirmed ? (
          <FieldObservationSummary
            data={fieldObservationData}
            onConfirm={() => setIsConfirmed(true)}
            onReject={() => {
              setIsFieldObservationSubmitted(false);
              setFieldObservationNumber('');
              setFieldObservationData(null);
            }}
            showActions={true}
          />
        ) : (
          <>
            <FieldObservationSummary data={fieldObservationData} />
            {renderProcesses()}
            {error && (
              <div className="mt-4 p-4 bg-red-900 bg-opacity-70 text-red-200 rounded-lg border border-red-500">
                {error}
              </div>
            )}
          </>
        )}
      </main>

      <footer className="bg-industrial-dark bg-opacity-90 py-6 px-8 border-t-2 border-high-voltage-yellow">
        <div className="container mx-auto flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
          <p className="text-white text-lg mr-4">Don't have a Field observation?</p>
          <a
            href="https://link.apisystem.tech/widget/form/gF0NixvTCDHrW0x8vKV0"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary flex items-center hover-spark font-bold"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            TALK TO VOLTY NOW
            <ExternalLink className="w-5 h-5 ml-2" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
