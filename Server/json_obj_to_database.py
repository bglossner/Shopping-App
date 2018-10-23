import mysql.connector as mariadb
import json

def connect_to_database(where="localhost", username="root", pwd="password", dbase="test"):
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
    cursor.execute("insert into Users (id, username) values ({} {})".format(id, user))
    print("Inserted User ID: {} as {}".format(id, user))
    mariadb_connection.close()

def insert_data_item(id, item_name):
    conn_obj = connect_to_database()
    mariadb_connection = conn_obj[0]
    cursor = conn_obj[1]
    if not mariadb_connection or not cursor:
        return False
    cursor.execute("insert into Users (id, item_name) values ({} {})".format(id, item_name))
    print("Inserted Item ID: {} as {}".format(id, item_name))
    mariadb_connection.close()

def insert_data_like(userid, itemid):
    conn_obj = connect_to_database()
    mariadb_connection = conn_obj[0]
    cursor = conn_obj[1]
    if not mariadb_connection or not cursor:
        return False
    cursor.execute("insert into LikedItems (user_id, item_id) values ({} {})".format(userid, itemid))
    print("Inserted User ID: {} and Item ID: {} into LikedItems".format(userid, itemid))
    mariadb_connection.close()

def insert_data_bought(userid, itemid):
    conn_obj = connect_to_database()
    mariadb_connection = conn_obj[0]
    cursor = conn_obj[1]
    if not mariadb_connection or not cursor:
        return False
    cursor.execute("insert into BoughtItems (user_id, item_id) values ({} {})".format(userid, itemid))
    print("Inserted User ID: {} and Item ID: {} into BoughtItems".format(userid, itemid))
    mariadb_connection.close()

def insert_data_friend(userid, friendid):
    conn_obj = connect_to_database()
    mariadb_connection = conn_obj[0]
    cursor = conn_obj[1]
    if not mariadb_connection or not cursor:
        return False
    cursor.execute("insert into Friends (user_id, friend_id) values ({} {})".format(userid, friendid))
    print("Inserted User ID: {} and Friend ID: {} into Friends".format(userid, friendid))
    mariadb_connection.close()

def insert_full_dataset(filename):
    with open(filename, 'r') as data:
        json_parse = json.loads(data)
        users_rec = json_parse["Users"]
        items_rec = json_parse["Items"]
        friends_inserted = []
        for value in items_rec:
            insert_data_item(value["id"], value["item_name"])
        for i, value in enumerate(users_rec):
            insert_data_user(value["id"], value["username"])
            likes = value["likes"]
            buys = value["buys"]
            friends = value["friends"]
            for item in likes:
                insert_data_like(value["id"], item)
            for item in buys:
                insert_data_bought(value["id"], item)
            for friend in friends:
                id1 = friend
                id2 = value["id"]
                sortedIds = (min(id1, id2), max(id1, id2))
                if sortedIds not in friends_inserted:
                    insert_data_friend(sortedIds[0], sortedIds[1])
                    friends_inserted.append(sortedIds)