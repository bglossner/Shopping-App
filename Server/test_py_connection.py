import mysql.connector as mariadb

try:
    global mariadb_connection
    mariadb_connection = mariadb.connect(host='localhost', user='bglossner', password='password', database='test')
    print("ALL GOOD")
except:
    print("NOPE")

def test_insert():
    global mariadb_connection
    cursor = mariadb_connection.cursor()
    result = cursor.execute("insert into Items (id, item_name) values ('1', 'a')")
    print("tried it")
    mariadb_connection.commit()
    mariadb_connection.close()

test_insert()