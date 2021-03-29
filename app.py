from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt
import os, datetime
from flask_cors import CORS

app = Flask(__name__)
folder = os.path.abspath(os.path.dirname(__file__))
app.config['SECRET_KEY'] = 'mantaplah;'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////' + os.path.join(folder, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)
cors = CORS(app)
bcrypt = Bcrypt(app)
ma = Marshmallow(app)

# Model Database
class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    nama = db.Column(db.String(100))
    jabatan = db.Column(db.String(100))

    def __init__(self,nama,jabatan):
        self.nama = nama
        self.jabatan = jabatan

class UserSchema(ma.Schema):
    class Meta:
        fields = ('id','nama','jabatan')

user_schema = UserSchema()
users_schema = UserSchema(many=True)

@app.route('/')
def index():
    return redirect(url_for('users'))

@app.route('/users', methods=['GET'])
def users():
    all_users = User.query.all()
    result = users_schema.dump(all_users)
    return jsonify(result)

@app.route('/user_input', methods=['POST'])
def user():
    if request.method == 'POST':
        nama = request.json['nama']
        jabatan = request.json['jabatan']
        data = User(nama,jabatan)
        db.session.add(data)
        db.session.commit()
        return user_schema.jsonify(data)

@app.route('/user/<id>', methods=['PUT'])
def update_user(id):
    data = User.query.get(id)
    nama = request.json['nama']
    jabatan = request.json['jabatan']
    data.nama = nama
    data.jabatan = jabatan
    db.session.commit()
    return user_schema.jsonify(data)

@app.route('/users/<id>', methods=['DELETE'])
def delete_user(id):
    data = User.query.get(id)
    db.session.delete(data)
    db.session.commit()
    return user_schema.jsonify(data)

if __name__ == '__main__':
    app.run(debug=True,threaded=True)
