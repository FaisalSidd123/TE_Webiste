import { useEffect, useRef, useState } from 'react';
import './Tabs.css';

export default function Tabs({ tabs, activeId, onChange, className = '' }) {
  const containerRef = useRef(null);
  const [lineStyle, setLineStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const activeEl = containerRef.current.querySelector(`[data-tab-id="${activeId}"]`);
    if (activeEl) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();
      setLineStyle({
        left: activeRect.left - containerRect.left,
        width: activeRect.width,
      });
    }
  }, [activeId, tabs]);

  return (
    <div ref={containerRef} className={`tabs ${className}`} role="tablist">
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            data-tab-id={tab.id}
            className={`tab-btn ${isActive ? 'is-active' : ''}`}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
      <span
        className="tab-indicator"
        style={{
          transform: `translateX(${lineStyle.left}px)`,
          width: `${lineStyle.width}px`,
        }}
        aria-hidden="true"
      />
    </div>
  );
}
