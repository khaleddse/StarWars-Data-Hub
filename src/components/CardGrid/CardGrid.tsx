import MovieCard from "../Card/Card";
import styles from "./CardGrid.module.css";

const movies = [
  {
    title: "Thumbnail label",
    director: "George Lucas",
    producers: "Gary Kurtz, Rick McCallum",
    releaseDate: "25.05.1977",
    image: "https://via.placeholder.com/300x200/333/fff?text=Episode+IV",
  },
  {
    title: "Thumbnail label",
    director: "George Lucas",
    producers: "Gary Kurtz, Rick McCallum",
    releaseDate: "25.05.1977",
    image: "https://upload.wikimedia.org/wikipedia/en/6/6e/AckbarStanding.jpg",
  },
  {
    title: "Thumbnail label",
    director: "George Lucas",
    producers: "Gary Kurtz, Rick McCallum",
    releaseDate: "25.05.1977",
    image: "https://via.placeholder.com/300x200/333/fff?text=Episode+V",
  },
];

export default function MoviesGrid() {
  return (
    <section className={styles.grid}>
      {movies.map((movie, index) => (
        <MovieCard key={index} {...movie} />
      ))}
    </section>
  );
}