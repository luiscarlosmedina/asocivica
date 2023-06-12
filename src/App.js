import Navbar from './components/navbar';
import Options from './components/options';
import User from './components/User';
import Content from './components/Content';
import "./style/app.css"


function App() {
  return (<>
    <Navbar />
    <div className='container-fluid d-flex flex-column'>
      <div className='row'>
        <div className='col-1 uno'>
          <User />
          <Options />
        </div>
        <div className='col container-fluid dos'>
          <Content />
        </div>
      </div>
    </div>
  </>
  );
}

export default App;
