import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import React from 'react'
import Container from 'react-bootstrap/Container';
import { Specie } from '../types/StarWarsAPI';
import { Link } from 'react-router-dom';

interface SpecieCardProps {
    specie: Specie;
}

const SpecieCard: React.FC<SpecieCardProps> = ({ specie }) => {
    return (
        <Card className='card-border card-collection mb-4' style={{ width: "20rem" }}>
            <Card.Header as="h5">{specie.name}</Card.Header>
            <Card.Body className="d-flex flex-column justify-content-end">
                <Container>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Classification: {specie.classification}</ListGroup.Item>
                        <ListGroup.Item>Language: {specie.language}</ListGroup.Item>
                        <ListGroup.Item>Designation: {specie.designation}</ListGroup.Item>
                    </ListGroup>
                </Container>
                <Link to={`/species/${specie.id}`} className='btn custom-button'>Read more</Link>
            </Card.Body>
        </Card>
    )
}

export default SpecieCard;