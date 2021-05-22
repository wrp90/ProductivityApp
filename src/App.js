import './App.css';
import { Navbar } from './components/Navbar';
import SignIn from './pages/SignIn';

function App() {
  return (
    <div className="App">
      <Navbar />
      <SignIn/>
    </div>
  );
}

export default App;
