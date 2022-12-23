import './App.css';

import musicInfo from 'music-info';
import { useState, useEffect } from 'react';

function App() {
  const [playlist, setPlaylist] = useState([]);
  return (
    <div className="App">
        <Header />
        <AddSong setPlaylist={setPlaylist} playlist={playlist} />
        <Playlist />
    </div>
  );
}


const Header = () => {
  return (
      <h1>Create a music playlist</h1>
  );
};


function AddSong ({setPlaylist, playlist}) {
  const [newSong, setSong] = useState('');
  const [newArtist, setArtist] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [songInfo, setSongInfo] = useState({title: "", album: "", artist: "", genre: "" });
 
  const handleNewSong = e => setSong(e.target.value);
  const handleNewArtist = e => setArtist(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    setPlaylist(prev => {
      if (!prev.includes(songInfo)) {
        return [...prev, songInfo];
      };
    });
    console.log(playlist);
  };

  useEffect(() => {
    musicInfo.searchSong(
      {title: newSong, artist: newArtist}, 1000).then(obj => {
        setImgUrl(obj.artwork);
        setSongInfo(() => ({title: obj.title, album: obj.album, artist: obj.artist, genre: obj.genre }));
      });
    setImgUrl(false);
  }, [newSong, newArtist]);

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


function Playlist () {
  return (
    <div className="playlist-flexbox">
      <p>Peace Sells</p>
      <img src="https://c8.alamy.com/comp/2DMY10P/megadeth-peace-sells-but-whos-buying-canada-combat-12-lp-vintage-vinyl-record-cover-2DMY10P.jpg" />
      <p>Architecture of Aggression</p>
      <img src="https://i.discogs.com/ryLokGoiKnOPbuqNwiPcfxULC3xJPq2boXE8qZ2ICBg/rs:fit/g:sm/q:90/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQ0MDk2/Ni0xMzM3MTc2MTIz/LTI5MzMuanBlZw.jpeg" />
    </div>
  )
}


export default App;
