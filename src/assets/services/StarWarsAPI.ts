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
 * Get all people
 */
export const getPeoples = async () => {
	return get<PeopleResponse>("/people");
};

/**
 * Get a single person
 */
export const getPerson = async (person_id: number) => {
	return get<Person>(`/people/${person_id}`);
};

/**
 * Get all films
 */
export const getFilms = async () => {
	return get<FilmsResponse>("/films");
};

/**
 * Get a single film
 */
export const getFilm = async (film_id: number) => {
	return get<Film>(`/films/${film_id}`);
};

/**
 * Search for films
 */
export const searchForFilms = async (query: string) => {
	return get<FilmsResponse>(`/films/?search=${query}`);
};

/**
 * Search for films with pagination
 */
export const searchForFilmsPage = async (page = 0) => {
	return get<FilmsResponse>(`/films/?page=${page}`);
};

/**
 * Get all planets
 */
export const getPlanets = async () => {
	return get<PlanetsResponse>("/planets");
};

/**
 * Get a single planet
 */
export const getPlanet = async (planet_id: number) => {
	return get<Planet>(`/planets/${planet_id}`);
};

/**
 * Get all species
 */
export const getSpecies = async () => {
	return get<SpeciesResponse>("/species");
};

/**
 * Get a single specie
 */
export const getSpecie = async (specie_id: number) => {
	return get<Specie>(`/species/${specie_id}`);
};

/**
 * Get all starships
 */
export const getStarships = async () => {
	return get<StarshipsResponse>("/starships");
};

/**
 * Get a single starship
 */
export const getStarship = async (starship_id: number) => {
	return get<Starship>(`/starships/${starship_id}`);
};

/**
 * Get all vehicles
 */
export const getVehicles = async () => {
	return get<VehiclesResponse>("/vehicles");
};

/**
 * Get a single vehicle
 */
export const getVehicle = async (vehicle_id: number) => {
	return get<Vehicle>(`/vehicles/${vehicle_id}`);
};
