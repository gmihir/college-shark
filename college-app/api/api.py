import time
import json
from flask import Flask
import mysql.connector

app = Flask(__name__)

db_sql = mysql.connector.connect(
    host="sql3.freesqldatabase.com",
    user="sql3331540",
    passwd="EY6Khd9vPu",
    database="sql3331540"
)


# GLOBAL LISTS
numbers = ['acceptance_rate', 'national_ranking', 'population', 'tuition', 'fee', 'ed_date', 'ea_date', 'rd_date',
               'scholarship_date']
dates = ['ed_date, ea_date', 'rd_date', 'scholarship_date']
headers = ["college_name", "recorder", "resume", "official_transcripts", "mid_year_report", "letters_of_rec",
           "letters_people",
           "sat/act", "sat_essay", "act_essay", "self_report_act", "subject_tests", "self_report_subject",
           "general_essay", "supplemental_essay", "acceptance_rate", "national_ranking", "population",
           "tuition", "ed_date", "ea_date", "rd_date", "scholarship_date", "interview", "fee", "application"
           ]


# method to query the SQL database with standard SQL syntax
# returns a list
# colleges is the table where accurate information is stored
def get_query(query):
    mycursor = db_sql.cursor()

    mycursor.execute(query)
    myresult = mycursor.fetchall()

    return myresult


# pass in: list of strings, anything with numbers or dates indicate with +/- (always inclusive)
# date format needs to be DD.MM.YYYY
def get_colleges(query_lst):
    query = "SELECT * FROM colleges"

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

    results = get_query(query)
    retVal = []

    # convert to json
    for element in results:
        retVal.append(get_json(element))

    return retVal


def get_epoch(date_time):
    date_time += ' 00:00:00'
    pattern = "%d.%m.%Y %H:%M:%S"
    epoch = int(time.mktime(time.strptime(date_time, pattern)))
    return epoch


def get_json(query_result):
    json_obj = {}
    for i in range(len(query_result)):
        json_obj[headers[i]] = query_result[i]
    return json.dumps(json_obj)


# lst = get_colleges(["national_ranking", "+15", "national_ranking", "-30"])
#
# for i in lst:
#     print(i)


@app.route('/time')
def get_current_time():
    return {'time': time.time()}
