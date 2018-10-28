#!/usr/bin/python3.7
import random
from perm_lex import perm_gen_lex
"""
{
    "id" : "2323",
    "followers" : [
        "2324",
        "1212",
        "23"
    ],
    "name" : "Jared J",
    "likes" : [
        "dsjsdsds",
        "shwhdh"
    ]
}
"""

def rev_factorial(n, num = 1, total = 1):
    if total >= n:
        return num - 1
    else:
        return rev_factorial(n, num + 1, total * num)
    

def make_json_array(name, l):
    start = "\t\"{}\" : [".format(name)
    data = ["\n\t\t\"{}\",".format(x) for x in l]
    data = "".join(data)
    data = data[:len(data) - 1]
    return start + data + "\n\t]"

#print(make_json_array("likes", ["a", "b", "c"]))

def makeUser(start, id, users, names):
    likes = list(map(lambda x: str(x), list(range(1, 9))))
    num_followers = random.randint(0, len(users) - 1)
    name = names[int(id) - start]
    followers = users[:num_followers]
    if str(id) in followers:
        followers.remove(str(id))
        followers.append(users[num_followers])
    followers = [str(x) for x in followers]
    num_likes = random.randint(0, len(likes))
    num_buys = random.randint(0, len(likes))
    like_l = likes[:num_likes]
    buy_l = likes[:num_buys]
    construction = "{\n\t" + "\"id\" : \"{}\",\n{},\n\t\"username\" : \"{}\",\n{},\n{}\n".format(
        id, make_json_array("followers", followers), name, make_json_array("likes",like_l), make_json_array("buys",buy_l)) + "}"
    return (construction, followers)

def makeDummyUsers(num):
    alpha = "abcdefghijklmnopqrstuvwxyz"
    names = perm_gen_lex(alpha[:rev_factorial(num)])
    with open("jsondummies_users.json", 'w') as f:
        ids = list(map(lambda x: str(x), list(range(514, 515 + num))))
        totalStr = "{\n\"Users\":[\n"
        for i, id in enumerate(ids):
            gotBack = makeUser(514, id, ids, names)
            totalStr += gotBack[0] + ",\n\n"
        totalStr = totalStr[:len(totalStr) - 3] + "\n\n"
        totalStr += "]\n}"
        f.write(totalStr)
        #print(totalStr)
    print('Done Users')

def makeDummyItems():
    likes = ["a", "b", "c", "d", "e", "f", "g", "h"]
    with open("jsondummies_items.json", 'w') as f:
        ids = list(map(lambda x: str(x), list(range(1, 9))))
        totalStr = "{\n\"Items\": [\n"
        for i, id in enumerate(ids):
            idStr = "{" + "\n\"id\" : \"{}\",\n".format(id)
            nameStr = "\"item_name\" : \"{}\"\n".format(likes[i]) + "},"
            totalStr +=  idStr + nameStr + "\n\n"
        totalStr = totalStr[:len(totalStr) - 3] + "\n\n"
        f.write(totalStr + "]\n}")
    print('Done Items')

makeDummyUsers(10)
makeDummyItems()