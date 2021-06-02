// import stuff
import React, { useState } from "react";
import { Link, Route, useLocation } from "react-router-dom";
import SignUp from "./SignUp";

function SignIn() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = e => {
    e.preventDefault();
    console.log("username is " + username);
    console.log("password is " + password);
  };

  const location = useLocation();

  return (
    <div>
      <div className="mt-4">
        <h2>Sign In</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-3 px-5">
          <div className="form-group">
            <div size="12">
              <input
                className="form-control"
                type="text"
                placeholder="Username"
                name="username"
                onChange={e => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <div size="12">
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                name="password"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <button className="btn btn-success col col-md-2 offset-md-5" type="submit">
              Submit
            </button>

            {/* <Link to="./signup" component={SignUp}>Not a user? Sign up.</Link> */}
            <Link
              to="/signup"
              className={location.pathname === "/signup" ? "nav-link active" : "nav-link"}
            >
              Not a user? Sign up.
            </Link>
            <Route exact path={`/signup`} component={SignUp} />

            {/* <a href="./signup" className="col col-md-1 offset-md-4 text-end"></a> */}
          </div>
        </div>
      </form>
    </div>
  )
};

export default SignIn;