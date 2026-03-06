export interface NavLink {
  name: string;
  path: string;
}

export const navLinks: NavLink[] = [
  { name: "Star Wars", path: "/" },
  { name: "Filme", path: "/films" },
  { name: "Charaktere", path: "/characters" },
  { name: "Planeten", path: "/planets" },
];