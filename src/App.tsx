import { Routes, Route } from "react-router-dom";
import "./assets/scss/App.scss";
import Navigation from "./assets/components/Navigation";
import FilmsPage from "./assets/pages/FilmsPage";
import HomePage from "./assets/pages/HomePage";
import PeoplePage from "./assets/pages/PeoplePage";
import PlanetsPage from "./assets/pages/PlanetsPage";
import SpeciesPage from "./assets/pages/SpeciesPage";
import StarshipsPage from "./assets/pages/StarshipsPage";
import VehiclesPage from "./assets/pages/VehiclesPage";
import NotFoundPage from "./assets/pages/NotFoundPage";



function App() {
  return (
    <div>
      <Navigation />

      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/films" element={<FilmsPage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/planets" element={<PlanetsPage />} />
          <Route path="/species" element={<SpeciesPage />} />
          <Route path="/starships" element={<StarshipsPage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>


    </div>
  )
}

export default App
