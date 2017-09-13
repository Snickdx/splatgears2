import os;


import os, csv

with open("dump.csv", 'wb') as f:
    writer = csv.writer(f, delimiter= ",", quoting=csv.QUOTE_MINIMAL)
    for path, dirs, files in os.walk("./"):
        for filename in files:
            writer.writerow([filename])