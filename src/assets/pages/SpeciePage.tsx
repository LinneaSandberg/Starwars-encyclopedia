import { useEffect, useState } from "react";
import { Specie } from "../types/StarWarsAPI";
import { useParams } from "react-router-dom";
import { getSpecie } from "../services/StarWarsAPI";


const SpeciePage = () => {
    const [specie, setSpecie] = useState<Specie | null>(null);
    const { id } = useParams();
    const specieId = Number(id);


    const getSingleSpecie = async (id: number) => {
        setSpecie(null);

        const data = await getSpecie(id);

        setSpecie(data);
    }

    useEffect(() => {
        getSingleSpecie(specieId);
    }, []);

    return (
        <div className="single-wrapper">
            {specie && (
                <div className="single-card">
                    <h3>{specie.name}</h3>
                    <p>{specie.classification}</p>
                    <p>{specie.designation}</p>
                    <p>{specie.average_height}</p>

                </div>
            )}

        </div>
    )
}


export default SpeciePage;