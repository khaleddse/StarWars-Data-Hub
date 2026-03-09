import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DetailView from "../components/detailView/DetailView";
import styles from "./UniversalDetail.module.css";

// our supported categories
const SUPPORTED_CATEGORIES = ["films", "people", "characters", "planets"];

export default function UniversalDetails() {
  const { category, id } = useParams<{ category: string; id: string }>();
  const navigate = useNavigate();

  const normalizedCategory =
    category && SUPPORTED_CATEGORIES.includes(category) ? category : "films";

  const [detail, setDetail] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Redirect invalid category
  useEffect(() => {
    if (!category || !SUPPORTED_CATEGORIES.includes(category)) {
      navigate(`/films/${id ?? ""}`, { replace: true });
    }
  }, [category, id, navigate]);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!normalizedCategory || !id) return;

      setLoading(true);
      setError(null);

      const dataUrl = `https://swapi.dev/api/${normalizedCategory}/${id}/`;

      try {
        const response = await fetch(dataUrl);

        if (!response.ok) {
          throw new Error(`Failed to fetch ${normalizedCategory} details`);
        }

        const data = await response.json();
        setDetail(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [normalizedCategory, id]);

  if (loading) return <div className={styles.loading}>Loading...</div>;

  if (error) return <div className={styles.error}>{error}</div>;

  if (!detail) return <div className={styles.error}>Data not found</div>;

  
  const imageCategory =
    normalizedCategory === "people" ? "characters" : normalizedCategory;

  const imageUrl = `https://starwars-visualguide.com/assets/img/${imageCategory}/${id}.jpg`;

  return (
    <DetailView
      category={normalizedCategory}
      title={detail.title || detail.name}
      description={detail.opening_crawl || ""}
      details={detail}
      image={imageUrl}
    />
  );
}