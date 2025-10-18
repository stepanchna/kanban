import React, { useEffect, useState } from 'react';
import Column from '../Column/Column';
import { v4 as uuidv4 } from 'uuid';

const LS_KEY = 'kanban_columns_v1';

export default function Board({ columns }) {
  const [localColumns, setLocalColumns] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) return JSON.parse(raw);
    } catch (_) {}
    return columns;
  });

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(localColumns));
      window.dispatchEvent(new Event('kanban:update'));
    } catch (e) {
      console.error('Failed to save to LS', e);
    }
  }, [localColumns]);

  const handleAddTask = (columnId, taskName) => {
    setLocalColumns(prev =>
      prev.map(col =>
        col.id === columnId
          ? {
              ...col,
              issues: [
                ...col.issues,
                { id: uuidv4(), name: taskName, description: '' },
              ],
            }
          : col
      )
    );
  };

  const handleMoveTask = (fromColumnId, toColumnId, taskId) => {
    setLocalColumns(prev => {
      const fromCol = prev.find(c => c.id === fromColumnId);
      if (!fromCol) return prev;
      const task = fromCol.issues.find(t => t.id === taskId);
      if (!task) return prev;

      return prev.map(col => {
        if (col.id === fromColumnId) {
          return { ...col, issues: col.issues.filter(t => t.id !== taskId) };
        }
        if (col.id === toColumnId) {
          return { ...col, issues: [...col.issues, task] };
        }
        return col;
      });
    });
  };

  const order = ['backlog', 'ready', 'inprogress', 'finished'];

  return (
    <div className="panel">
      <div className="columns">
        {order.map(id => {
          const current = localColumns.find(c => c.id === id);
          if (!current) return null;

          const idx = order.indexOf(id);
          const prevId = idx > 0 ? order[idx - 1] : null;
          const prevCol = prevId ? localColumns.find(c => c.id === prevId) : null;

          return (
            <Column
              key={current.id}
              id={current.id}
              title={current.title}
              items={current.issues}
              onAddTask={handleAddTask}
              onMoveTask={handleMoveTask}
              prevColumnId={prevCol?.id || null}
              prevItems={prevCol?.issues || []}
            />
          );
        })}
      </div>
    </div>
  );
}
