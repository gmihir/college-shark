import time
import json
import os
from flask import Flask
import mysql.connector
from sql_helpers import *

app = Flask(__name__, static_folder='../build', static_url_path='/')

db_sql = mysql.connector.connect(
    host=os.environ.get("SQL_HOST"),
    user=os.environ.get("SQL_USER"),
    passwd=os.environ.get("SQL_PASSWD"),
    database=os.environ.get("SQL_DB")
)
#for varun
# SQL_HOST = sql3.freesqldatabase.com"
# export SQL_USER= sql3334027
# export SQL_PASSWD = 3VGxcUIijX
# export SQL_DB = sql3334027

# method to query the SQL database with standard SQL syntax
# returns a list
# colleges is the table where accurate information is stored
def get_query(query):
    mycursor = db_sql.cursor()

    mycursor.execute(query)
    myresult = mycursor.fetchall()

    return myresult     


#TO QUERY, CALL get_colleges()
# pass in: list of strings, anything with numbers or dates indicate with +/- (always inclusive)
# date format needs to be DD.MM.YYYY
#returns list of JSON objects with college information
def get_colleges(query_lst):
    query = "SELECT * FROM colleges_updated"

    if len(query_lst) == 0:
        return query

    query += " WHERE"

    for i in range(0, len(query_lst), 2):
        if query_lst[i] in dates:
            epoch = get_epoch(query_lst[i + 1][1:])
            query_lst[i + 1] = query_lst[i + 1][0] + str(epoch)
        if query_lst[i] in numbers:
            if query_lst[i + 1][0] == "+":
                query += " " + query_lst[i] + " >= " + query_lst[i + 1][1:]
            else:
                query += " " + query_lst[i] + " <= " + query_lst[i + 1][1:]
        else:
            query += " " + query_lst[i] + "=" + query_lst[i + 1]

        if i != len(query_lst) - 2:
            query += " AND"

    print(query)
    results = get_query(query)
    toBeSorted = []

    # convert to college object
    for element in results:
        c = College(element)
        toBeSorted.append(c)


    mergeSort(toBeSorted)
    json = []

    for college in toBeSorted:
        json.append(college.get_json())

    return json

#json_lst is a list of JSON objects with headers
#param is desired parameter to sort by
#is_descending is true if descending order required
#will return sorted list of json colleges
def get_order(json_lst, param, is_descending):
    json_out = []
    colleges = []


    for element in json_lst:
        element = json.loads(element)
        element = [ v for v in dict.values(element) ]
        c = College(element)
        colleges.append(c)


    mergeSort(colleges, param)

    for college in colleges:
        json_out.append(college.get_json())

    if not is_descending:
        json_out.reverse()
    
    return json_out



    
# #QUERY TESTING
lst = get_colleges(["national_ranking", "+15", "national_ranking", "-30"])
lst = get_order(lst, "tuition_oos", True)

for i in lst:
   print(i)

@app.route('/')
def index():
    return app.send_static_file('index.html')