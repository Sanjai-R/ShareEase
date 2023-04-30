import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PrivateRoute from './routes/privateRoute';
import Auth from './pages/Auth/Auth';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<Auth isLoginContainer={true} isCheck={true} />}
        />
        <Route element={<PrivateRoute />}>
          <Route path="/Items" element={<div>Items</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
