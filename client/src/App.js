import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar } from './components/Navbar';
import SignIn from './pages/SignIn';
import Notes from './pages/Notes';
import Reminders from './pages/Reminders';
import Calendar from './pages/Calendar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path={["/", "/signin"]}>
            <SignIn />
          </Route>
          <Route exact path={["/notes"]}>
            <Notes />
          </Route>
          <Route exact path={["/reminder"]}>
            <Reminders />
          </Route>
          <Route exact path={["/calendar"]}>
            <Calendar />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// Dashboard redirects to login if not logged in
// Phrasing on data flow
export default App;
