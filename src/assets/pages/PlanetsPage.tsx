import { useEffect, useState } from "react";
import { PlanetsResponse } from "../types/StarWarsAPI";
import { getPlanets } from "../services/StarWarsAPI";



const PlanetsPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | false>(false);
    const [planets, setPlanets] = useState<PlanetsResponse | null>(null);

    const getAllPlanets = async () => {
        setError(false);
        setLoading(true);
        setPlanets(null);

        try {
            const data = await getPlanets();

            setPlanets(data);

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
        getAllPlanets();
    }, []);

    return (
        <div className="main-wrapper">
            <h2 className="main-title">Planets</h2>
            <div className="card-container">
                {planets && (
                    <>
                        {planets.data.map(planet => (
                            <div className='card' key={planet.id}>
                                <h3 className='card-title'>{planet.name}</h3>
                                <div className="text-wrapper"><p className='card-p'>Population</p><p className='card-a'>{planet.population}</p></div>
                                <div className="text-wrapper"><p className='card-p'>Terrain</p><p className='card-a'>{planet.terrain}</p></div>
                                <div className="text-wrapper"><p className='card-p'>In</p><p className='card-a'>{planet.films_count} films</p></div>
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

export default PlanetsPage;