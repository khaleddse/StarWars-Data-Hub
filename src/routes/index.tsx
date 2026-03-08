import UniversalGrid from '../pages/UniversalGrid';
import UniversalDetails from '../pages/UniversalDetails';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:category" element={<UniversalGrid />} />
      <Route path="/:category/:id" element={<UniversalDetails />} />
    </Routes>
  );
};

export default AppRoutes;
