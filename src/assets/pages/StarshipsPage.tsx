import { useEffect, useState } from "react";
import { StarshipsResponse } from "../types/StarWarsAPI";
import { getStarships } from "../services/StarWarsAPI";



const StarshipsPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | false>(false);
    const [starships, setStarships] = useState<StarshipsResponse | null>(null);

    const getAllStarships = async () => {
        setError(false);
        setLoading(true);
        setStarships(null);

        try {
            const data = await getStarships();

            setStarships(data);
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
        getAllStarships();
    }, []);


    return (
        <div className="main-wrapper">
            <h2 className="main-title">Starships</h2>
            <div className="card-container">
                {starships && (
                    <>
                        {starships.data.map(starship => (
                            <div className='card' key={starship.id}>
                                <h3 className='card-title'>{starship.name}</h3>
                                <div className="text-wrapper"><p className='card-p'>Model</p><p className='card-a'>{starship.model}</p></div>
                                <div className="text-wrapper"><p className='card-p'>Manufacturer</p><p className='card-a'>{starship.manufacturer}</p></div>
                                <div className="text-wrapper"><p className='card-p'>Passengers</p><p className='card-a'>{starship.passengers}</p></div>
                                <button>Read more</button>
                            </div>
                        ))}
                    </>
                )}
            </div>

            {loading && <p>Loading...</p>}

            {error && <p className='error'>{error}</p>}
        </div>
    )
}

export default StarshipsPage;