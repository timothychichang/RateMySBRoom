import './App.css';
import HomePage from './Pages/HomePage/HomePage.js';
import AddOrgPage from './Pages/AddOrgPage/AddOrgPage.js';
import OrgInfoPage from './Pages/OrgInfoPage/OrgInfoPage.js';
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
