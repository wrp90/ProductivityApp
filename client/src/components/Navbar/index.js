import React from 'react';

export function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div>
                <a className="navbar-brand" href="/">
                    be productive or something
                </a>
            </div>
            <div>
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item btn btn-sm btn-outline-secondary my-1 my-sm-0">
                        <a href="/notes"
                        className={
                            window.location.pathname === "/notes"
                                ? "nav-link active"
                                : "nav-link"
                        }
                        >
                          Notes
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/reminders"
                        className={
                            window.location.pathname === "/reminders"
                                ? "nav-link active"
                                : "nav-link"
                        }
                        >
                          Reminders
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/calendar"
                        className={
                            window.location.pathname === "/calendar"
                                ? "nav-link active"
                                : "nav-link"
                        }
                        >
                          Calendar
                        </a>
                    </li>
                </ul>
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/login">
                            login or whatever
                        </a>
                    </li>
                </ul>
            </div>
            <div className="">

            </div>
        </nav>
    )
}