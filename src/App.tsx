import { Routes, Route } from "react-router-dom";
import "./assets/scss/App.scss";
import Navigation from "./assets/components/Navigation";
import FilmsPage from "./assets/pages/FilmsPage";
import HomePage from "./assets/pages/HomePage";
import PlanetsPage from "./assets/pages/PlanetsPage";
import SpeciesPage from "./assets/pages/SpeciesPage";
import StarshipsPage from "./assets/pages/StarshipsPage";
import VehiclesPage from "./assets/pages/VehiclesPage";
import NotFoundPage from "./assets/pages/NotFoundPage";
import FilmPage from "./assets/pages/FilmPage";
import PersonPage from "./assets/pages/PersonPage";
import PeoplePage from "./assets/pages/PeoplePage";
import PlanetPage from "./assets/pages/PlanetPage";
import VehiclePage from "./assets/pages/VehiclePage";
import SpeciePage from "./assets/pages/SpeciePage";
import StarshipPage from "./assets/pages/StarshipPage";



function App() {
  return (
    <div>
      <Navigation />

      <div className="custom">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/films" element={<FilmsPage />} />
          <Route path="/films/:id" element={<FilmPage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/people/:id" element={<PersonPage />} />
          <Route path="/planets" element={<PlanetsPage />} />
          <Route path="/planets/:id" element={<PlanetPage />} />
          <Route path="/species" element={<SpeciesPage />} />
          <Route path="/species/:id" element={<SpeciePage />} />
          <Route path="/starships" element={<StarshipsPage />} />
          <Route path="/starships/:id" element={<StarshipPage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/vehicles/:id" element={<VehiclePage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>


    </div>
  )
}

export default App;
