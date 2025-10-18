import React, { useEffect, useMemo, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Header from './components/Header/Header';
import Board from './components/Board/Board';
import Footer from './components/Footer/Footer';
import TaskPage from './components/TaskPage/TaskPage';
import { dataMock } from './data/mock';

const LS_KEY = 'kanban_columns_v1';

function readColumns() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return dataMock;
}

export default function App() {
  const [snapshot, setSnapshot] = useState(() => readColumns());

  useEffect(() => {
    const update = () => setSnapshot(readColumns());
    window.addEventListener('kanban:update', update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener('kanban:update', update);
      window.removeEventListener('storage', update);
    };
  }, []);

  const { activeCount, finishedCount } = useMemo(() => {
    const backlog = snapshot.find(c => c.id === 'backlog');
    const finished = snapshot.find(c => c.id === 'finished');
    return {
      activeCount: backlog ? backlog.issues.length : 0,
      finishedCount: finished ? finished.issues.length : 0,
    };
  }, [snapshot]);

  return (
    <Router basename="/">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Board columns={dataMock} />} />
          <Route path="/tasks/:id" element={<TaskPage />} />
        </Routes>
      </main>
      <Footer activeCount={activeCount} finishedCount={finishedCount} />
    </Router>
  );
}
