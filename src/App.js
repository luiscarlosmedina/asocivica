import "./style/app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard"
import SignIn from "./components/signIn/SignIn";

function App() {
  return (
    <>
      <div className="wrapper">
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Dashboard />} />
            <Route path="/login" element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
