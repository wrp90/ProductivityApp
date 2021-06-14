// import stuff
import React, { useState } from "react";
import API from "../utils/loginAPI";

function SignIn() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = e => {
    e.preventDefault();
    API.getUser({
      username: username
    })
      .then(res => {
        // insert authentication check here
        if (res.data[0].password === password) {
          sessionStorage.setItem('id', res.data[0]._id)
          return window.location.replace("/");
        }
      })
      .catch(err => console.log(err));
  };

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
              <a href="/signup">
                Not a user? Sign up.
              </a>
          </div>
        </div>
      </form>
    </div>
  )
};

export default SignIn;