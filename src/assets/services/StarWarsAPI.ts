/**
 * Star Wars API
 *
 * https://swapi.thehiveresistance.com/api
 */

import axios from "axios";
import {
	Film,
	FilmsResponse,
	PeopleResponse,
	Person,
	Planet,
	PlanetsResponse,
	Specie,
	SpeciesResponse,
	Starship,
	StarshipsResponse,
	Vehicle,
	VehiclesResponse,
} from "../types/StarWarsAPI";

const instance = axios.create({
	baseURL: "https://swapi.thehiveresistance.com/api",
	timeout: 10000,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

const get = async <T>(endpoint: string) => {
	const res = await instance.get<T>(endpoint);
	return res.data;
};

/**
 * Get all people or search for people
 */
export const getPeople = async (page: number, query: string = "") => {
	const url = query
		? `/people/?search=${query}&page=${page}`
		: `/people/?page=${page}`;
	return get<PeopleResponse>(url);
};

/**
 * Get a single person
 */
export const getPerson = async (person_id: number) => {
	return get<Person>(`/people/${person_id}`);
};

/**
 * Get all films or search for films
 */
export const getFilms = async (page: number, query: string = "") => {
	const url = query
		? `/films/?search=${query}&page=${page}`
		: `/films/?page=${page}`;
	return get<FilmsResponse>(url);
};

/**
 * Get a single film
 */
export const getFilm = async (film_id: number) => {
	return get<Film>(`/films/${film_id}`);
};

/**
 * Get all planets or search for planets
 */
export const getPlanets = async (page: number, query: string = "") => {
	const url = query
		? `/planets/?search=${query}&page=${page}`
		: `/planets/?page=${page}`;
	return get<PlanetsResponse>(url);
};

/**
 * Get a single planet
 */
export const getPlanet = async (planet_id: number) => {
	return get<Planet>(`/planets/${planet_id}`);
};

/**
 * Get all species or search for species
 */
export const getSpecies = async (page: number, query: string = "") => {
	const url = query
		? `/species/?search=${query}&page=${page}`
		: `/species/?page=${page}`;
	return get<SpeciesResponse>(url);
};

/**
 * Get a single specie
 */
export const getSpecie = async (specie_id: number) => {
	return get<Specie>(`/species/${specie_id}`);
};

/**
 * Get all starships or search for starships
 */
export const getStarships = async (page: number, query: string = "") => {
	const url = query
		? `/starships/?search=${query}&page=${page}`
		: `/starships/?page=${page}`;
	return get<StarshipsResponse>(url);
};

/**
 * Get a single starship
 */
export const getStarship = async (starship_id: number) => {
	return get<Starship>(`/starships/${starship_id}`);
};

/**
 * Get all vehicles or search for vehicles
 */
export const getVehicles = async (page: number, query: string = "") => {
	const url = query
		? `/vehicles/?search=${query}&page=${page}`
		: `/vehicles/?page=${page}`;
	return get<VehiclesResponse>(url);
};

/**
 * Get a single vehicle
 */
export const getVehicle = async (vehicle_id: number) => {
	return get<Vehicle>(`/vehicles/${vehicle_id}`);
};
