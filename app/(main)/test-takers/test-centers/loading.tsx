import styles from "./TestCenters.module.css";

export default function Loading() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader} />
    </div>
  );
}
