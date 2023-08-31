import "./style/app.css";
import { HashRouter, Routes, Route, BrowserRouter} from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import SignIn from "./components/signIn/SignIn";


function App() {
  
  return (
    <>
      <div className="wrapper">
        <HashRouter>
          <Routes>
            <Route path="/dashboard" element={<Dashboard/>}
            />
            <Route path="/*" element={<SignIn />} />
          </Routes>
        </HashRouter>
      </div>
    </>
  );
}

export default App;
