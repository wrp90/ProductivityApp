import React from 'react';

export function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="d-flex flex-grow-1">
                <span className="w-100 d-lg-none d-block" />
                <a className="navbar-brand d-none d-lg-inline-block" href="/"> be productive please </a>
                <ul className="navbar-nav ms-auto flex-nowrap">
                    <li className="nav-item">
                        <a href="/notes" 
                        className={
                            window.location.pathname === "/notes"
                                ? "nav-link active menu-item btn btn-outline-secondary"
                                : "nav-link menu-item btn btn-outline-secondary"
                        }>Notes</a>
                    </li>
                    <li className="nav-item">
                        <a href="/reminders" 
                        className={
                            window.location.pathname === "/reminders"
                                ? "nav-link active menu-item btn btn-outline-secondary"
                                : "nav-link menu-item btn btn-outline-secondary"
                        }>Reminders</a>
                    </li>
                    <li className="nav-item">
                        <a href="/calendar" 
                        className={
                            window.location.pathname === "/calendar"
                                ? "nav-link active menu-item btn btn-outline-secondary"
                                : "nav-link menu-item btn btn-outline-secondary"
                        }>Calendar</a>
                    </li>
                </ul>
                <div class="w-100 text-right">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
            </div>
            <div className="collapse navbar-collapse flex-grow-1 text-right" id="myNavbar">
                <ul className="navbar-nav ms-auto flex-nowrap">
                    <li className="nav-item">
                        <a href="/login" className="nav-link menu-item nav-active">login or whatever</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}