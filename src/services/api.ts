const BASE_URL = 'https://swapi.dev/api';

export interface detailData {
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

export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const api = {
  // Films
  async getFilms(): Promise<ApiResponse<Film>> {
    const response = await fetch(`${BASE_URL}/films`);
    if (!response.ok) {
      throw new Error('Failed to fetch films');
    }
    return response.json();
  },

  // Characters
  async getCharacters(): Promise<ApiResponse<Character>> {
    const response = await fetch(`${BASE_URL}/people`);
    if (!response.ok) {
      throw new Error('Failed to fetch characters');
    }
    return response.json();
  },

  // Planets
  async getPlanets(): Promise<ApiResponse<Planet>> {
    const response = await fetch(`${BASE_URL}/planets`);
    if (!response.ok) {
      throw new Error('Failed to fetch planets');
    }
    return response.json();
  }
};
