import './App.css';
import HomePage from './Pages/Home/HomePage.js';
import AddOrgPage from './Pages/AddOrgPage.js';
import OrgInfoPage from './Pages/OrgInfoPage.js';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/add' element={<AddOrgPage/>}></Route>
          <Route path='/:id' element={<OrgInfoPage/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
