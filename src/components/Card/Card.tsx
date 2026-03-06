import styles from "./Card.module.css";

type MovieCardProps = {
  title: string;
  director: string;
  producers: string;
  releaseDate: string;
  image: string;
};

export default function MovieCard({
  title,
  director,
  producers,
  releaseDate,
  image,
}: MovieCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className={styles.image}
          sizes="(max-width:768px) 100vw, 300px"
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        <p>
          <strong>Director:</strong> {director}
        </p>

        <p>
          <strong>Produzenten:</strong> {producers}
        </p>

        <p>
          <strong>Erscheinungsdatum:</strong> {releaseDate}
        </p>

        <button className={styles.moreBtn}>
          Mehr Informationen...
        </button>
      </div>
    </article>
  );
}