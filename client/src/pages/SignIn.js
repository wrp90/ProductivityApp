// import stuff
import React, {useState} from "react";

function SignIn() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

  const handleSubmit = e => {
    e.preventDefault();
    console.log("username is " + username);
    console.log("password is " + password);
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
          <button className="btn btn-success" type="submit">
            Submit
          </button>
        </div>
        </form>
    </div>
    )
};

export default SignIn;