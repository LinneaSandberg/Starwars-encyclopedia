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
	PlanetsResponse,
	SpeciesResponse,
	StarshipsResponse,
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
 * Get all planets
 */
export const getPlanets = async () => {
	return get<PlanetsResponse>("/planets");
};

/**
 * Get all species
 */
export const getSpecies = async () => {
	return get<SpeciesResponse>("/species");
};

/**
 * Get all starships
 */
export const getStarships = async () => {
	return get<StarshipsResponse>("/starships");
};

/**
 * Get all vehicles
 */
export const getVehicles = async () => {
	return get<VehiclesResponse>("/vehicles");
};
