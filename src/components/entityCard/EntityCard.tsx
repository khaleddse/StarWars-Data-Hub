import styles from "./EntityCard.module.css";
import { useNavigate } from "react-router-dom";

type EntityCardProps = {
  title: string;
  director: string;
  producers: string;
  releaseDate: string;
  image: string;
  detailUrl: string;
};

export default function EntityCard({
  title,
  director,
  producers,
  releaseDate,
  image,
  detailUrl
}: EntityCardProps) {
  const navigate = useNavigate();
  const splitedUrl = detailUrl.split('/').filter(Boolean).pop() || ''
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className={styles.image}
          onError={(e) => {
            // If the site is blocked, switch to a safe placeholder automatically
            (e.target as HTMLImageElement).src = "https://placehold.co/400x600?text=Image+Blocked";
          }}
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

        <button className={styles.moreBtn} onClick={() => navigate(splitedUrl, { state: { dataUrl: detailUrl } })} >
          Mehr Informationen...
        </button>
      </div>
    </article>
  );
}