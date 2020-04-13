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


#pass in: list of strings, anything with numbers or dates indicate with +/- (always inclusive)
#date format needs to be DD.MM.YYYY
def get_colleges(query_lst):
    numbers = ['acceptance_rate','national_ranking','population','tuition','fee','ed_date', 'ea_date', 'rd_date', 'scholarship_date']
    dates = ['ed_date, ea_date', 'rd_date', 'scholarship_date']
    query = "SELECT * FROM colleges"

    if len(query_lst) == 0:
        return query

    query += " WHERE"

    for i in range(0,len(query_lst),2):
        if query_lst[i] in dates:
            epoch = get_epoch(query_lst[i+1][1:])
            query_lst[i+1] = query_lst[i+1][0] + str(epoch)
        if query_lst[i] in numbers:
            if query_lst[i+1][0] == "+":
                query += " " + query_lst[i] + " >= " + query_lst[i+1][1:]
            else:
                query += " " + query_lst[i] + " <= " + query_lst[i+1][1:]
        else:
            query += " " + query_lst[i] + "=" + query_lst[i+1]
        
        if i != len(query_lst)-2:
            query += " AND"
        
    return get_query(query)

def get_epoch(date_time):
    date_time += ' 00:00:00'
    pattern = "%d.%m.%Y %H:%M:%S"
    epoch = int(time.mktime(time.strptime(date_time, pattern)))
    return epoch
    


@app.route('/time')
def get_current_time():
    return {'time': time.time()}