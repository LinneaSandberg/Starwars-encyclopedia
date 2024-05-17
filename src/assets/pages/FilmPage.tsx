import { Link, useParams } from "react-router-dom";
import { Film } from "../types/StarWarsAPI";
import { useEffect, useState } from "react";
import { getFilm } from "../services/StarWarsAPI";


const FilmPage = () => {
    const [film, setFilm] = useState<Film | null>(null);
    const { id } = useParams();
    const filmId = Number(id);

    const getSingleFilm = async (id: number) => {
        setFilm(null);

        const data = await getFilm(id);

        setFilm(data);
    }

    useEffect(() => {
        getSingleFilm(filmId);
    }, []);



    return (
        <div className="single-wrapper">
            {film && (

                <div className="single-card">
                    <h3>{film.title}</h3>
                    <p>{film.opening_crawl}</p>
                    <p>{film.director}</p>
                    <p>{film.producer}</p>
                    <p>{film.release_date}</p>



                    <ul>
                        {film.characters.map(character => (
                            <li key={character.id}><Link to={`/people/${character.id}`}>{character.name}</Link></li>

                        ))}

                    </ul>
                    <p>Characters:</p>
                    <p>{film.characters_count}</p>
                    <p>Planets:</p>
                    <p>{film.planets_count}</p>
                    <p>Starships:</p>
                    <p>{film.starships_count}</p>
                    <p>Vehicles:</p>
                    <p>{film.vehicles_count}</p>
                    <p>Species:</p>
                    <p>{film.species_count}</p>
                </div>
            )}

        </div>
    )
}

export default FilmPage;