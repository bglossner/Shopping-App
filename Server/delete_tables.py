import mysql.connector as mariadb

def delete_table(table_name):
    mariadb_connection = mariadb.connect(host="localhost", user="root", password="password", database="test")
    cursor = mariadb_connection.cursor()
    user_input = input("Are you sure you'd like to delete %s (Y or N)" % table_name).lower()
    if user_input == "y" or user_input == "yes":
        cursor.execute("drop table {}".format(table_name))

def delete_shopping_tables():
    table_names = ["Users", "Items", "LikedItems", "BoughtItems", "Friends"]
    for table in table_names:
        delete_table(table)

delete_shopping_tables()