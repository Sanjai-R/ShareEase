import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PrivateRoute from './routes/privateRoute';
import Auth from './pages/Auth/Auth';
import Layout from './container/Layout';
import ExplorePage from './pages/ExplorePage';
import UploadPage from './pages/UploadPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/login"
          element={<Auth isLoginContainer={true} isCheck={true} />}
        />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/dashboard" element={<h1>dashboard</h1>} />
            <Route path="/upload" element={<UploadPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
