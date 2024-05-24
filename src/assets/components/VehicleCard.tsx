import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import React from 'react'
import Container from 'react-bootstrap/Container';
import { Vehicle } from '../types/StarWarsAPI';
import { Link } from 'react-router-dom';

interface VehicleCardProps {
    vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
    return (
        <Card border="light" style={{ width: "20rem" }}>
            <Card.Body className="d-flex flex-column justify-content-end">
                <Card.Title>{vehicle.name}</Card.Title>
                <Container>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Model: {vehicle.model}</ListGroup.Item>
                        <ListGroup.Item>Manufacturer: {vehicle.manufacturer}</ListGroup.Item>
                        <ListGroup.Item>{vehicle.crew} crew members</ListGroup.Item>
                    </ListGroup>
                </Container>
                <Link to={`/vehicles/${vehicle.id}`} className='btn custom-button'>Read more</Link>
            </Card.Body>
        </Card>
    )
}

export default VehicleCard;