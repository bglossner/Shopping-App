import mysql.connector as mariadb

def delete_table(table_name, ask):
    mariadb_connection = mariadb.connect(host="localhost", user="appdev", password="password", database="test")
    cursor = mariadb_connection.cursor()
    if ask:
        user_input = input("Are you sure you'd like to delete %s (Y or N) " % table_name).lower()
        if user_input == "y" or user_input == "yes":
            cursor.execute("drop table {}".format(table_name))
    else:
       cursor.execute("drop table {}".format(table_name))



def delete_shopping_tables(ask=False):
    table_names = ["Users", "Items", "LikedItems", "BoughtItems", "Followers", "Reviews"]
    for table in table_names:
        delete_table(table, ask)

if __name__ == "__main__":
	delete_shopping_tables(True)