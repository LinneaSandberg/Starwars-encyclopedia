import { useEffect, useState } from "react";
import { SpeciesResponse } from "../types/StarWarsAPI";
import { getSpecies } from "../services/StarWarsAPI";




const SpeciesPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | false>(false);
    const [species, setSpecies] = useState<SpeciesResponse | null>(null);

    const getAllSpecies = async () => {
        setError(false);
        setLoading(true);
        setSpecies(null);

        try {
            const data = await getSpecies();

            setSpecies(data);
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
        getAllSpecies();
    }, []);



    return (
        <div className="main-wrapper">
            <h2 className="main-title">Species</h2>
            <div className="card-container">
                {species && (
                    <>
                        {species.data.map(species => (
                            <div className='card' key={species.id}>
                                <h3 className='card-title'>{species.name}</h3>
                                <div className="text-wrapper"><p className='card-p'>Classification</p><p className='card-a'>{species.classification}</p></div>
                                <div className="text-wrapper"><p className='card-p'>Designation</p><p className='card-a'>{species.designation}</p></div>
                                <div className="text-wrapper"><p className='card-p'>Average Height</p><p className='card-a'>{species.average_height}</p></div>
                            </div>
                        ))}

                    </>

                )}

            </div>

            {loading && <p>Loading...</p>}

            {error && <p className='error'>{error}</p>}

        </div >
    );

}

export default SpeciesPage;