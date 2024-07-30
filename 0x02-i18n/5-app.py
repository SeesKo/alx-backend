#!/usr/bin/env python3
"""
Flask app with mock user login system using Flask-Babel.
"""

from flask import Flask, request, render_template, g
from flask_babel import Babel
from typing import Union, Dict


class Config:
    """Configuration class for Flask app."""
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app = Flask(__name__)
app.config.from_object(Config)
app.url_map.strict_slashes = False
babel = Babel(app)


users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user() -> Union[Dict, None]:
    """Get a user from the 'login_as' parameter."""
    login_id = request.args.get('login_as')
    if login_id:
        try:
            return users.get(int(login_id))
        except ValueError:
            return None
    return None


@app.before_request
def before_request() -> None:
    """Set g.user before each request."""
    user = get_user()
    g.user = user


@babel.localeselector
def get_locale() -> str:
    """Determine the best locale for the request."""
    locale = request.args.get('locale')
    if locale and locale in app.config['LANGUAGES']:
        return locale
    # Fallback to the default locale
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def index() -> str:
    """Render the index page."""
    return render_template('5-index.html')


if __name__ == '__main__':
    app.run()
