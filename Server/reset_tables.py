import mysql.connector as mariadb
import add_tables, delete_tables

def reset_test():
    user_input = input("Are you sure you'd like to reset the test tables? (Y or N): ").lower()
    if user_input == "y" or user_input == "yes":
        delete_tables.delete_shopping_tables()
        add_tables.add_tables()

if __name__ == "__main__":
        reset_test()