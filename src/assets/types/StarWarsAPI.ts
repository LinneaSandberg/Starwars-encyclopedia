export interface PeopleResponse {
	current_page: number;
	data: People[];
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

export interface People {
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

export interface Link {
	url: string | null;
	label: string;
	active: boolean;
}

export interface PlanetsResponse {}

export interface FilmsResponse {}

export interface SpeciesResponse {}

export interface StarshipsResponse {}

export interface VehiclesResponse {}
