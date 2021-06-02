import React, { useState } from "react";

function SignUp() {
    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = e => {
        e.preventDefault();
        console.log("name is " + name);
        console.log("username is " + username);
        console.log("password is " + password);
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
                                placeholder="name"
                                name="name"
                                onChange={e => setName(e.target.value)}
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