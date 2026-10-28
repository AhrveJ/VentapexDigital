# Entry point for Bluehost's "Setup Python App" (Passenger). Keep this file next to contact_app.py.
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))

from contact_app import application  # noqa: E402,F401
