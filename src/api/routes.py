"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

# Setup the Flask-JWT-Extended extension


#Create flask app
api = Blueprint('api', __name__)



@api.route("/token", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()
    #user = User.query.get(current_user_id)
    search = User.query.filter_by(email=current_user_id).one_or_none()
    if search != None:
        return jsonify({"user": search.serialize()}), 200
    else:
        return jsonify({"msg": "Usuario impostor"}), 401


@api.route("/loging", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    search = User.query.filter_by(email=email).one_or_none()
    if search != None and search.password == password:
        access_token = create_access_token(identity=email)
        return jsonify({"user": search.serialize(), "token": access_token}), 200
    else:
        return jsonify({"msg": "Ese usuario no existe"}), 401

@api.route("/user",  methods=["POST","GET"])
def handle_user():
    if(request.method=='GET'):
        all_user = user.query.all()
        return jsonify(
            [ user.serialize() for user in all_user]
        ), 200
    else:
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        if email == None:
            return 'Falta el email!', 400
        if password == None:
            return 'Falta la clave!', 400
        else:
            new_row = User.new_user(email, password)
            if new_row == None:
                return 'Un error ha ocurrido!', 500
            else:
                return jsonify(new_row.serialize()), 200