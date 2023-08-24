import "./style/app.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import SignIn from "./components/signIn/SignIn";

function App() {
  return (
    <>
      <div className="wrapper">
        <HashRouter>
          <Routes>
            <Route path="/*" element={<Dashboard />} />
            <Route path="/login" element={<SignIn />} />
          </Routes>
        </HashRouter>
      </div>
    </>
  );
}

export default App;
