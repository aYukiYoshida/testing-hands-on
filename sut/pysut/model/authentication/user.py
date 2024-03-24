# -*- coding: utf-8 -*-
from dataclasses import dataclass


@dataclass
class User:
    name: str
    password: str
