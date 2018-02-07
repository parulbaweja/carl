from jinja2 import StrictUndefined

from flask import (
    Flask,
    render_template,
    Blueprint,
)
bp = Blueprint('frontend', __name__)


@bp.route('/', methods=['GET'])
@bp.route('/<path:path>', methods=['GET'])
def get_app(path=None):
    return render_template('app.html')


if __name__ == "__main__":
    app = Flask(__name__)
    app.secret_key = "abc"
    app.jinja_env.undefined = StrictUndefined
    app.debug = True
    app.register_blueprint(bp)

    app.run(port=5000, host='0.0.0.0')
