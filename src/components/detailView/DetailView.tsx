import React, { useEffect, useMemo, useState } from "react";
import styles from "./DetailView.module.css";
import Chips from "../ui/Chips";
import { useNavigate } from "react-router-dom";
import { type Category, type DetailViewProps } from "../../types";
import { CATEGORY_FIELDS } from "./DetailViewConfig";
import {
  fetchRelatedResources,
  getArrayKeys,
  parseSwapiUrl,
} from "../../helper/utils";

const ALLOWED_NAVIGATION: Category[] = ["people", "planets", "films"];
const MAX_RELATED_ITEMS = 5;

const DetailView: React.FC<DetailViewProps> = ({
  category,
  title,
  subtitle,
  description,
  details,
  image,
}) => {
  const navigate = useNavigate();

  const [relatedData, setRelatedData] = useState<
    Record<string, { data: any[]; hasMore: boolean }>
  >({});
  const [homeworld, setHomeworld] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const relatedKeys = useMemo(() => getArrayKeys(details), [details]);

  // fetch related array resources Only fetch first MAX_RELATED_ITEMS
  useEffect(() => {
    if (!relatedKeys.length) return;

    let cancelled = false;

    const loadRelated = async () => {
      setLoading(true);

      try {
        const entries = await Promise.all(
          relatedKeys.map(async (key) => {
            const urls = details[key] as string[];

            const limitedUrls = urls.slice(0, MAX_RELATED_ITEMS);

            const data = await fetchRelatedResources(limitedUrls);

            return [
              key,
              {
                data,
                hasMore: urls.length > MAX_RELATED_ITEMS,
              },
            ];
          })
        );

        if (!cancelled) {
          setRelatedData(Object.fromEntries(entries));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadRelated();

    return () => {
      cancelled = true;
    };
  }, [relatedKeys, details]);

  //Fetch homeworld (single resource)
  useEffect(() => {
    if (!details?.homeworld) return;

    const loadHomeworld = async () => {
      if (typeof details.homeworld !== "string") return;

      const result = await fetchRelatedResources([details.homeworld]);
      setHomeworld(result[0]);
    };

    loadHomeworld();
  }, [details]);

  const handleNavigation = (url: string) => {
    const { category, id } = parseSwapiUrl(url);

    if (!ALLOWED_NAVIGATION.includes(category as Category)) return;

    navigate(`/${category}/${id}`);
  };

  const fields = CATEGORY_FIELDS[category as Category] || [];

  return (
    <div className={styles.container}>
      {/* Header */}

      <header className={styles.header}>
        <p className={styles.category}>{category}</p>

        <div className={styles.line} />

        <h1 className={styles.title}>{title}</h1>

        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </header>

      {/* Main grid */}

      <div className={styles.grid}>
        <section className={styles.textContent}>
          <div className={styles.detailsBlock}>
            <h3>Details</h3>

            {fields.map(({ label, key }) => {
              const value = details[key];

              return (
                <p
                  key={key}
                  className={key === "homeworld" ? styles.homeworld : ""}
                >
                  <strong>{label}:</strong>{" "}
                  {key === "homeworld" && homeworld ? (
                    <Chips
                      title={homeworld.name}
                      onClick={() => handleNavigation(homeworld.url)}
                      disabled={false}
                    />
                  ) : typeof value === "string" || typeof value === "number" ? (
                    value
                  ) : (
                    "-"
                  )}
                </p>
              );
            })}
          </div>

          {description && (
            <div className={styles.description}>
              <p>{description}</p>
            </div>
          )}
        </section>

        <section className={styles.visualContent}>
          {image && (
            <div className={styles.imageCard}>
              <img
                src={image}
                alt={title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/400x600?text=Image+Blocked";
                }}
              />
            </div>
          )}
        </section>
      </div>

      {/* Related data */}

      {loading && (
        <div className={styles.relatedDataContainer}>Loading...</div>
      )}

      {!loading && Object.keys(relatedData).length > 0 && (
        <div className={styles.relatedDataContainer}>
          {Object.entries(relatedData).map(([key, value]) => {
            const { data: items, hasMore } = value;

            return (
              <div key={key}>
                <h3>{key.toUpperCase()}</h3>

                <div className={styles.chipList}>
                  {items.map((item, index) => {
                    const clickable = ALLOWED_NAVIGATION.includes(
                      parseSwapiUrl(item.url).category as Category
                    );

                    return (
                      <Chips
                        key={index}
                        title={item.name || item.title}
                        onClick={() => handleNavigation(item.url)}
                        disabled={!clickable}
                      />
                    );
                  })}

                  {hasMore && <Chips title="..." disabled />}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DetailView;