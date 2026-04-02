import styles from './Card.module.css';

// built this as a simple reusable card — kept props minimal on purpose
// added featured flag later to break the uniform look
function Card({ title, description, featured }) {
  return (
    <div className={`${styles.container}${featured ? ` ${styles.featured}` : ''}`}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
}

export default Card;
