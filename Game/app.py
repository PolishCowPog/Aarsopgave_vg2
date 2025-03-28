from flask import Flask, render_template
import random
import subprocess

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