import flask
from flask import Flask
import os
import sqlite3
import hashlib
import uuid
import sys

app = Flask(__name__)

# Use the environment secret if it's set
app.config['SECRET_KEY'] = os.environ.get('FLASK_SECRET_KEY', b'\xa3P\x13\xaeg\x86%\x93\xde]R\xc38K\xc4\xef\x88c\xe4\xb5h\xb4\xc5\xea')

def get_connection():
	conn = sqlite3.connect('../db/tiger_shi.sqlite3', isolation_level=None)
	cursor = conn.cursor()
	return conn, cursor

def login_password_check(given_password, db_password):
	# processing given password to see if its salted sha512 hash is the same as db

	algorithm = 'sha512'
	salt = db_password.split('$')[1]
	hash_obj = hashlib.new(algorithm)
	password_salted = salt + given_password
	hash_obj.update(password_salted.encode('utf-8'))
	password_hash = hash_obj.hexdigest()
	return db_password == "$".join([algorithm, salt, password_hash])

def create_password(given_password):
	password = given_password
	algorithm = 'sha512'
	salt = uuid.uuid4().hex
	hash_obj = hashlib.new(algorithm)
	password_salted = salt + password
	hash_obj.update(password_salted.encode('utf-8'))
	password_hash = hash_obj.hexdigest()
	return "$".join([algorithm, salt, password_hash])

@app.route('/')
def home():
	return "Hello!", 200

@app.route('/api/test/')
def test():
	return {test: "Backend text", status: 200}

# @app.route('/api/loggedin/', methods=['GET'])
# def loggedin():
# 	response = {
# 		"response" : {
# 			"logged_in": False, 
# 			"login_type": 0, 
# 			"user": ""
# 		}
# 	}
# 	if 'username' in flask.session:
# 		response['response']['logged_in'] = True
# 		response['response']['login_type'] = 2
# 		response['response']['user'] = flask.session['username']
# 		return response, 200
# 	return response, 200

# @app.route('/api/login/', methods=['POST'])
# def login():
# 	req = flask.request.get_json()
# 	response = {
# 		"response" : {
# 			"logged_in": False, 
# 			"login_type": 0, 
# 			"user": ""
# 		}
# 	}
# 	if 'username' in flask.session and req['username'] == flask.session['username']:
# 		print(flask.session['username'])
# 		print(req['username'])
# 		response['response']['logged_in'] = True
# 		response['response']['login_type'] = 2
# 		response['response']['user'] = flask.session['username']
# 		return response, 200

# 	conn, cursor = get_connection()
# 	cur = cursor.execute('SELECT password, role FROM users WHERE username=?',
# 								 (req['username'],))
# 	password = cur.fetchone()
# 	conn.close()
# 	# user doesn't exist
# 	if password is None or not login_password_check(req['password'], password[0]):
# 		# flask.abort(403)
# 		flask.session.clear()
# 		pass
# 	else:
# 		flask.session['username'] = req['username']
# 		flask.session['role'] = password[1]
# 		response['response']['logged_in'] = True
# 		response['response']['login_type'] = 1
# 		response['response']['user'] = flask.session['username']

# 	return response, 200

# @app.route('/api/logout/', methods=['GET'])
# def logout():
# 	flask.session.clear()
# 	return 'Successfully logged out', 200

# @app.route('/api/create_account/', methods=['POST'])
# def create_account():
# 	req = flask.request.get_json()

# 	if len(req['password']) == 0:
# 		return "Password can't be blank", 400
# 	conn, cursor = get_connection()
# 	cur = cursor.execute('SELECT username FROM users WHERE username=?',
# 							 (req['username'],))
# 	user = cur.fetchone()

# 	if user is not None:
# 		return "Username already in existence.", 409

# 	password = create_password(req['password'])

# 	cursor.execute('INSERT INTO users(username, password, role) VALUES(?, ?, ?)', (req['username'], password, 'user',))
# 	conn.close()
# 	flask.session['username'] = req['username']
# 	return 'Account successfully created.', 200
