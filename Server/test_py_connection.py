import mysql.connector as mariadb

try:
    mariadb_connection = mariadb.connect(host='localhost', user='bglossner', password='pwd', database='test')
    print("ALL GOOD")
except:
    print("NOPE")