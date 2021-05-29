import './App.css';
import { Navbar } from './components/Navbar';
import SignIn from './pages/SignIn';
import Notes from './pages/Notes';
import Calendar from 'react-calendar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <SignIn/>
      <Notes />
      <Calendar />
    </div>
  );
}

export default App;
