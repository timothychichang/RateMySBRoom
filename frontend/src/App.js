import './App.css';
import HomePage from './Pages/HomePage/HomePage.js';
import AddRoomPage from './Pages/AddRoomPage/AddRoomPage.js';
import RoomInfoPage from './Pages/RoomInfoPage/RoomInfoPage.js';
import AddReviewPage from './Pages/AddReviewPage/AddReviewPage.js';
import SignInPage from './Pages/SignInPage/SignInPage.js';
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
          <Route path='/signin' element={<SignInPage/>}></Route>
          <Route path='/addRoom' element={<AddRoomPage/>}></Route>
          <Route path='/addReview/:id' element={<AddReviewPage/>}></Route>
          <Route path='/room/:id' element={<RoomInfoPage/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
