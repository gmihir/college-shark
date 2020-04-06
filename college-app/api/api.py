import time
from flask import Flask
import mysql.connector



app = Flask(__name__)

#just testing the connection between mysql database and python -- works so far locally but not in repo
def query_test():
    mydb = mysql.connector.connect(
        host="sql3.freesqldatabase.com",
        user="sql3331540",
        passwd="EY6Khd9vPu",
        database="sql3331540"
    )

    mycursor = mydb.cursor()

    mycursor.execute("SELECT * FROM college_test WHERE Recorder = 'Mihir';")
    myresult = mycursor.fetchall()

    for x in myresult:
        print(x)


@app.route('/time')
def get_current_time():
    return {'time': time.time()}

