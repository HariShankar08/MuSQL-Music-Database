import sqlite3 as sql
import os
import logging


def setup_db():
    if os.path.exists("db.sqlite3"):
        os.remove("db.sqlite3")

    with open("commands.sql") as f:
        lines = [l.strip() for l in f.readlines()]
        print(lines)
    with sql.connect("db.sqlite3") as cnx:
        cur = cnx.cursor()
        for line in lines:
            cur.execute(line)

        cnx.commit()
    logging.info("Database created successfully.")


if __name__ == '__main__':
    setup_db()
