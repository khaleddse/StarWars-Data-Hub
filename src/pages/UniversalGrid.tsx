import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EntityCard from "../components/entityCard/EntityCard";
import styles from "./UniversalGrid.module.css";
import { api } from "../services/api";
import {
  extractIdFromUrl,
  getSecondaryInfo,
  getThirdInfo,
} from "../helper/utils";
import type { Category } from "../types";


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
  const path = CATEGORY_CONFIG[category]?.imagePath ?? "films";

  return `https://starwars-visualguide.com/assets/img/${path}/${id}.jpg`;
};

export default function UniversalGrid() {
  const { category } = useParams<{ category: Category }>();
  const navigate = useNavigate();

  const normalizedCategory: Category =
    category && CATEGORY_CONFIG[category] ? category : "films";

  const [items, setItems] = useState<BaseItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const config = CATEGORY_CONFIG[normalizedCategory];

  // Redirect if category invalid
  useEffect(() => {
    if (!category || !CATEGORY_CONFIG[category]) {
      navigate("/films", { replace: true });
    }
  }, [category, navigate]);


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
          setError(`Failed to fetch ${normalizedCategory}`);
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
  }, [normalizedCategory]);

  /* ---------- Build Cards ---------- */

  const cards = useMemo(
    () =>
      items.map((item) => {
        const id = extractIdFromUrl(item.url);

        return {
          key: item.url,
          title: item.title || item.name || "",
          director: getSecondaryInfo(item, normalizedCategory),
          producers: getThirdInfo(item, normalizedCategory),
          releaseDate: item.release_date || "",
          image: buildImageUrl(normalizedCategory, id!),
          detailUrl: item.url,
        };
      }),
    [items, normalizedCategory]
  );

  if (loading)
    return (
      <div className={styles.loading}>Loading {normalizedCategory}...</div>
    );

  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <section className={styles.grid}>
      {cards.map((card) => (
        <EntityCard
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