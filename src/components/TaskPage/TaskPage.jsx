import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const LS_KEY = 'kanban_columns_v1';

export default function TaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [desc, setDesc] = useState('');
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const columns = JSON.parse(raw);
      for (const col of columns) {
        const found = col.issues.find(t => t.id === id);
        if (found) {
          setTask(found);
          setDesc(found.description || '');
          break;
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [id]);

  const saveDescription = (text) => {
    setDesc(text);
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const cols = JSON.parse(raw);
      const updated = cols.map(c => ({
        ...c,
        issues: c.issues.map(t => (t.id === id ? { ...t, description: text } : t)),
      }));
      localStorage.setItem(LS_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('kanban:update'));
    } catch (e) {
      console.error(e);
    }
  };

  if (!task) {
    return (
      <section className="taskPage">
        <button className="closeBtn" onClick={() => navigate('/')}>✕</button>
        <p>Task not found</p>
      </section>
    );
  }

  return (
    <section className="taskPage">
      <button className="closeBtn" onClick={() => navigate('/')}>✕</button>
      <h2>{task.name}</h2>
      <textarea
        placeholder="This task has no description"
        value={desc}
        onChange={(e) => saveDescription(e.target.value)}
      />
    </section>
  );
}
