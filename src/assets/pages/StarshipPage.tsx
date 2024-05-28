import { useEffect, useState } from "react";
import { Starship } from "../types/StarWarsAPI";
import { Link, useParams } from "react-router-dom";
import { getStarship } from "../services/StarWarsAPI";
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from "react-bootstrap/Card";



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
        <Container fluid className="custom">
            {starships && (
                <Card className="mt-4 mb-4">
                    <Card.Header as="h5">{starships.name}</Card.Header>
                    <Card.Body>
                        <ListGroup>
                            <ListGroup.Item>Model: {starships.model}</ListGroup.Item>
                            <ListGroup.Item>Starship Class: {starships.starship_class}</ListGroup.Item>
                            <ListGroup.Item>Manufacturer: {starships.manufacturer}</ListGroup.Item>
                            <ListGroup.Item>Cost in Credits: {starships.cost_in_credits}$</ListGroup.Item>
                            <ListGroup.Item>Length: {starships.length}m</ListGroup.Item>
                            <ListGroup.Item>Crew: {starships.crew}</ListGroup.Item>
                            <ListGroup.Item>Passengers: {starships.passengers}</ListGroup.Item>
                            <ListGroup.Item>Max Atmosphering Speed: {starships.max_atmosphering_speed}</ListGroup.Item>
                            <ListGroup.Item>Hyperdrive Rating: {starships.hyperdrive_rating}</ListGroup.Item>
                            <ListGroup.Item>Cargo Capacity: {starships.cargo_capacity}</ListGroup.Item>
                            <ListGroup.Item>Consumables: {starships.consumables}</ListGroup.Item>
                            <ListGroup.Item>MGLT: {starships.MGLT}</ListGroup.Item>
                        </ListGroup>
                        <Container className="wrapper-list">
                            <h4>Films:</h4>
                            <ul className="link-list">
                                {starships.films.map(film => (
                                    <li key={film.id}><Link to={`/films/${film.id}`}>🎥 {film.title}</Link></li>
                                ))}
                            </ul>
                        </Container>
                        {starships.pilots && starships.pilots.length > 0 && (
                            <Container className="wrapper-list">
                                <h4>Pilots:</h4>
                                <ul className="link-list">
                                    {starships.pilots.map(pilot => (
                                        <li key={pilot.id}><Link to={`/people/${pilot.id}`}>🦾 {pilot.name}</Link></li>
                                    ))}
                                </ul>
                            </Container>
                        )}
                        <Link to="/starships" role="button" className="back-button" >
                            &laquo; Back
                        </Link>
                    </Card.Body>
                </Card>
            )}
        </Container>
    )
}

export default StarshipPage;