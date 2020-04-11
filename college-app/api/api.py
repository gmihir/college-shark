
import time
from flask import Flask
import mysql.connector



app = Flask(__name__)

db_sql = mysql.connector.connect(
    host="sql3.freesqldatabase.com",
    user="sql3331540",
    passwd="EY6Khd9vPu",
    database="sql3331540"
    ) 

#method to query the SQL database with standard SQL syntax
#returns a list 
def get_query(query):


    mycursor = db_sql.cursor()

    mycursor.execute(query)
    myresult = mycursor.fetchall()

    return myresult


lst = get_query("SELECT * FROM college_test WHERE Recorder = 'Ashwin';")
for x in lst:
    print(x)


@app.route('/time')
def get_current_time():
    return {'time': time.time()}