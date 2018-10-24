import mysql.connector as mariadb

def add_tables():
    mariadb_connection = mariadb.connect(host = "localhost", user = "bglossner", password = "password", database = "test")
    print("Making tables")
    cursor = mariadb_connection.cursor()
    cursor.execute("CREATE TABLE Users (id varchar(10), username varchar(16))")
    cursor.execute("CREATE TABLE Items (id varchar(10), item_name varchar(16))")
    cursor.execute("CREATE TABLE LikedItems (user_id varchar(10), item_id varchar(10))")
    cursor.execute("CREATE TABLE BoughtItems (user_id varchar(10), item_id varchar(10))")
    cursor.execute("CREATE TABLE Friends (user_id varchar(10), friend_id varchar(10))")

add_tables()