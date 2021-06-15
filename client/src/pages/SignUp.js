import React, { useState } from "react";
import API from "../utils/loginAPI";

function SignUp() {
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = e => {
        e.preventDefault();
        API.newUser({
            email: email,
            username: username,
            password: password
        })
            .then(res => { return window.location.replace("/login") })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <div className="mt-4">
                <h2>Sign Up</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mt-3 px-5">
                    <div className="form-group">
                        <div size="12">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="email"
                                name="email"
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
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
                        SignUp
                    </button>
                </div>
            </form>
        </div>
    )
};

export default SignUp;