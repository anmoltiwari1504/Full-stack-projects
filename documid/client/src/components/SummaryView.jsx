import { useEffect, useState } from 'react';

const API = 'http://localhost:5000/api/documents';

export default function SummaryView({ id, onBack }) {
  const [doc, setDoc] = useState(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(null);

  // Status "processing" ho to har 2 second mein check karo
  useEffect(() => {
    let timer;

    async function load() {
      const res = await fetch(`${API}/${id}`);
      const data = await res.json();
      setDoc(data);
      if (data.status === 'processing') {
        timer = setTimeout(load, 2000);
      }
    }

    load();
    return () => clearTimeout(timer);
  }, [id]);

  function startEditing() {
    setDraft({
      overview: doc.summary.overview || '',
      keyPoints: (doc.summary.keyPoints || []).join('\n'),
      conclusion: doc.summary.conclusion || '',
    });
    setEditing(true);
  }

  async function save() {
    const body = {
      overview: draft.overview,
      conclusion: draft.conclusion,
      keyPoints: draft.keyPoints.split('\n').map((p) => p.trim()).filter(Boolean),
    };

    const res = await fetch(`${API}/${id}/summary`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    setDoc(await res.json());
    setEditing(false);
  }

  if (!doc) return <p>Loading...</p>;

  if (doc.status === 'processing') {
    return <p className="animate-pulse">Analyzing your document...</p>;
  }

  if (doc.status === 'failed') {
    return (
      <div>
        <p className="text-red-600">Could not summarize this file.</p>
        <button onClick={onBack} className="underline mt-2">Try another file</button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{doc.originalName}</h2>
        <button onClick={onBack} className="underline text-sm">New upload</button>
      </div>

      {editing ? (
        <div className="space-y-3">
          <label className="block font-medium">Overview</label>
          <textarea
            className="w-full border rounded p-2"
            rows={4}
            value={draft.overview}
            onChange={(e) => setDraft({ ...draft, overview: e.target.value })}
          />

          <label className="block font-medium">Key points (one per line)</label>
          <textarea
            className="w-full border rounded p-2"
            rows={6}
            value={draft.keyPoints}
            onChange={(e) => setDraft({ ...draft, keyPoints: e.target.value })}
          />

          <label className="block font-medium">Conclusion</label>
          <textarea
            className="w-full border rounded p-2"
            rows={3}
            value={draft.conclusion}
            onChange={(e) => setDraft({ ...draft, conclusion: e.target.value })}
          />

          <div className="flex gap-2">
            <button onClick={save} className="bg-indigo-600 text-white px-4 py-2 rounded">Save</button>
            <button onClick={() => setEditing(false)} className="border px-4 py-2 rounded">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <section>
            <h3 className="font-semibold">Overview</h3>
            <p>{doc.summary.overview}</p>
          </section>

          <section>
            <h3 className="font-semibold">Key Points</h3>
            <ul className="list-disc pl-6">
              {doc.summary.keyPoints.map((point, i) => <li key={i}>{point}</li>)}
            </ul>
          </section>

          <section>
            <h3 className="font-semibold">Conclusion</h3>
            <p>{doc.summary.conclusion}</p>
          </section>

          <div className="flex gap-2">
            <button onClick={startEditing} className="border px-4 py-2 rounded">Edit</button>
            <a
              href={`${API}/${id}/pdf`}
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Download PDF
            </a>
          </div>
        </div>
      )}
    </div>
  );
}