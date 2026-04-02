import { useState } from 'react';
import styles from './ThemeButton.module.css';

// used state to toggle between light and dark styles
function ThemeButton() {
  const [currentTheme, setTheme] = useState('light');

  // figured a simple toggle was cleaner than passing theme from outside
  const handleToggle = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      className={`${styles.base} ${styles[currentTheme]}`}
      onClick={handleToggle}
    >
      {currentTheme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
    </button>
  );
}

export default ThemeButton;
