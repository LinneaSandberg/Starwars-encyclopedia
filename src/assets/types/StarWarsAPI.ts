export interface PeopleResponse {
	current_page: number;
	data: Person[];
	first_page_url: string;
	from: number;
	last_page: number;
	last_page_url: string;
	links: Link[];
	next_page_url: string | null;
	path: string;
	per_page: number;
	prev_page_url: string | null;
	to: number;
	total: number;
}

export interface FilmsResponse {
	current_page: number;
	data: Film[];
	first_page_url: string;
	from: number;
	last_page: number;
	last_page_url: string;
	links: Link[];
	next_page_url: string | null;
	path: string;
	per_page: number;
	prev_page_url: string | null;
	to: number;
	total: number;
}

export interface Person {
	id: number;
	name: string;
	birth_year: string;
	eye_color: string;
	hair_color: string;
	height: string;
	mass: string;
	films_count: number;
	species_count: number;
	starships_count: number;
	vehicles_count: number;
	homeworld: Planet;
	films: Film[];
	species: Species[];
	starships: Starship[];
	vehicles: Vehicle[];
}

export interface Film {
	id: number;
	title: string;
	episode_id: string;
	opening_crawl: string;
	director: string;
	producer: string;
	release_date: string;
	characters_count?: number;
	planets_count?: number;
	starships_count?: number;
	vehicles_count?: number;
	species_count?: number;
	characters: Person[];
}

export interface Planet {
	id: number;
	name: string;
	rotation_period: string;
	orbital_period: string;
	diameter: string;
	climate: string;
	gravity: string;
	terrain: string;
	surface_water: string;
	population: string;
	residents_count: number;
	films_count: number;
}

export interface Species {
	id: number;
	name: string;
}

export interface Starship {
	id: number;
	name: string;
}

export interface Vehicle {
	id: number;
	name: string;
}

export interface Link {
	url: string | null;
	label: string;
	active: boolean;
}

export interface PlanetsResponse {}

export interface SpeciesResponse {}

export interface StarshipsResponse {}

export interface VehiclesResponse {}
