from flask import Flask, render_template, request, redirect, url_for, flash
import pymysql
from flask import session

app = Flask(__name__)
app.url_map.strict_slashes = False
app.secret_key = 'MechWarsKey'

# Database connection
db_config = {
    'host': "10.2.3.58",
    'user': "mechwars",
    'password': "1234",
    'database': "MechWars"
}

@app.route('/')
def root():
    if 'username' not in session:
        flash('Please log in to access the map.', 'danger')
        return redirect('/login')
    print(session)  # Check session data
    return render_template('index.html')

@app.route('/store')
def store():
    return render_template('store.html')

@app.route('/battle')
def battle():
    return render_template('battle.html')

@app.route('/map/<username>', methods=['GET', 'POST'])
def map(username):
    try:
        print(f"Accessing map for username: {username}")  # Debugging
        conn = pymysql.connect(**db_config)
        cur = conn.cursor()

        user_query = "SELECT username FROM users WHERE username = %s"
        cur.execute(user_query, (username,))  # Note the comma to make it a tuple
        user = cur.fetchone()
        print(f"Database user found: {user}")  # Debugging

        if not user:
            flash('User not found', 'danger')
            return redirect('/login')
        
        # Pass the user data to the template
        return render_template('map.html', username=username, user=user)

    except Exception as e:
        flash(f"Error loading profile: {e}", 'danger')
        print(f"Error: {e}")  # Debugging
        return redirect('/login')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        try:
            conn = pymysql.connect(**db_config)
            cur = conn.cursor()
            cur.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
            user = cur.fetchone()
            cur.close()
            conn.close()

            if user:
                session['user_id'] = user[0]  # Assuming the first column is user ID
                session['username'] = user[1]  # Assuming the second column is username
                flash(f'Login successful! Welcome {user[1]}', 'success')
                return redirect('/')
            else:
                flash('Invalid username or password', 'danger')
                return redirect(url_for('login'))
            
        except Exception as e:
            flash('Database error', 'danger')
            print(f"Error: {e}")

    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    return render_template('register.html')

@app.route('/submit', methods=['GET', 'POST'])
def submit():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        try:
            conn = pymysql.connect(**db_config)
            cursor = conn.cursor()
            sql_query = """INSERT INTO users (username, password) VALUES (%s, %s)"""
            cursor.execute(sql_query, (username, password))
            conn.commit()
            cursor.close()
            conn.close()
            return redirect('/')
        except Exception as e:
            flash('Shit no work', 'danger')
            print(f"Error: {e}")
            return redirect(url_for('register')) 


if __name__ == '__main__':
    app.run(debug=True)