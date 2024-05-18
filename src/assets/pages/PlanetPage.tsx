import { useEffect, useState } from "react";
import { Planet } from "../types/StarWarsAPI";
import { useParams } from "react-router-dom";
import { getPlanet } from "../services/StarWarsAPI";



const PlanetPage = () => {
    const [planet, setPlanet] = useState<Planet | null>(null);
    const { id } = useParams();
    const planetId = Number(id);

    const getSinglePlanet = async (id: number) => {
        setPlanet(null);

        const data = await getPlanet(id);

        setPlanet(data);
    }

    useEffect(() => {
        getSinglePlanet(planetId);
    }, []);

    return (
        <div className="single-wrapper">
            {planet && (
                <div className="single-card">
                    <h3>{planet.name}</h3>
                    <div className="text-wrapper"><p className='card-p'>Population</p><p className='card-a'>{planet.population}</p></div>
                    <div className="text-wrapper"><p className='card-p'>Terrain</p><p className='card-a'>{planet.terrain}</p></div>
                    <div className="text-wrapper"><p className='card-p'>In</p><p className='card-a'>{planet.films_count} films</p></div>
                </div>

            )}
        </div>
    )
}

export default PlanetPage;
