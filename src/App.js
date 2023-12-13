import "./style/app.css";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import SignIn from "./components/signIn/SignIn";
import { useAuth } from "./autenticate";

function App() {
  const { user, token } = useAuth();
  return (
    <div className="wrapper">
      <HashRouter>
        <Routes>
          <Route path="/*" element={user && token ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/login" element={user && token ? <Navigate to="/*" /> : <SignIn />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

