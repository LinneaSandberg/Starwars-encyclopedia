import { useEffect, useState } from "react";
import { Starship } from "../types/StarWarsAPI";
import { useParams } from "react-router-dom";
import { getStarship } from "../services/StarWarsAPI";



const StarshipPage = () => {
    const [starships, setStarship] = useState<Starship | null>(null);
    const { id } = useParams();
    const starshipId = Number(id);

    const getSingleStarship = async (id: number) => {
        setStarship(null);

        const data = await getStarship(id);

        setStarship(data);
    }

    useEffect(() => {
        getSingleStarship(starshipId)
    }, []);

    return (
        <div className="single-wrapper">
            {starships && (

                <div className="single-card">
                    <h3>{starships.name}</h3>
                    <p>{starships.model}</p>
                    <p>{starships.manufacturer}</p>
                    <p>{starships.cost_in_credits}</p>
                </div>
            )}
        </div>
    )
}

export default StarshipPage;