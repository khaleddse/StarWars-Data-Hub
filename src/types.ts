export interface FilmResponse {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  url: string;
}

export interface DetailData {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

export interface DetailViewProps {
  category: string;
  title: string;
  subtitle?: string;
  description: string;
  details: { [key: string]: DetailData };
  image: string;
}

export type Category = "people" | "planets" | "films";

export interface DetailItem {
  [key: string]: any;
}


