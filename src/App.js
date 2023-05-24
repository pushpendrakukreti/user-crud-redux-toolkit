import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Todo from './pages/Todo';
import Photo from './pages/Photo';
import Album from './pages/Album';
import Users from './pages/Users';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/todo' element={<Todo />} />
            <Route path='/photo' element={<Photo />} />
            <Route path='/album' element={<Album />} />
            <Route path='/users' element={<Users />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
