import type { Category } from "../types";

export const getArrayKeys = (obj: Record<string, unknown>): string[] =>
  Object.keys(obj).filter((key) => Array.isArray(obj[key]));

export const parseSwapiUrl = (url: string) => {
  const segments = url.split("/").filter(Boolean);
  return {
    category: segments[segments.length - 2],
    id: segments[segments.length - 1],
  };
};

export const fetchRelatedResources = async (urls: string[]) => {
  try {
    const responses = await Promise.all(urls.map((url) => fetch(url)));
    return Promise.all(responses.map((r) => r.json()));
  } catch (error) {
    console.error("Error fetching related resources", error);
    return [];
  }
};


export const extractIdFromUrl = (url: string) =>
  url.split("/").filter(Boolean).pop();

export const getSecondaryInfo = (item: BaseItem, category: Category) => {
  if (item.director) return item.director;

  if (category === "people" || category === "characters")
    return `Gender: ${item.gender}`;

  if (category === "planets") return `Terrain: ${item.terrain}`;

  return "";
};

export const getThirdInfo = (item: BaseItem, category: Category) => {
  if (item.producer) return item.producer;

  if (category === "people" || category === "characters")
    return `Birth: ${item.birth_year}`;

  if (category === "planets") return `Pop: ${item.population}`;

  return "";
};