import './App.css';
import HomePage from './Pages/HomePage/HomePage.js';
import AddRoomPage from './Pages/AddRoomPage/AddRoomPage.js';
import RoomInfoPage from './Pages/RoomInfoPage/RoomInfoPage.js';
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
          <Route path='/add' element={<AddRoomPage/>}></Route>
          <Route path='/:id' element={<RoomInfoPage/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
