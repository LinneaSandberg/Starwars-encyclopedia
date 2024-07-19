import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from "react-bootstrap/Card";
import { Vehicle } from "../types/StarWarsAPI";
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
        getSingleVehicle(vehicleId);
    }, [vehicleId]);

    return (
        <Container fluid className="custom">
            {vehicle && (
                <Card className="mt-4 mb-4">
                    <Card.Header as="h5">{vehicle.name}</Card.Header>
                    <Card.Body>
                        <ListGroup>
                            <ListGroup.Item>Model: {vehicle.model}</ListGroup.Item>
                            <ListGroup.Item>Vehicle Class: {vehicle.vehicle_class}</ListGroup.Item>
                            <ListGroup.Item>Manufacturer: {vehicle.manufacturer}</ListGroup.Item>
                            <ListGroup.Item>Length: {vehicle.length}</ListGroup.Item>
                            <ListGroup.Item>Cost in Credits: {vehicle.cost_in_credits}$</ListGroup.Item>
                            <ListGroup.Item>Crew: {vehicle.crew}</ListGroup.Item>
                            <ListGroup.Item>Passengers: {vehicle.passengers}</ListGroup.Item>
                            <ListGroup.Item>Max Atmosphering Speed: {vehicle.max_atmosphering_speed}</ListGroup.Item>
                            <ListGroup.Item>Cargo Capacity: {vehicle.cargo_capacity}</ListGroup.Item>
                            <ListGroup.Item>Consumables: {vehicle.consumables}</ListGroup.Item>
                        </ListGroup>
                        <Container className="wrapper-list">
                            <h4>Films:</h4>
                            <ul className="link-list">
                                {vehicle.films.map(film => (
                                    <li key={film.id}><Link to={`/films/${film.id}`}>🎥 {film.title}</Link></li>
                                ))}
                            </ul>
                        </Container>
                        {vehicle.pilots && vehicle.pilots.length > 0 && (
                            <Container className="wrapper-list">
                                <h4>Pilots:</h4>
                                <ul className="link-list">
                                    {vehicle.pilots.map(pilot => (
                                        <li key={pilot.id}><Link to={`/people/${pilot.id}`}>🦾 {pilot.name}</Link></li>
                                    ))}
                                </ul>
                            </Container>
                        )}
                        <Link to="/vehicles" role="button" className="back-button" >
                            &laquo; Back
                        </Link>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
};

export default VehiclePage;