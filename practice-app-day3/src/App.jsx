import Card from './components/Card';
import ThemeButton from './components/ThemeButton';
import styles from './App.module.css';

// kept layout slightly split to avoid everything stacking vertically
function App() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1>React Styling Practice - Day 3</h1>
        <p className={styles.subtitle}>Tried out CSS modules and simple theme toggle</p>
      </header>

      <main className={styles.content}>
        {/* left side — cards showing off module-scoped styles */}
        <section className={styles.cardSection}>
          <h2 className={styles.sectionLabel}>Components</h2>
          <div className={styles.cardStack}>
            <Card
              title="Scoped Styling"
              description="Kept styles inside modules so they don’t clash with other components."
            />
            <Card
              title="Hover Effects"
              description="Added a small lift on hover so it feels a bit interactive."
              featured
            />
            <Card
              title="Clean Typography"
              description="Used softer colors and spacing to keep things readable."
            />
          </div>
        </section>

        {/* right side — theme control panel */}
        <section className={styles.controlSection}>
          <h2 className={styles.sectionLabel}>Theme</h2>
          <div className={styles.controlPanel}>
            <h3 className={styles.controlTitle}>Theme</h3>
            <p className={styles.controlDescription}>
              Switches between light and dark styles
            </p>
            <ThemeButton />
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>Built while practicing CSS modules</p>
      </footer>
    </div>
  );
}

export default App;
