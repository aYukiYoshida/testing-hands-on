# -*- coding: utf-8 -*-
import sys
from argparse import ArgumentParser, Namespace

from pysut.app import app


def main():
    parser = ArgumentParser(description="Test server for us")
    parser.add_argument(
        "-d", "--debug", action="store_true", default=False, help="run with debug mode."
    )
    parser.add_argument("-p", "--port", type=int, default=8888, help="number of port.")
    args: Namespace = parser.parse_args()
    app.run(host="0.0.0.0", port=args.port, debug=args.debug)


if __name__ == "__main__":
    sys.exit(main())
