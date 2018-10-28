import mysql.connector as mariadb

def add_tables():
    mariadb_connection = mariadb.connect(host = "localhost", user = "appdev", password = "password", database = "test")
    print("Making tables")
    cursor = mariadb_connection.cursor()
    cursor.execute("CREATE TABLE Users (id varchar(10), username varchar(32))")
    cursor.execute("CREATE TABLE Items (id varchar(10), item_name varchar(255))")
    cursor.execute("CREATE TABLE LikedItems (user_id varchar(10), item_id varchar(10))")
    cursor.execute("CREATE TABLE BoughtItems (user_id varchar(10), item_id varchar(10))")
    cursor.execute("CREATE TABLE Followers (user_id varchar(10), follower_id varchar(10))")
    cursor.execute("CREATE TABLE Reviews (user_id varchar(10), item_id varchar(10), review text)")

if __name__ == "__main__":
    add_tables()