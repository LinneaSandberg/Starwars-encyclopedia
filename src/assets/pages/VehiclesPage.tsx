import { useEffect, useState } from "react";
import { VehiclesResponse } from "../types/StarWarsAPI";
import { getVehicles } from "../services/StarWarsAPI";



const VehiclesPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | false>(false);
    const [vehicles, setVehicles] = useState<VehiclesResponse | null>(null);

    const getAllVerhicles = async () => {
        setError(false);
        setLoading(true);
        setVehicles(null);

        try {
            const data = await getVehicles();

            setVehicles(data);
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
        getAllVerhicles();
    }, []);



    return (
        <div className="main-wrapper">
            <h2 className="main-title">Vehicles</h2>
            <div className="card-container">
                {vehicles && (
                    <>
                        {vehicles.data.map(vehicle => (
                            <div className='card' key={vehicle.id}>
                                <h3 className='card-title'>{vehicle.name}</h3>
                                <div className="text-wrapper"><p className='card-p'>Model</p><p className='card-a'>{vehicle.model}</p></div>
                                <div className="text-wrapper"><p className='card-p'>Manufacturer</p><p className='card-a'>{vehicle.manufacturer}</p></div>
                                <div className="text-wrapper"><p className='card-p'>Passengers</p><p className='card-a'>{vehicle.passengers}</p></div>
                                <button>Read more</button>
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

export default VehiclesPage;