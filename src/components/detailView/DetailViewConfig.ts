import type { Category } from "../../types";

export const CATEGORY_FIELDS: Record<Category, { label: string; key: string }[]> = {
  people: [
    { label: "Größe", key: "height" },
    { label: "Gewicht", key: "mass" },
    { label: "Haarfarbe", key: "hair_color" },
    { label: "Augenfarbe", key: "eye_color" },
    { label: "Geburtsjahr", key: "birth_year" },
    { label: "Geschlecht", key: "gender" },
  ],

  planets: [
    { label: "Klima", key: "climate" },
    { label: "Gelände", key: "terrain" },
    { label: "Population", key: "population" },
    { label: "Durchmesser", key: "diameter" },
    { label: "Rotation", key: "rotation_period" },
    { label: "Orbit", key: "orbital_period" },
  ],

  films: [
    { label: "Regisseur", key: "director" },
    { label: "Produzent", key: "producer" },
    { label: "Erscheinungsdatum", key: "release_date" },
    { label: "Episode", key: "episode_id" },
  ],
};