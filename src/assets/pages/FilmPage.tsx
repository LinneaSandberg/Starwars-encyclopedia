import { Link, useParams } from "react-router-dom";
import { Film } from "../types/StarWarsAPI";
import { useEffect, useState } from "react";
import { getFilm } from "../services/StarWarsAPI";
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from "react-bootstrap/Card";


const FilmPage = () => {
    const [film, setFilm] = useState<Film | null>(null);
    const { id } = useParams();
    const filmId = Number(id);

    const getSingleFilm = async (id: number) => {
        setFilm(null);

        const data = await getFilm(id);

        setFilm(data);
    }

    useEffect(() => {
        getSingleFilm(filmId);
    }, []);



    return (

        <Container fluid>
            {film && (
                <Card className="mt-4 mb-4">
                    <Card.Header as="h5">{film.title}</Card.Header>
                    <Card.Img className="card-img" variant="top" src={film.image_url} alt="film image" />
                    <Card.Body>
                        <Card.Text>{film.opening_crawl}</Card.Text>
                        <ListGroup>
                            <ListGroup.Item>Episode: {film.episode_id}</ListGroup.Item>
                            <ListGroup.Item>Director: {film.director}</ListGroup.Item>
                            <ListGroup.Item>Producer: {film.producer}</ListGroup.Item>
                            <ListGroup.Item>Release Date: {film.release_date}</ListGroup.Item>
                        </ListGroup>
                        <Container className="wrapper-list">
                            <h4>Characters:</h4>
                            <ul className="link-list">
                                {film.characters.map(character => (
                                    <li key={character.id}><Link to={`/people/${character.id}`}>🦾 {character.name}</Link></li>
                                ))}
                            </ul>
                        </Container>
                        <Container className="wrapper-list">
                            <h4>Planets:</h4>
                            <ul className="link-list">
                                {film.planets.map(planet => (
                                    <li key={planet.id}><Link to={`/planets/${planet.id}`}>🪐 {planet.name}</Link></li>
                                ))}
                            </ul>
                        </Container>
                        <Container className="wrapper-list">
                            <h4>Starships:</h4>
                            <ul className="link-list">
                                {film.starships.map(starship => (
                                    <li key={starship.id}><Link to={`/starships/${starship.id}`}>🚀 {starship.name}</Link></li>
                                ))}
                            </ul>
                        </Container>
                        <Container className="wrapper-list">
                            <h4>Vehicles:</h4>
                            <ul className="link-list">
                                {film.vehicles.map(vehicle => (
                                    <li key={vehicle.id}><Link to={`/vehicles/${vehicle.id}`}>🚦 {vehicle.name}</Link></li>
                                ))}
                            </ul>
                        </Container>
                        <Container className="wrapper-list">
                            <h4>Species:</h4>
                            <ul className="link-list">
                                {film.species.map(specie => (
                                    <li key={specie.id}><Link to={`/species/${specie.id}`}>👽 {specie.name}</Link></li>
                                ))}
                            </ul>
                        </Container>
                        <Link to="/films" role="button" className="back-button" >
                            &laquo; Back
                        </Link>
                    </Card.Body>
                </Card>
            )}
        </Container>
    )
}

export default FilmPage;