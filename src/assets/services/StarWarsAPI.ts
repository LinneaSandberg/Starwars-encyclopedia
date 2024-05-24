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
export const getPeople = async (page: number) => {
	return get<PeopleResponse>(`/people/?page=${page}`);
};

/**
 * Get a single person
 */
export const getPerson = async (person_id: number) => {
	return get<Person>(`/people/${person_id}`);
};

/**
 * Search for people
 */
export const searchForPeople = async (query: string, page: number) => {
	return get<PeopleResponse>(`/people/?search=${query}&page=${page}`);
};

/**
 * Get all films
 */
export const getFilms = async (page: number) => {
	return get<FilmsResponse>(`/films/?page=${page}`);
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
export const searchForFilms = async (query: string, page: number) => {
	return get<FilmsResponse>(`/films/?search=${query}&page=${page}`);
};

/**
 * Get all planets
 */
export const getPlanets = async (page: number) => {
	return get<PlanetsResponse>(`/planets/?page=${page}`);
};

/**
 * Get a single planet
 */
export const getPlanet = async (planet_id: number) => {
	return get<Planet>(`/planets/${planet_id}`);
};

/**
 * Search for planets
 */
export const searchForPlanets = async (query: string, page: number) => {
	return get<PlanetsResponse>(`/planets/?search=${query}&page=${page}`);
};

/**
 * Get all species
 */
export const getSpecies = async (page: number) => {
	return get<SpeciesResponse>(`/species/?page=${page}`);
};

/**
 * Get a single specie
 */
export const getSpecie = async (specie_id: number) => {
	return get<Specie>(`/species/${specie_id}`);
};

/**
 * Search for species
 */
export const searchForSpecies = async (query: string, page: number) => {
	return get<SpeciesResponse>(`/species/?search=${query}&page=${page}`);
};

/**
 * Get all starships
 */
export const getStarships = async (page: number) => {
	return get<StarshipsResponse>(`/starships/?page=${page}`);
};

/**
 * Get a single starship
 */
export const getStarship = async (starship_id: number) => {
	return get<Starship>(`/starships/${starship_id}`);
};

/**
 * Search for starships
 */
export const searchForStarships = async (query: string, page: number) => {
	return get<StarshipsResponse>(`/starships/?search=${query}&page=${page}`);
};

/**
 * Get all vehicles
 */
export const getVehicles = async (page: number) => {
	return get<VehiclesResponse>(`/vehicles/?page=${page}`);
};

/**
 * Get a single vehicle
 */
export const getVehicle = async (vehicle_id: number) => {
	return get<Vehicle>(`/vehicles/${vehicle_id}`);
};

/**
 * Search for vehicles
 */
export const searchForVehicles = async (query: string, page: number) => {
	return get<VehiclesResponse>(`/vehicles/?search=${query}&page=${page}`);
};
