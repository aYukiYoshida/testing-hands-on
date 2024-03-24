# -*- coding: utf-8 -*-

import datetime
import functools

import jwt
from flask import Flask, jsonify, redirect, render_template, request

from pysut.resources import User, auth

app = Flask(__name__, template_folder="templates", static_folder="statics")


@app.route("/", methods=["GET"])
def index():
    return redirect("login")


@app.route("/login", methods=["GET"])
def login():
    if request.method == "GET":
        return render_template("login.html")
    else:
        accessed_user = User(
            request.form.get("username", "dummy"), request.form.get("password", "dummy")
        )
        status = "succeeded" if accessed_user == auth.user else "failed"
        return render_template("login.html", status=status)


@app.route("/status", methods=["POST"])
def status():
    accessed_user = User(
        request.form.get("username", "dummy"), request.form.get("password", "dummy")
    )
    status = "succeeded" if accessed_user == auth.user else "failed"
    return render_template("status.html", status=status)


@app.route("/api/credentials", methods=["POST"])
def credential():
    r = request.get_json()

    if r["username"] != auth.user.name or r["password"] != auth.user.password:
        return jsonify({"error": "Incorrect username/password"}), 401

    payload = {
        "sub": auth.user.name,
        "aud": auth.host.name,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1),
    }

    token = jwt.encode(payload, auth.host.secret, algorithm="HS256")

    return jsonify({"token": token})


def requires_jwt(endpoint):
    """Makes sure a jwt is in the request before accepting it"""

    @functools.wraps(endpoint)
    def check_auth_call(*args, **kwargs):
        token = request.headers.get("Authorization")

        # check token is present
        if token is None:
            return jsonify({"error": "No token"}), 401

        token_type, token = token.split(" ")

        if token_type.lower() != "bearer":
            return jsonify({"error": "Wrong token type"}), 401

        try:
            jwt.decode(
                token, auth.host.secret, audience=auth.host.name, algorithms=["HS256"]
            )
        except Exception:
            return jsonify({"error": "Invalid token"}), 401

        return endpoint(*args, **kwargs)

    return check_auth_call


@app.route("/api/ping", methods=["GET"])
@requires_jwt
def ping():
    return jsonify({"data": "pong"}), 200


@app.route("/api/hello/<name>", methods=["GET"])
@requires_jwt
def hello(name):
    return jsonify({"data": f"Hello, {name}"}), 200


@app.route("/api/parrot", methods=["POST"])
@requires_jwt
def parrot():
    r = request.get_json()
    return jsonify({"": request.headers, "body": r}), 201


@app.errorhandler(500)
def server_error(e):
    return "An internal error occurred.", 500
