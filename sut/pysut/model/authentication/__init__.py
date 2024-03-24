# -*- coding: utf-8 -*-
from dataclasses import dataclass

from .host import Host
from .user import User


@dataclass
class Authentication:
    host: Host
    user: User


__all__ = ["Authentication", "Host", "User"]
