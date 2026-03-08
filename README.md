# Star Wars Data Hub

A modern React TypeScript application that visualizes Star Wars data from SWAPI (Star Wars API). Features a responsive design with master-detail views for films, characters, and planets.

## Features

- **Real Star Wars Data**: Fetches live data from SWAPI
- **Three Main Categories**: Films, People, and Planets
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Master-Detail Views**: Grid overview and detailed information pages
- **Modern UI**: Clean, card-based design with smooth interactions
- **TypeScript**: Full type safety throughout the application
- **Universal Components**: Reusable components for all entity types

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **CSS Modules** for component styling
- **SWAPI** for Star Wars data

## Project Structure

```
src/
├── components/
│   ├── card/           # Reusable card component
│   ├── detailView/     # Universal detail view component
│   ├── Navbar/         # Navigation bar
│   └── ui/            # UI components (Chips, SearchInput)
├── pages/
│   ├── Home.tsx              # Home page
│   ├── UniversalGrid.tsx       # Universal grid for all categories
│   └── UniversalDetails.tsx    # Universal detail view for all entities
├── routes/
│   └── index.tsx              # Universal route configuration
├── helper/
│   └── utils.ts               # Utility functions
├── services/
│   └── api.ts                 # API service layer
└── types.ts                   # TypeScript type definitions
```

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint

## API Endpoints

The application uses the following SWAPI endpoints:

- **Films**: `https://swapi.dev/api/films`
- **People**: `https://swapi.dev/api/people`
- **Planets**: `https://swapi.dev/api/planets`

## Navigation

- `/` - Home page
- `/films` - Films grid view
- `/people` - People grid view
- `/planets` - Planets grid view
- `/films/:id` - Individual film details
- `/people/:id` - Individual person details
- `/planets/:id` - Individual planet details

## Getting Started

1. Clone repository
2. Install dependencies: `yarn`
3. Start development server: `yarn dev`
4. Open `http://localhost:5173` in your browser

## Data Features

### Films
- Title, director, producer, release date
- Opening crawl text
- Related characters, planets, starships, vehicles

### People
- Name, height, mass, birth year
- Physical characteristics (eye color, hair color, skin color)
- Related films, homeworld, species, vehicles, starships
- Clickable homeworld links

### Planets
- Name, climate, terrain, population
- Physical properties (gravity, diameter, orbital period)
- Related residents and films

## Universal Components

### UniversalGrid
- Handles all three categories (films, people, planets)
- Dynamic field mapping based on entity type
- Responsive grid layout
- Loading and error states

### UniversalDetails
- Single component for all entity types
- Dynamic field rendering
- Related resource fetching
- Navigation between related entities
- Clickable homeworld chips for people

### DetailView
- Reusable detail view component
- Supports related sections
- Image gallery with pagination
- Responsive design

## Design System

- **Grid Layout**: 3 columns on desktop, 2 on tablet, 1 on mobile
- **Card Design**: Consistent styling across all entity types
- **Color Scheme**: Clean, modern design with proper contrast
- **Typography**: Responsive font sizes and proper hierarchy
- **Interactive Elements**: Clickable chips and navigation

## Contributing

This is a demonstration project showcasing modern React development practices with real API integration and universal component architecture.
