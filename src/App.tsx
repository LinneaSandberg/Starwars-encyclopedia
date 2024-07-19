import { Routes, Route } from "react-router-dom";
import "./assets/scss/App.scss";
import Navigation from "./components/Navigation";
import FilmsPage from "./pages/FilmsPage";
import HomePage from "./pages/HomePage";
import PlanetsPage from "./pages/PlanetsPage";
import SpeciesPage from "./pages/SpeciesPage";
import StarshipsPage from "./pages/StarshipsPage";
import VehiclesPage from "./pages/VehiclesPage";
import NotFoundPage from "./pages/NotFoundPage";
import FilmPage from "./pages/FilmPage";
import PersonPage from "./pages/PersonPage";
import PeoplePage from "./pages/PeoplePage";
import PlanetPage from "./pages/PlanetPage";
import VehiclePage from "./pages/VehiclePage";
import SpeciePage from "./pages/SpeciePage";
import StarshipPage from "./pages/StarshipPage";



function App() {
  return (
    <div id="App">
      <Navigation />

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
  )
}

export default App;
