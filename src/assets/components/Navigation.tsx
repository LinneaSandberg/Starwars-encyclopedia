import { Link } from "react-router-dom";


const Navigation = () => {
    return (

        <nav className="navbar">
            <div>
                <h1>Star Wars</h1>
            </div>
            <div>
                <ul className="navbar-list">
                    <li><Link to={"/films"}>Films</Link></li>
                    <li><Link to={"/people"}>People</Link></li>
                    <li><Link to={"/planets"}>Planets</Link></li>
                    <li><Link to={"/species"}>Species</Link></li>
                    <li><Link to={"/starships"}>Starships</Link></li>
                    <li><Link to={"/vehicles"}>Vehicles</Link></li>
                </ul>
            </div>
        </nav>



    )
}

export default Navigation;