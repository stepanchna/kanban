import React from 'react';
import { Link } from 'react-router-dom';

export default function TaskCard({ task }) { 
  return (
    <div className="card">
      <Link to={`/tasks/${task.id}`} className="cardTitle">
        {task.name}
      </Link>
    </div>
  );
}
