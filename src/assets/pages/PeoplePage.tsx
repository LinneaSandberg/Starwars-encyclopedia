import { useEffect, useState } from "react";
import { getPeople } from "../services/StarWarsAPI";
import { PeopleResponse } from "../types/StarWarsAPI";



const PeoplePage = () => {
    // const [loading, setLoading] = useState<boolean>(false);
    // const [error, setError] = useState<string | null>(null);
    const [people, setPeople] = useState<PeopleResponse | null>(null);

    const getAllPeople = async () => {
        setPeople(null);


        const data = await getPeople();

        setPeople(data);
    }

    useEffect(() => {
        getAllPeople();
    }, []);

    return (
        <div className="main-wrapper">
            <h2 className="main-title">People</h2>
            <div className="card-container">
                {people && (
                    <>
                        {people.data.map(person => (
                            <div className='card' key={person.id}>
                                <h3 className='card-title'>{person.name}</h3>
                                <div className="text-wrapper"><p className='card-p'>Born</p><p className='card-a'>{person.birth_year}</p></div>
                                <div className="text-wrapper"><p className='card-p'>Homeworld</p><p className='card-a'>{person.homeworld.name}</p></div>
                                <div className="text-wrapper"><p className='card-p'>In</p><p className='card-a'>{person.films_count} films</p></div>
                                <button>Read more</button>
                            </div>

                        ))}
                    </>
                )}
            </div>
        </div>
    );
}

export default PeoplePage;