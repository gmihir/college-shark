
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
#colleges is the table where accurate information is stored
def get_query(query):


    mycursor = db_sql.cursor()

    mycursor.execute(query)
    myresult = mycursor.fetchall()

    return myresult


lst = get_query("SELECT * FROM colleges WHERE Recorder = 'Kai';")
for x in lst:
    print(x)


@app.route('/time')
def get_current_time():
    return {'time': time.time()}