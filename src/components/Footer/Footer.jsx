import React from 'react';

export default function Footer({ activeCount = 0, finishedCount = 0 }) {
  return (
    <footer className="footer">
      <div className="footerRow">
        <span>Active tasks: {activeCount}</span>
        <span>Finished tasks: {finishedCount}</span>
      </div>
    </footer>
  );
}
