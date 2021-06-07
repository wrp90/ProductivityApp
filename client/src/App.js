import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar } from './components/Navbar';
import SignIn from './pages/SignIn';
import Notes from './pages/Notes';
import Reminders from './pages/Reminders';
import Calendar from './pages/Calendar';
import SignUp from './pages/SignUp';
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path={["/"]}>
            <Dashboard />
          </Route>
          {/* When signed in ^, when not signed in v, (NOT IMPLEMENTED YET) */}
          <Route exact path={["/login"]}>
            <SignIn />
          </Route>
          <Route exact path={["/notes"]}>
            <Notes />
          </Route>
          <Route exact path={["/reminders"]}>
            <Reminders />
          </Route>
          <Route exact path={["/calendar"]}>
            <Calendar />
          </Route>
          <Route exact path={["/signup"]}>
            <SignUp />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// Dashboard redirects to login if not logged in
// Phrasing on data flow
export default App;