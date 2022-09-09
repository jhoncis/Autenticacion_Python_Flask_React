import React, { Component, useContext, useState } from "react";
import {
  Button,
  FormGroup,
  Label,
  Input,
  FormText,
  Form,
  Col,
  Row,
  NavItem,
  Navbar,
  Modal,
} from "reactstrap";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import "../../styles/index.css";
import "../../styles/login.css";

export const Loging = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  console.log("This is your token", store.token);
  const handleClick = async () => {
    await actions.loging(email, password); //.then(() =>{
    //navigate("/");
    //});
    console.log("entra")
    handRedirec();
  };

  if (store.token && store.token != "" && store.token != undefined)
    navigate("/");

  const handleLoging = () => {
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    fetch(process.env.BACKEND_URL + "/api/loging", opts)
      .then((resp) => {
        if (resp.status === 200) return resp.json();
        else alert("There has been some error");
      })
      .then((data) => {
        console.log("this came from the backend", data);
        sessionStorage.setItem("token", data.access_token);
        handRedirec();
      })
      .catch((error) => {
        console.error("There was an error!!!!", error);
      });
  };

  return (
    <div className="contenedorlogin px-3 py-3 vh-100 justify-content-sm-center d-flex align-items-center align-self-center">
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
        rel="stylesheet"
      />

      <div className="container bootstrap snippets bootdey d-flex justify-content-between ">
        <div
          className="lc-block col-md-5 col-md-offset-5 toggled mx-auto justify-content-sm-center "
          id="l-login"
        >
          <div className="lcb-float">
            <i className="fa fa-users justify-content-sm-center"></i>
          </div>

          <div className="modal-header justify-content-sm-center">
            <h1>Login</h1>
          </div>

          {store.token && store.token != "" && store.token != undefined ? (
            "You are logged in with this token" + store.token
          ) : (
            <div className="modal-body">
              <form class="form col-md-12 center-block">
                <div className="form-group">
                  <input
                    className="form-control input-lg"
                    type="text"
                    placeholder="Correo electrónico"
                    autofocus="autofocus"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <input
                    className="form-control input-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </form>
              <div className="form-group d-flex justify-content-center">
                <button
                  className="btn btn-block btn-primary btn-float m-t-25 "
                  onClick={handleClick}
                >
                  Sign In
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
