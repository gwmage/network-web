import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Applications from './components/Applications';
import MyApplications from './components/MyApplications';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/applications">Applications</Link>
            </li>
            <li>
              <Link to="/my-applications">My Applications (신청 정보)</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/applications" element={<Applications />} />
          <Route path="/my-applications" element={<MyApplications />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;