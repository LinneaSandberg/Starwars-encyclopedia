/**
 * Star Wars API
 *
 * https://swapi.thehiveresistance.com/api
 */

import axios from "axios";
import {
	FilmsResponse,
	PeopleResponse,
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
export const getPeople = async () => {
	return get<PeopleResponse>("/people");
};

/**
 * Get all planets
 */
export const getPlanets = async () => {
	return get<PlanetsResponse>("/planets");
};

/**
 * Get all films
 */
export const getFilms = async () => {
	return get<FilmsResponse>("/films");
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
