import { useEffect, useState } from "react";
import { FilmsResponse } from "../types/StarWarsAPI";
import { getFilms } from "../services/StarWarsAPI";


const FilmsPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | false>(false);
    const [films, setFilms] = useState<FilmsResponse | null>(null);

    const getAllFilms = async () => {
        setError(false);
        setLoading(true);
        setFilms(null);

        try {
            const data = await getFilms();

            setFilms(data);
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
        getAllFilms();
    }, []);


    return (
        <div className="main-wrapper">
            <h2 className="main-title">Films</h2>
            <div className="card-container">
                {films && (
                    <>
                        {films.data.map(film => (
                            <div className='card' key={film.id}>
                                <h3 className='card-title'>{film.title}</h3>
                                <div className="text-wrapper"><p className='card-p'>Episode</p><p className='card-a'>{film.episode_id}</p></div>
                                <div className="text-wrapper"><p className='card-p'>Released</p><p className='card-a'>{film.release_date}</p></div>
                                <div className="text-wrapper"><p className='card-p'>{film.characters_count}</p><p className='card-a'> characters</p></div>
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

export default FilmsPage;