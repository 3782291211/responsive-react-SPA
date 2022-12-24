import './App.css';

import musicInfo from 'music-info';
import { useState, useEffect } from 'react';

function App() {
  const [playlist, setPlaylist] = useState([]);
  return (
    <div className="App">
        <Header />
        <AddSong setPlaylist={setPlaylist} />
        <Playlist playlist={playlist}/>
    </div>
  );
}


const Header = () => {
  return (
      <h1>Choose your favourite songs</h1>
  );
};



function AddSong ({setPlaylist}) {
const [newSong, setSong] = useState('');
const [newArtist, setArtist] = useState('');
const [imgUrl, setImgUrl] = useState('');
const [songInfo, setSongInfo] = useState({title: "", album: "", artist: "", genre: "" , artwork: ""});

const handleNewSong = e => setSong(e.target.value);
const handleNewArtist = e => setArtist(e.target.value);

useEffect(() => {
  if (newSong && newArtist) {
    musicInfo.searchSong(
      {title: newSong, artist: newArtist}, 1000).then(obj => {
        setImgUrl(obj.artwork);
        setSongInfo(() => ({title: obj.title, album: obj.album, artist: obj.artist, genre: obj.genre, artwork: obj.artwork }));
      }).catch(err => console.log(err));
    setImgUrl(false);
  }
}, [newSong, newArtist]);

const handleSubmit = e => {
  e.preventDefault();
  setPlaylist(prev => {
    for (const song of prev) {
      if (song.title === songInfo.title) {
        return prev;
      }
    }
  return [...prev, songInfo];
  });
};

  return (
    <div>
    <form onSubmit={handleSubmit}>

      <label htmlFor="new-artist">Enter artist name</label>
      <input id="new-artist" type="text" value={newArtist} onChange={handleNewArtist}></input><br/>

      <label htmlFor="new-song">Enter song name</label>
      <input id="new-song" type="text" value={newSong} onChange={handleNewSong}></input><br/>

      <button>Add to playlist</button>
    </form>
    {imgUrl && newSong && newArtist ? <AlbumArt imgUrl={imgUrl} song={songInfo.title} artist={songInfo.artist} album={songInfo.album} /> : null}
    </div>
  )
};



function AlbumArt ({imgUrl, song, artist, album}) {
  return (
    <section id="display-track-grid">
      <img id="current-image" src={imgUrl} alt="album art" />
      <p id="p1"> <span className="span">Song title:</span> <br /> {song}</p> <br></br>
      <p id="p2"> <span className="span">Artist name: </span> <br /> {artist}</p>
      <p id="p3"> <span className="span">Album: </span> <br /> {album}</p>
    </section>
  )
}


function Playlist ({playlist}) {
const [showDelete, setDelete] = useState([]);

  return (
    <div>
  <h2>Your playlist</h2>
  {playlist.length === 0 ? <p class="empty-playlist">Your playlist is currently empty. Let's add some songs to it!</p> : null}
  <div className="playlist-flexbox">
    {playlist.map(song => {
     return (
      <div className="flex-item" key={song.title}>

          <h3>{song.title}</h3>
          <img className="playlist-image" src={song.artwork} onMouseOver={() => setDelete(prev => !prev)} alt="album art added to playlist" />
          {showDelete ? <div id="delete-song" onMouseOut={() => setDelete(prev => !prev)}>Delete</div> : null}
      
      </div>
     ) 
    })}
  </div>
  </div>
  );
}


export default App;
