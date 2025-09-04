import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Applications from './components/Applications';


function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/applications">Applications</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/applications" element={<Applications />} />

        </Routes>
      </div>
    </Router>
  );
}


export default App;

---[END_OF_FILES]---