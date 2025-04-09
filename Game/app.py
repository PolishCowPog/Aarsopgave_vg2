from flask import Flask, render_template
import pymysql

app = Flask(__name__)

# Database connection
conn = pymysql.connect(
    host="10.2.2.240",
    user="Jakub_U",
    password="1234",
    database="MechWars",
)

    # SQL query to insert a new user
sql_query = """
    INSERT INTO users (username, password) VALUES ('test_user', 'test_password');
    """

# Create a cursor object
cursor = conn.cursor()   
try:
    # Execute the query
    cursor.execute(sql_query)
    # Commit changes
    conn.commit()
except Exception as e:
    print(f"An error occurred: {e}")
finally:
    cursor.close()


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