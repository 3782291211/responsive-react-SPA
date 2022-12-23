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
      <label htmlFor="new-song">Enter song name</label>
      <input id="new-song" type="text" value={newSong} onChange={handleNewSong}></input><br/>

      <label htmlFor="new-artist">Enter artist name</label>
      <input id="new-artist" type="text" value={newArtist} onChange={handleNewArtist}></input><br/>

      <button>Add to playlist</button>
    </form>
    {imgUrl ? <AlbumArt imgUrl={imgUrl} /> : null}
    </div>
  )
};



function AlbumArt ({imgUrl}) {
  return (
    <img id="current-image" src={imgUrl} />
  )
}


function Playlist ({playlist}) {
const [showDelete, setDelete] = useState(false);

  return (
    <div>
  <h2>Your playlist</h2>
  <div className="playlist-flexbox">
    {playlist.map(song => {
     return (
      <div className="flex-div" key={song.title}>
      <h3>{song.title}</h3>
      <img className="playlist-image" src={song.artwork} onMouseOver={() => setDelete(prev => !prev)}/>
      {showDelete ? <div id="delete-song" onMouseOut={() => setDelete(prev => !prev)}>Delete</div> : null}
      </div>
     ) 
    })}
  </div>
  </div>
  );
}


export default App;
