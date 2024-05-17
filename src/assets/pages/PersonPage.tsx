import { useEffect, useState } from "react";
import { Person } from "../types/StarWarsAPI";
import { Link, useParams } from "react-router-dom";
import { getPerson } from "../services/StarWarsAPI";



const PersonPage = () => {
    const [person, setPerson] = useState<Person | null>(null);
    const { id } = useParams();
    const personId = Number(id);

    const getSinglePerson = async (id: number) => {
        setPerson(null);

        const data = await getPerson(id);

        setPerson(data);
    }

    useEffect(() => {
        getSinglePerson(personId);
    }, []);

    return (
        <div className="single-wrapper">
            {person && (
                <div className="single-card">
                    <h3>{person.name}</h3>
                    <div className="text-wrapper"><p className='card-p'>Birth Year</p><p className='card-a'>{person.birth_year}</p></div>
                    <div className="text-wrapper"><p className='card-p'>Eye colour</p><p className='card-a'>{person.eye_color}</p></div>
                    <div className="text-wrapper"><p className='card-p'>Hair colour</p><p className='card-a'>{person.hair_color}</p></div>
                    <div className="text-wrapper"><p className='card-p'>Height</p><p className='card-a'>{person.height}</p></div>
                    <div className="text-wrapper"><p className='card-p'>Mass</p><p className='card-a'>{person.mass}</p></div>


                    <h4>Links</h4>
                    <div className="text-wrapper"><p className='card-p'>Homeworld</p><p className='card-a'>{person.homeworld.name}</p></div>

                    <h5>Homeworld</h5>
                    <ul>
                        <li key={person.homeworld.id}><Link to={`/homeworld/${person.homeworld.id}`}>{person.homeworld.name}</Link></li>
                    </ul>

                    <h5>Films</h5>
                    <ul>
                        {person.films.map(film =>
                            <li key={film.id}><Link to={`/films/${film.id}`}>{film.title}</Link></li>
                        )}
                    </ul>

                    <h5>Species</h5>
                    <ul>
                        {person.species.map(species =>
                            <li key={species.id}><Link to={`/species/${species.id}`}>{species.name}</Link></li>
                        )}
                    </ul>

                    <h5>Starships</h5>
                    <ul>
                        {person.starships.map(starship =>
                            <li key={starship.id}><Link to={`/starships/${starship.id}`}>{starship.name}</Link></li>
                        )}
                    </ul>

                    <h5>Vehicles</h5>
                    <ul>
                        {person.vehicles.map(vehicle =>
                            <li key={vehicle.id}><Link to={`/vehicles/${vehicle.id}`}>{vehicle.name}</Link></li>
                        )}
                    </ul>

                </div>
            )}
        </div>
    )

}

export default PersonPage;