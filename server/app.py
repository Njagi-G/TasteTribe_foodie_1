from flask import Flask, send_from_directory
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from models import db
from config import Config
from flask_cors import cross_origin
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Import your blueprints
from routes.auth import auth, BLACKLIST
from routes.users import users
from routes.recipes import recipes
from routes.bookmarks import bookmarks
from routes.likes import likes
from routes.ratings import ratings
from routes.notifications import notifications
from routes.comments import comments
from routes.contact import contact
from routes.admin import admin

app = Flask(__name__)
app.config.from_object(Config)

# Configure upload folder
app.config["UPLOAD_FOLDER"] = "uploads"

# Ensure the upload folder exists
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Enable CORS
CORS(
    app,
    resources={
        r"/*": {
            "origins": [
                "http://localhost:3001",
                "https://tastetribefoodie.vercel.app",
                "http://0.0.0.0:5000",
            ]
        }
    },
    supports_credentials=True,
)

# Register blueprints
app.register_blueprint(auth, url_prefix="/api/auth")
app.register_blueprint(users, url_prefix="/api/users")
app.register_blueprint(recipes, url_prefix="/api/recipes")
app.register_blueprint(bookmarks, url_prefix="/api/bookmarks")
app.register_blueprint(likes, url_prefix="/api/likes")
app.register_blueprint(ratings, url_prefix="/api/ratings")
app.register_blueprint(notifications, url_prefix="/api/notifications")
app.register_blueprint(comments, url_prefix="/api/comments")
app.register_blueprint(contact, url_prefix="/api/contact")
app.register_blueprint(admin, url_prefix="/api/admin")


# JWT token blacklist check
@jwt.token_in_blocklist_loader
def check_if_token_in_blacklist(jwt_header, jwt_payload):
    jti = jwt_payload["jti"]
    return jti in BLACKLIST


@app.route("/")
def index():
    return "Welcome to the Taste-Tribe API"


@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
