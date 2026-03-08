import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DetailView from '../components/detailView/DetailView';
import styles from './UniversalDetail.module.css';

export default function UniversalDetails() {
  const { category, id } = useParams<{ category: string; id: string }>();

  const [detail, setDetail] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!category || !id) return;

      setLoading(true);
      setError(null);

      const dataUrl = `https://swapi.dev/api/${category}/${id}/`;

      try {
        const response = await fetch(dataUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${category} details`);
        }
        const data = await response.json();
        setDetail(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [category, id]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!detail) return <div className={styles.error}>Data not found</div>;

  const imageCategory = category === 'people' ? 'characters' : category;
  const imageUrl = `https://starwars-visualguide.com/assets/img/${imageCategory}/${id}.jpg`;

  return (
    <DetailView
      category={category || "Details"}
      title={detail.title || detail.name}
      description={detail.opening_crawl || ""}
      details={detail}
      image={imageUrl}
    />
  );
}