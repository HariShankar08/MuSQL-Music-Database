from flask import Flask, render_template, url_for, abort, request, redirect
from setup import setup_db
import sqlite3 as sql

app = Flask(__name__)


@app.route("/index")
@app.route('/')
def index():  # put application's code here
    return render_template("index.html", title="Home",
                           description="Home Page: MuSQL:IiIiIT Music Database. It's all lite.")


@app.route("/about")
def about():
    return render_template("about.html", title="About",
                           description="MuSQL: IiIiIT Music Database. It's all lite.")


@app.route('/search')
def search():
    return render_template("search.html", title="Search",
                           description="Search for Songs/Artists: MuSQL:IiIiIT Music Database. It's all lite.")


@app.route('/spotlight')
def spotlight():
    return render_template("spotlight.html", title="Spotlight",
                           description="Artist Spotlight: MuSQL:IiIiIT Music Database. It's all lite.")


@app.route('/artists')
def artists():
    return render_template("artists.html")


@app.errorhandler(404)
def not_found(e):
    return render_template("welp.html",  title="Oh Snap!", message=str(e)), 404


@app.route('/albums/<int:artist_no>')
def album_artist(artist_no):
    if artist_no < 1 or artist_no > 5:
        return abort(404)

    with sql.connect('db.sqlite3') as cnx:
        cur = cnx.cursor()
        artist_name = cur.execute("select name from artists where artist_id=?", (artist_no,)).fetchone()[0]
        res = cur.execute("select * from albums where artist_id = ?", (artist_no,))

        groups_of_three = []
        group_of_three = res.fetchmany(3)
        while group_of_three:
            group_of_three = [str(i) if type(i) == int else i for i in group_of_three]
            groups_of_three.append(group_of_three)
            group_of_three = res.fetchmany(3)

    return render_template("albums.html", title="Albums", artist_name=artist_name, groups_of_three=groups_of_three)


@app.route('/songs/<int:artist_no>/<int:album_no>')
def songs_artist_album(artist_no, album_no):
    if artist_no < 1 or artist_no > 5:
        return abort(404)

    with sql.connect("db.sqlite3") as cnx:
        cur = cnx.cursor()
        # artist_name
        res = cur.execute('select name from artists where artist_id=?', (artist_no, ))
        artist_name = res.fetchone()[0]
        # album_name
        res = cur.execute('select title from albums where artist_id=? and album_id=?', (artist_no, album_no))
        temp = res.fetchone()
        if temp:
            print(temp)
            album_name = temp[0]
        else:
            return abort(404)

        # songs
        # 1. get all songs from album
        # 2. get songs from album that are already in the playlist
        # 3. <disabled>
        res = cur.execute('select song_name, duration from songs where artist_id=? and album_id=?', (artist_no, album_no))
        songs = [(name, duration[:-3]) for name, duration in res.fetchall()]
        print(artist_no, album_no)
        res = cur.execute('select song_name, duration from playlist where artist_id=? and album_id=?',
                          (str(artist_no), str(album_no)))
        playlist = res.fetchall()

        filtered = []
        for name, duration in songs:
            if (name, duration) in playlist:
                filtered.append((name, duration, True))
            else:
                filtered.append((name, duration, False))

        print(playlist)
        print(filtered)

        return render_template("song_artist_album.html", artist_no=artist_no, album_no=album_no, artist_name=artist_name,
                               album_name=album_name, songs=filtered)


@app.route('/p/add_to_playlist', methods=["POST"])
def add_to_playlist():
    with sql.connect('db.sqlite3') as cnx:
        cur = cnx.cursor()
        form_data = dict(request.form)
        cur.execute('insert into playlist (artist_id, album_id, song_name, duration) values (?,?,?,?)',
                    (form_data['artist_no'], form_data['album_no'], form_data['song_name'], form_data['duration']))
        cnx.commit()
    return redirect('/playlist')


@app.route('/p/remove_from_playlist', methods=["POST"])
def remove_from_playlist():
    with sql.connect('db.sqlite3') as cnx:
        cur = cnx.cursor()
        form_data = dict(request.form)
        cur.execute('delete from playlist where artist_id=? and album_id=? and song_name=? and duration=? ',
                    (form_data['artist_no'], form_data['album_no'], form_data['song_name'], form_data['duration']))
        cnx.commit()
    return redirect('/playlist')


@app.route('/playlist')
def playlist():
    with sql.connect("db.sqlite3") as cnx:
        cur = cnx.cursor()
        res = cur.execute('select * from artists natural join albums natural join playlist')
        songs = res.fetchall()

    return render_template("playlist.html", songs=songs)


if __name__ == '__main__':
    setup_db()
    app.register_error_handler(404, not_found)
    app.run()
