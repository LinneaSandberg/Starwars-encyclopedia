import { useEffect, useState } from "react";
import { getPeoples } from "../services/StarWarsAPI";
import { PeopleResponse } from "../types/StarWarsAPI";



const PeoplePage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | false>(false);
    const [people, setPeople] = useState<PeopleResponse | null>(null);

    const getAllPeople = async () => {
        setError(false);
        setLoading(true);
        setPeople(null);

        try {
            const data = await getPeoples();

            setPeople(data);

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An error occurred');
            }
        }

        setLoading(false);
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

            {loading && <p>Loading...</p>}

            {error && <p className='error'>{error}</p>}
        </div>
    );

}


export default PeoplePage;