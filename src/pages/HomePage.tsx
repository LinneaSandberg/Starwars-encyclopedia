import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <Container fluid className="homepage-wrapper">
            <div className="homepage-giphy">
                <div className="overlay-text">
                    <h2>Star Wars Encyclopedia</h2>
                </div>
                <img src="https://media.giphy.com/media/NFggbnBvFwKbK/giphy.gif" alt="Robot Lazer GIF" />
            </div>
            <div className="homepage-info">
                <ListGroup horizontal className="wrapper-homepage-links">
                    <ListGroup.Item className="homepage-links" as={Link} to="/films">Films</ListGroup.Item>
                    <ListGroup.Item className="homepage-links" as={Link} to="/people">People</ListGroup.Item>
                    <ListGroup.Item className="homepage-links" as={Link} to="/planets">Planets</ListGroup.Item>
                    <ListGroup.Item className="homepage-links" as={Link} to="/species">Species</ListGroup.Item>
                    <ListGroup.Item className="homepage-links" as={Link} to="/starships">Starships</ListGroup.Item>
                    <ListGroup.Item className="homepage-links" as={Link} to="/vehicles">Vehicles</ListGroup.Item>
                </ListGroup>
            </div>
            <div className="homepage-text-wrapper">
                <h3 className="h4 mb-3">Welcome to the Ultimate Star Wars Encyclopedia!</h3>
                <p>
                    Dive into the vast and fascinating Star Wars universe like never before. This encyclopedia is your definitive guide to everything you need to know about the galaxy's most iconic characters, planets, films, species, starships, and vehicles.
                    Whether you are a new fan or a lifelong follower, this comprehensive collection contains all the facts and information you could ever need.
                </p>
                <p>
                    Explore detailed biographies of legendary characters such as Luke Skywalker, Darth Vader, Princess Leia, and Yoda. Gain insights into their backgrounds, their journeys, and their crucial roles in the Star Wars saga.
                </p>
                <p>
                    The Ultimate Star Wars Encyclopedia is your key to understanding and appreciating the many layers of facts and information that make the Star Wars universe so fascinating and beloved.
                </p>
                <p>
                    May the Force be with you.
                </p>
            </div>
        </Container>
    );
}

export default HomePage;