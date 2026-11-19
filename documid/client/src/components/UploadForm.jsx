import { useState } from 'react';

const API = 'http://localhost:5000/api/documents';

export default function UploadForm({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [length, setLength] = useState('medium');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) return;

    setBusy(true);
    setError('');

    const form = new FormData();
    form.append('file', file);
    form.append('length', length);

    try {
      const res = await fetch(`${API}/upload`, { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      onUploaded(data.id);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
      <input
        type="file"
        accept=".pdf,.docx,.txt,.png,.jpg,.jpeg"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full"
      />

      <select
        value={length}
        onChange={(e) => setLength(e.target.value)}
        className="border rounded p-2"
      >
        <option value="short">Short</option>
        <option value="medium">Medium</option>
        <option value="long">Detailed</option>
      </select>

      {error && <p className="text-red-600">{error}</p>}

      <button
        disabled={!file || busy}
        className="bg-indigo-600 text-white px-5 py-2 rounded disabled:opacity-50"
      >
        {busy ? 'Uploading...' : 'Summarize'}
      </button>
    </form>
  );
}