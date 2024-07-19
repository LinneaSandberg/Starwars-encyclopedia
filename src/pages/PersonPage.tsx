import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from "react-bootstrap/Card";
import { Person } from "../types/StarWarsAPI";
import { getPerson } from "../services/StarWarsAPI";

const PersonPage = () => {
    const [person, setPerson] = useState<Person | null>(null);
    const { id } = useParams();
    const personId = Number(id);

    const getSinglePerson = async (id: number) => {
        setPerson(null);

        const data = await getPerson(id);

        setPerson(data);
    }

    useEffect(() => {
        getSinglePerson(personId);
    }, [personId]);

    return (
        <Container fluid className="custom">
            {person && (
                <Card className="mt-4 mb-4">
                    <Card.Header as="h5">{person.name}</Card.Header>
                    <Card.Img className="card-img" variant="top" src={person.image_url} alt="character photo"></Card.Img>
                    <Card.Body>
                        <ListGroup>
                            <ListGroup.Item>Height: {person.height}</ListGroup.Item>
                            <ListGroup.Item>Mass: {person.mass}</ListGroup.Item>
                            <ListGroup.Item>Birth Year: {person.birth_year}</ListGroup.Item>
                            <ListGroup.Item>Eye Color: {person.eye_color}</ListGroup.Item>
                            <ListGroup.Item>Hair Color: {person.hair_color}</ListGroup.Item>
                        </ListGroup>
                        <Container className="wrapper-list">
                            <h4>Homeworld:</h4>
                            <Link to={`/planets/${person.homeworld.id}`}>{person.name} lives on the 🪐 <span className="homeworld-name">{person.homeworld.name}</span></Link>
                        </Container>
                        <Container className="wrapper-list">
                            <h4>Films:</h4>
                            <ul className="link-list">
                                {person.films.map(film => (
                                    <li key={film.id}><Link to={`/films/${film.id}`}>🎥 {film.title}</Link></li>
                                ))}
                            </ul>
                        </Container>
                        {person.starships && person.starships.length > 0 && (
                            <Container className="wrapper-list">
                                <h4>Starships:</h4>
                                <ul className="link-list">
                                    {person.starships.map(starship => (
                                        <li key={starship.id}><Link to={`/starships/${starship.id}`}>🚀 {starship.name}</Link></li>
                                    ))}
                                </ul>
                            </Container>
                        )}
                        {person.vehicles && person.vehicles.length > 0 && (
                            <Container className="wrapper-list">
                                <h4>Vehicles:</h4>
                                <ul className="link-list">
                                    {person.vehicles.map(vehicle => (
                                        <li key={vehicle.id}><Link to={`/vehicles/${vehicle.id}`}>🚗 {vehicle.name}</Link></li>
                                    ))}
                                </ul>
                            </Container>
                        )}
                        {person.species && person.species.length > 0 && (
                            <Container className="wrapper-list">
                                <h4>Species:</h4>
                                <ul className="link-list">
                                    {person.species.map(specie => (
                                        <li key={specie.id}><Link to={`/species/${specie.id}`}>👽 {specie.name}</Link></li>
                                    ))}
                                </ul>
                            </Container>
                        )}
                        <Link to="/people" role="button" className="back-button" >
                            &laquo; Back
                        </Link>
                    </Card.Body>
                </Card>
            )}
        </Container>


    )

}

export default PersonPage;