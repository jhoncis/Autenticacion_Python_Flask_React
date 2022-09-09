import React, { Component, Fragment, useState, useContext } from "react";
//import { render } from "react-dom";
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
} from "reactstrap";
import Select from "react-select";
import "../../styles/index.css";
import { Context } from "../store/appContext";

export const Signup = (props) => {
  const { store, actions } = useContext(Context);
  const [opcion, setopcion] = useState();
  const cambioestadoopcion = (e) => {
    setopcion(e.target.value);
    setUsuario({ ...usuario, typeuser: e.target.value });
  };
  const [usuario, setUsuario] = useState({
    correo: "",
    clave: "",
    confirma: ""
  });

  const gestionarcambios = (evento) => {
    //console.log(evento.target.value)
    setUsuario({
      ...usuario,
      [evento.target.name]: evento.target.value,
    });
  };
  const registrar = (evento) => {
    evento.preventDefault();
    actions.signup(usuario);
  };

  const enviarDatos = (evento) => {
    evento.preventDefault();
  };

  return (
    <div className="contenedor px-4 py-4 vh-100 justify-content-sm-center d-flex align-items-center align-self-center">
     

      <div className="w-50 p-3 style=background-color: #eee;">
        <Form className="row" onSubmit={enviarDatos}>
        
          <h3 className= "justify-content-sm-center d-flex align-items-center align-self-center">Formulario de registro</h3>

          <Row>
            <Col md={12}>
              <FormGroup>
                <Input
                  placeholder="ejemplo@porsupuesto.com"
                  className="form-control"
                  type="email"
                  name="correo"
                  onChange={gestionarcambios}
                ></Input>
              </FormGroup>
            </Col>
        
            <Col md={12}>
              <FormGroup>
                <Input
                  placeholder="Ingrese clave"
                  className="form-control"
                  type="password"
                  name="clave"
                  onChange={gestionarcambios}
                ></Input>
              </FormGroup>
            </Col>

            <Col md={12}>
              <FormGroup>
                <Input
                  placeholder="Confirme clave"
                  className="form-control"
                  type="password"
                  name="confirma"
                  onChange={gestionarcambios}
                ></Input>
              </FormGroup>
            </Col>
          </Row>
          <div className="Boton justify-content-sm-center d-flex align-items-center align-self-center">
          <button
              className="btn btn-primary"
              type="submit"
              onClick={registrar}
            >
              Aceptar
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};
