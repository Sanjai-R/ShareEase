import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PrivateRoute from './routes/privateRoute';
import Auth from './pages/Auth/Auth';
import Layout from './container/Layout';
import ExplorePage from './pages/ExplorePage';
import UploadPage from './pages/UploadPage';
import Profile from './pages/Profile';
import Dashboard from './pages/DashBoard';
import EditResource from './pages/Resource/EditResource';
import Request from './pages/Request';
import Home from './pages/HomePage';
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Auth isLoginContainer={true} isCheck={true} />}
        />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/request" element={<Request />} />
            <Route path="/editResource/:id" element={<EditResource />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
