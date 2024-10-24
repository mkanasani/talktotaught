import React, { useState } from 'react';
import {
  AlertCircle,
  BookOpen,
  Users,
  FileCheck,
  Zap,
  FileText,
  FileSpreadsheet,
} from 'lucide-react';

interface Process {
  name: string;
  icon: React.ReactNode;
  description: string;
  action: string;
  recordId: string;
}

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
    action: 'CREATE WORK BOOK',
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
    recordId: 'recNewRCAPrep123',
  },
  {
    name: 'Root Cause Analysis',
    icon: <FileCheck className="w-6 h-6" />,
    description: 'Get to the Bottom of it',
    action: 'GENERATE RCA',
    recordId: 'reclsUo5Bh4GbKiN8',
  },
  {
    name: 'Lessons Learned',
    icon: <Zap className="w-6 h-6" />,
    description: 'Share your insights - Lead from the Front',
    action: 'GENERATE LESSON LEARNED',
    recordId: 'recgZwhznog8RWTyt',
  },
];

function EmbeddableWidget() {
  const [processingProcesses, setProcessingProcesses] = useState<Set<string>>(new Set());
  const [completedProcesses, setCompletedProcesses] = useState<Set<string>>(new Set());
  const [webhookMessages, setWebhookMessages] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string | null>(null);
  const [fieldObservationNumber, setFieldObservationNumber] = useState<string>('');
  const [isFieldObservationSubmitted, setIsFieldObservationSubmitted] = useState<boolean>(false);
  const [isFetchingSummary, setIsFetchingSummary] = useState<boolean>(false);
  const [meetingSummary, setMeetingSummary] = useState<string | null>(null);
  const [fieldObservationSummary, setFieldObservationSummary] = useState<string | null>(null);

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
        setFieldObservationSummary(responseData.message);
        setError(null);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error submitting Field Observation Number:', error);
      let errorMessage = 'Failed to submit Field Observation Number. ';
      if (error instanceof Error) {
        errorMessage += error.message;
      } else {
        errorMessage += 'An unknown error occurred.';
      }
      setError(errorMessage);
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
      let errorMessage = 'An unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setError(errorMessage);
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
      let errorMessage = 'Failed to fetch meeting summary. ';
      if (error instanceof Error) {
        errorMessage += error.message;
      } else {
        errorMessage += 'An unknown error occurred.';
      }
      setError(errorMessage);
    } finally {
      setIsFetchingSummary(false);
    }
  };

  return (
    <div className="volty-widget bg-dark-blue bg-opacity-90 text-electric-blue p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-electric-yellow mb-6">Volty Field Observations</h1>
      {!isFieldObservationSubmitted ? (
        <div className="mb-6">
          <input
            type="text"
            value={fieldObservationNumber}
            onChange={(e) => setFieldObservationNumber(e.target.value)}
            placeholder="Enter Field Observation Number"
            className="input mb-4 w-full"
          />
          <button
            onClick={handleFieldObservationSubmit}
            disabled={isFetchingSummary}
            className={`btn btn-primary w-full ${isFetchingSummary ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isFetchingSummary ? 'PROCESSING...' : 'SUBMIT FIELD OBSERVATION NUMBER'}
          </button>
        </div>
      ) : (
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 text-electric-yellow">Field Observation Summary</h2>
          <div className="text-xl mb-2">Field Observation: {fieldObservationNumber}</div>
          {fieldObservationSummary && (
            <div className="bg-blue-900 bg-opacity-50 p-4 rounded-lg border border-electric-blue">
              <pre className="whitespace-pre-wrap text-sm">{fieldObservationSummary}</pre>
            </div>
          )}
        </div>
      )}
      {error && (
        <div className="bg-red-900 bg-opacity-70 text-red-200 p-4 rounded-md mb-4 border border-red-500">
          {error}
        </div>
      )}
      {isFieldObservationSubmitted && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {processes.map((process, index) => (
              <div key={index} className="bg-blue-900 bg-opacity-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="bg-electric-blue bg-opacity-30 p-2 rounded-full mr-2">
                    {React.cloneElement(process.icon as React.ReactElement, { className: 'w-6 h-6 text-electric-yellow' })}
                  </div>
                  <h3 className="text-lg font-semibold text-electric-yellow">{process.name}</h3>
                </div>
                <p className="text-sm mb-2">{process.description}</p>
                <button
                  onClick={() => handleRunProcess(process)}
                  disabled={processingProcesses.has(process.name) || completedProcesses.has(process.name)}
                  className={`btn w-full text-sm py-1 px-2 ${
                    completedProcesses.has(process.name)
                      ? 'btn-success'
                      : processingProcesses.has(process.name)
                      ? 'btn-processing'
                      : 'btn-primary'
                  }`}
                >
                  {completedProcesses.has(process.name)
                    ? 'COMPLETED'
                    : processingProcesses.has(process.name)
                    ? 'PROCESSING...'
                    : process.action}
                </button>
                {completedProcesses.has(process.name) && webhookMessages[process.name] && (
                  <div className="mt-2 text-xs bg-blue-900 bg-opacity-50 p-2 rounded">
                    {webhookMessages[process.name]}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="bg-blue-900 bg-opacity-50 rounded-lg p-4">
            <h3 className="text-xl font-bold mb-2 flex items-center text-electric-yellow">
              <FileText className="w-5 h-5 mr-2" />
              Meeting Summary
            </h3>
            <button
              onClick={handleFetchMeetingSummary}
              disabled={isFetchingSummary}
              className={`btn w-full py-2 px-3 ${isFetchingSummary ? 'btn-processing' : 'btn-primary'}`}
            >
              {isFetchingSummary ? 'PROCESSING...' : 'FETCH MEETING SUMMARY'}
            </button>
            {meetingSummary && (
              <div className="mt-2 text-sm bg-blue-900 bg-opacity-50 p-3 rounded-lg">
                <pre className="whitespace-pre-wrap">{meetingSummary}</pre>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default EmbeddableWidget;