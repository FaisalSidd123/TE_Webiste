import { useEffect, useRef } from 'react';
import { useScrollLock } from '../../hooks/useLenis';
import Icon from './Icon';
import './Drawer.css';

export default function Drawer({ open, onClose, title, children }) {
  const drawerRef = useRef(null);
  useScrollLock(open);

  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="drawer-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
      <div
        ref={drawerRef}
        className="drawer-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer-header">
          <h3 className="drawer-title t-h3">{title}</h3>
          <button
            type="button"
            className="drawer-close"
            onClick={onClose}
            aria-label="Close drawer"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        <div className="drawer-body" data-lenis-prevent>
          {children}
        </div>
      </div>
    </div>
  );
}
