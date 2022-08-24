const express = require("express");
const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(cors());

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('public'))

// grabbed 3rd object entry from:
// https://itunes.apple.com/lookup?id=1419227&entity=album
const albumsData = [
    {
      albumId: "10",
      artistName: "Beyoncé",
      collectionName: "Lemonade",
      artworkUrl100:
        "http://is1.mzstatic.com/image/thumb/Music20/v4/23/c1/9e/23c19e53-783f-ae47-7212-03cc9998bd84/source/100x100bb.jpg",
      releaseDate: "2016-04-25T07:00:00Z",
      primaryGenreName: "Pop",
      url: "https://www.youtube.com/watch?v=PeonBmeFR8o",
    },
    {
      albumId: "11",
      artistName: "Beyoncé",
      collectionName: "Dangerously In Love",
      artworkUrl100:
        "http://is1.mzstatic.com/image/thumb/Music/v4/18/93/6d/18936d85-8f6b-7597-87ef-62c4c5211298/source/100x100bb.jpg",
      releaseDate: "2003-06-24T07:00:00Z",
      primaryGenreName: "Pop",
      url: "https://www.youtube.com/watch?v=ViwtNLUqkMY",
    },
    {
    albumId: "12",
    artistName: "Beyoncé",
    collectionName: "RENAISSANCE",
    artworkUrl100: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/fe/ba/43/feba43be-99e8-ad8c-9fad-1bfdea7a4e98/196589344267.jpg/100x100bb.jpg",
    releaseDate: "2022-07-29T07:00:00Z",
    primaryGenreName: "Pop",
    url: "https://www.youtube.com/watch?v=yjki-9Pthh0"
    },
];

app.get("/", function (req, res) {
  // console.log("GET / route")
  res.sendFile(__dirname + '/index.html');
})
  
app.get("/albums", function (req, res) {
  // console.log("GET /albums/ route")
    res.send(albumsData);
});

app.get("/albums/:albumId", function (req, res) {
  // console.log("GET /albums/:albumId route")
  // console.log(req.params.albumId);
  const album = albumsData.find(element => element.albumId === Number(req.params.albumId));
  res.send(album);
});

// POST 
app.post("/albums", function(req, res) {
  // console.log("POST /albums route")
  // console.log(req.body)
  let newAlbum = {
    albumId: (String(Number(albumsData[albumsData.length -1].albumId) + 1)),
    artistName: req.body.artistName,
    collectionName: req.body.collectionName,
    artworkUrl100: req.body.artworkUrl100,
    releaseDate: req.body.releaseDate,
    primaryGenreName: req.body.primaryGenreName,
    url: req.body.url
  }
  albumsData.push(newAlbum);
  // console.log(albumData);
  res.redirect('/')
})

app.delete("/albums/:albumId", function(req, res) {
  // console.log("DELETE /albums/:albumId route");
  // console.log(req.params.albumId)
  const indexOfAlbumId = albumsData.findIndex(element => element.albumId === Number(req.params.albumId));
  if (indexOfAlbumId > -1) {
    // console.log(`albumId ${req.params.albumId} is index ${indexOfAlbumId}`)
    // console.log(`Array BEFORE DELETE: ${albumsData}`);
    albumsData.splice(indexOfAlbumId, 1);
    // console.log(`Array AFTER DELETE: ${albumsData}`);
    res.status(200);
    res.send({sucess: true});
  } else {
    // console.log(`albumId ${req.params.albumId} was not found`)
    res.status(400);
    res.send({success: false});
  }
})

const listener = app.listen(PORT || process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});