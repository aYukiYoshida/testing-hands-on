# -*- coding: utf-8 -*-
import pathlib

import yaml

from pysut.model import Host, User, Authentication

_authentication = pathlib.Path(__file__).parent.joinpath(
    "statics", "authentication.yaml"
)

if not _authentication.exists():
    raise FileNotFoundError(f"File of {_authentication} dose not exist.")

with open(_authentication.as_posix(), "r") as f:
    _variables = yaml.safe_load(f).get("variables")
_host = Host(**_variables["host"])
_user = User(**_variables["user"])

auth = Authentication(_host, _user)
