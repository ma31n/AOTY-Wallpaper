from albumoftheyearapi import AOTY

client = AOTY()
info = client.user_ratings_all('ma31n', max_pages=None)

file = open('AOTYjson.txt',"w")
file.write(str(info))
file.close()

print("done")

