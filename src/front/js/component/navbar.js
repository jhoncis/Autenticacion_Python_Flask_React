import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { NavLink } from "reactstrap";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
      id="mainNav"
    >
      <div className="container px-4">
        <Link className="navbar-brand" to="/">
          
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ms-auto">
            {!store.token &&(<><li className="nav-item mx-2">
              <a className="nav-link active" href="/about">
                
              </a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link active" href="/ranking">
                
              </a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link active" href="/contact">
                
              </a>
            </li></>)}
            {!store.token && (
              <>
                <li className="nav-item mx-2">
                  <a className="nav-link active" href="/loging">
                    Loging
                  </a>
                </li>
                <li className="nav-item mx-2">
                  <a className="nav-link active" href="/signup">
                    Signup
                  </a>
                </li>
            <li className="nav-item mx-2">
              <a className="nav-link active" href="/home">
                
              </a>
            </li>
              </>
            )}

          </ul>
          {store.usuario && store.usuario.name}
          {store.token && (
            <button
              onClick={() => actions.logout()}
              className="btn btn-primary"
            >
              {" "}
              Log out{" "}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
