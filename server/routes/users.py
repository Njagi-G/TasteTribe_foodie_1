from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, User
from schema.schema import UserSchema
import cloudinary
import cloudinary.uploader

users = Blueprint("users", __name__)
user_schema = UserSchema()
users_schema = UserSchema(many=True)


@users.route("", methods=["POST"])
def create_user():
    data = request.get_json()
    new_user = User(
        username=data["username"], email=data["email"], password=data["password"]
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"success": "User created successfully"}), 201


@users.route("/<int:id>", methods=["GET"])
@jwt_required()
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify(user_schema.dump(user)), 200


@users.route("/avatar", methods=["POST"])
@jwt_required()
def upload_avatar():
    current_user_id = get_jwt_identity()
    user = User.query.get_or_404(current_user_id)

    if "avatar" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["avatar"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if file:
        try:
            # Upload the file to Cloudinary
            upload_result = cloudinary.uploader.upload(file)

            # Get the public URL of the uploaded image
            avatar_url = upload_result["secure_url"]

            user.profilePicture = avatar_url
            db.session.commit()
            return (
                jsonify(
                    {
                        "message": "Avatar uploaded successfully",
                        "profilePicture": avatar_url,
                    }
                ),
                200,
            )
        except Exception as e:
            return jsonify({"error": str(e)}), 500


@users.route("/<int:id>", methods=["PUT"])
@jwt_required()
def update_user(id):
    user = User.query.get_or_404(id)
    data = request.get_json()

    user.username = data.get("username", user.username)
    user.firstName = data.get("firstName", user.firstName)
    user.lastName = data.get("lastName", user.lastName)
    user.title = data.get("title", user.title)
    user.aboutMe = data.get("aboutMe", user.aboutMe)
    user.profilePicture = data.get("profilePicture", user.profilePicture)

    db.session.commit()
    return jsonify(user_schema.dump(user)), 200


@users.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200


@users.route("/current", methods=["GET"])
@jwt_required()
def get_current_user():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if current_user:
        return jsonify(user_schema.dump(current_user)), 200
    else:
        return jsonify({"error": "User not found"}), 404
