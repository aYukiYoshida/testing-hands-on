# -*- coding: utf-8 -*-
from dataclasses import dataclass


@dataclass
class Host:
    name: str
    secret: str
