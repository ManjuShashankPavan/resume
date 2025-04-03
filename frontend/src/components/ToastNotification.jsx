import { useEffect } from 'react';
import PropTypes from 'prop-types';

const ToastNotification = ({ type, message, onClose }) => {
  const bgColors = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    warning: 'bg-yellow-600',
    info: 'bg-blue-600'
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`
      fixed bottom-4 left-1/2 transform -translate-x-1/2
      p-4 rounded-md shadow-lg text-white min-w-[300px] max-w-[90vw]
      ${bgColors[type]} z-[1000] animate-fade-in-up
      flex items-center justify-between
    `}>
      <div className="flex items-center">
        <span className="mr-2 font-bold">{icons[type]}</span>
        <span>{message}</span>
      </div>
      <button 
        onClick={onClose}
        className="ml-4 font-bold hover:opacity-80"
        aria-label="Close notification"
      >
        &times;
      </button>
    </div>
  );
};

ToastNotification.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']).isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ToastNotification;