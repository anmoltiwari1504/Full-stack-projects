import { useState } from 'react';
import UploadForm from './components/UploadForm';
import SummaryView from './components/SummaryView';

export default function App() {
  const [docId, setDocId] = useState(null);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">DocuMind AI</h1>

      {docId ? (
        <SummaryView id={docId} onBack={() => setDocId(null)} />
      ) : (
        <UploadForm onUploaded={setDocId} />
      )}
    </main>
  );
}