from flask import Flask
from config import Config
from extensions import db, jwt, cors
from routes.auth import auth_bp
from routes.jobs import jobs_bp
from routes.chat import chat_bp

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
jwt.init_app(app)
cors.init_app(app)

app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(jobs_bp)
app.register_blueprint(chat_bp)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)