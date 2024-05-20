import { useEffect, useState } from "react";
import { Vehicle } from "../types/StarWarsAPI";
import { useParams } from "react-router-dom";
import { getVehicle } from "../services/StarWarsAPI";



const VehiclePage = () => {
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const { id } = useParams();
    const vehicleId = Number(id);

    const getSingleVehicle = async (id: number) => {
        setVehicle(null);

        const data = await getVehicle(id);

        setVehicle(data);
    }

    useEffect(() => {
        getSingleVehicle(vehicleId)
    }, []);


    return (
        <div className="single-wrapper">
            {vehicle && (
                <div className="single-card">
                    <h3>{vehicle.name}</h3>
                    <p>{vehicle.model}</p>
                    <p>{vehicle.manufacturer}</p>
                    <p>{vehicle.cost_in_credits}</p>
                    <p>{vehicle.length}</p>
                    <p>{vehicle.max_atmosphering_speed}</p>
                    <p>{vehicle.crew}</p>
                    <p>{vehicle.passengers}</p>
                    <p>{vehicle.cargo_capacity}</p>
                    <p>{vehicle.consumables}</p>
                    <p>{vehicle.vehicle_class}</p>

                </div>
            )}
            <h1>Vehicle Page</h1>
        </div>
    );
};



export default VehiclePage;