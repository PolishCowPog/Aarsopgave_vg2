from flask import Flask, render_template
import random
import subprocess
import pymysql


import pymysql

conn = pymysql.connect(
    host="localhost",
    port=3306,
    user="root",
    password="1234",
    database="MechWars"
)

# Insert a test user
with conn:
    cursor = conn.cursor()
    cursor.execute("INSERT INTO users (users, passwords) VALUES ('e', 'test_password');")
    cursor.execute("DELETE FROM users WHERE passwords = 'test_password';")
    conn.commit()

print("Test user added successfully")

app = Flask(__name__)


@app.route('/')
def root():
    return render_template('index.html')

@app.route('/store')
def store():
    return render_template('store.html')

@app.route('/battle')
def battle():
    return render_template('battle.html')

@app.route('/map')
def map():
    return render_template('map.html')


if __name__ == '__main__':
    app.run(debug=True)