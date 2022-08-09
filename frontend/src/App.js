import './App.css';
import HomePage from './Pages/Home/HomePage.js';
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
