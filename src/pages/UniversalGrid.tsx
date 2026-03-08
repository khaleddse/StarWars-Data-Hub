import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/card/Card";
import styles from "./UniversalGrid.module.css";
import { api } from "../services/api";
import { extractIdFromUrl, getSecondaryInfo, getThirdInfo } from "../helper/utils";
import type { Category } from "../types";

/* ---------------- TYPES ---------------- */

interface BaseItem {
  url: string;
  name?: string;
  title?: string;
  director?: string;
  producer?: string;
  release_date?: string;
  gender?: string;
  birth_year?: string;
  terrain?: string;
  population?: string;
}

/* ---------------- CONFIG ---------------- */

const CATEGORY_CONFIG = {
  films: {
    fetch: api.getFilms,
    imagePath: "films",
  },
  people: {
    fetch: api.getCharacters,
    imagePath: "characters",
  },
  characters: {
    fetch: api.getCharacters,
    imagePath: "characters",
  },
  planets: {
    fetch: api.getPlanets,
    imagePath: "planets",
  },
};

export const buildImageUrl = (category: Category, id: string) => {
  const path = CATEGORY_CONFIG[category]?.imagePath ?? category;

  return `https://starwars-visualguide.com/assets/img/${path}/${id}.jpg`;
};

export default function UniversalGrid() {
  const { category = "films" } = useParams<{ category: Category }>();

  const [items, setItems] = useState<BaseItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const config = CATEGORY_CONFIG[category] ?? CATEGORY_CONFIG.films;

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await config.fetch();
        if (!cancelled) {
          setItems(data.results);
        }
      } catch (err) {
        if (!cancelled) {
          setError(`Failed to fetch ${category}`);
        }

        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [category, config]);

  const cards = useMemo(
    () =>
      items.map((item) => {
        const id = extractIdFromUrl(item.url);

        return {
          key: item.url,
          title: item.title || item.name || "",
          director: getSecondaryInfo(item, category as Category),
          producers: getThirdInfo(item, category as Category),
          releaseDate: item.release_date || "",
          image: buildImageUrl(category as Category, id!),
          detailUrl: item.url,
        };
      }),
    [items, category]
  );

  if (loading)
    return <div className={styles.loading}>Loading {category}...</div>;

  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <section className={styles.grid}>
      {cards.map((card) => (
        <MovieCard
          key={card.key}
          title={card.title}
          director={card.director}
          producers={card.producers}
          releaseDate={card.releaseDate}
          image={card.image}
          detailUrl={card.detailUrl}
        />
      ))}
    </section>
  );
}