import mysql.connector as mariadb
import json

def connect_to_database(where="localhost", username="appdev", pwd="password", dbase="test"):
    try:
        mariadb_connection = mariadb.connect(host=where, user=username, password=pwd, database=dbase)
        return (mariadb_connection, mariadb_connection.cursor())
    except:
        return False

def insert_data_user(id, user):
    conn_obj = connect_to_database()
    mariadb_connection = conn_obj[0]
    cursor = conn_obj[1]
    if not mariadb_connection or not cursor:
        return False
    cursor.execute("insert into Users (user_id, username) values ('{}', '{}')".format(id, user))
    print("Inserted User ID: {} as {}".format(id, user))
    mariadb_connection.commit()
    mariadb_connection.close()

def insert_data_item(id, item_name):
    conn_obj = connect_to_database()
    mariadb_connection = conn_obj[0]
    cursor = conn_obj[1]
    if not mariadb_connection or not cursor:
        return False
    cursor.execute("insert into Items (item_id, item_name) values ('{}', '{}')".format(id, item_name))
    print("Inserted Item ID: {} as {}".format(id, item_name))
    mariadb_connection.commit()
    mariadb_connection.close()

def insert_data_like(userid, itemid):
    conn_obj = connect_to_database()
    mariadb_connection = conn_obj[0]
    cursor = conn_obj[1]
    if not mariadb_connection or not cursor:
        return False
    cursor.execute("insert into LikedItems (user_id, item_id) values ('{}', '{}')".format(userid, itemid))
    print("Inserted User ID: {} and Item ID: {} into LikedItems".format(userid, itemid))
    mariadb_connection.commit()
    mariadb_connection.close()

def insert_data_bought(userid, itemid):
    conn_obj = connect_to_database()
    mariadb_connection = conn_obj[0]
    cursor = conn_obj[1]
    if not mariadb_connection or not cursor:
        return False
    cursor.execute("insert into BoughtItems (user_id, item_id) values ('{}', '{}')".format(userid, itemid))
    print("Inserted User ID: {} and Item ID: {} into BoughtItems".format(userid, itemid))
    mariadb_connection.commit()
    mariadb_connection.close()

def insert_data_follower(userid, followerid):
    conn_obj = connect_to_database()
    mariadb_connection = conn_obj[0]
    cursor = conn_obj[1]
    if not mariadb_connection or not cursor:
        return False
    cursor.execute("insert into Followers (user_id, follower_id) values ('{}', '{}')".format(userid, followerid))
    print("Inserted User ID: {} and Follower ID: {} into followers".format(userid, followerid))
    mariadb_connection.commit()
    mariadb_connection.close()

def insert_full_dataset(filename1, filename2):
     with open(filename1, 'r') as data:
        with open(filename2, 'r') as data2:
            json_parse1 = json.loads(data.read())
            json_parse2 = json.loads(data2.read())
            users_rec = json_parse1["Users"]
            items_rec = json_parse2["Items"]
            for value in items_rec:
                insert_data_item(value["id"], value["item_name"])
            for i, value in enumerate(users_rec):
                insert_data_user(value["id"], value["username"])
                likes = value["likes"]
                buys = value["buys"]
                followers = value["followers"]
                for item in likes:
                    insert_data_like(value["id"], item)
                    insert_data_bought(value["id"], item)
                for follower in followers:
                    id1 = follower
                    id2 = value["id"]
                    insert_data_follower(id2, id1)

insert_full_dataset("jsondummies_users.json", "jsondummies_items.json")