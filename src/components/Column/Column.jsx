import React, { useState } from 'react';
import TaskCard from '../TaskCard/TaskCard';

export default function Column({
  id,
  title,
  items = [],
  onAddTask,
  onMoveTask,
  prevColumnId = null,
  prevItems = [],
}) {
  const [isAddMode, setIsAddMode] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [selectedId, setSelectedId] = useState('');

  const isBacklog = id === 'backlog';

  const handleSubmitNew = () => {
    const name = newTitle.trim();
    if (!name) return;
    onAddTask(id, name);
    setNewTitle('');
    setIsAddMode(false);
  };

  const handleSelectMove = (e) => {
    const taskId = e.target.value;
    setSelectedId(taskId);
    if (!taskId) return;
    onMoveTask(prevColumnId, id, taskId);
    setIsAddMode(false);
    setSelectedId('');
  };

  return (
    <section className="column">
      <h3 className="columnTitle">{title}</h3>

      <div>
        {items.map(t => (
          <TaskCard key={t.id} task={t} />
        ))}
      </div>

      {isBacklog ? (
        <>
          {isAddMode ? (
            <div className="addRow">
              <input
                className="input"
                type="text"
                placeholder="Введите название задачи"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
              />
              <button
                className="addBtn"
                onClick={handleSubmitNew}
                disabled={!newTitle.trim()}
              >
                Submit
              </button>
            </div>
          ) : (
            <button className="addBtn" onClick={() => setIsAddMode(true)}>
              + Add card
            </button>
          )}
        </>
      ) : (
        <>
          {isAddMode ? (
            <select
              className="select"
              value={selectedId}
              onChange={handleSelectMove}
            >
              <option value="">Select task</option>
              {prevItems.map(task => (
                <option key={task.id} value={task.id}>
                  {task.name}
                </option>
              ))}
            </select>
          ) : (
            <button
              className="addBtn"
              onClick={() => setIsAddMode(true)}
              disabled={prevItems.length === 0}
              title={prevItems.length === 0 ? 'Nothing to move from previous column' : ''}
            >
              + Add card
            </button>
          )}
        </>
      )}
    </section>
  );
}
