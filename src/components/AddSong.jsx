import { AlbumArt } from './AlbumArt';
import { useState, useEffect } from 'react';
import musicInfo from 'music-info';

export function AddSong ({setPlaylist}) {
    const [newSong, setSong] = useState('');
    const [newArtist, setArtist] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [songInfo, setSongInfo] = useState({title: "", album: "", artist: "", genre: "" , artwork: ""});
   
    const handleNewSong = e => setSong(e.target.value);
    const handleNewArtist = e => setArtist(e.target.value);
    console.log(songInfo);
    useEffect(() => {
      if (newSong && newArtist) {
        musicInfo.searchSong(
          {title: newSong, artist: newArtist}, 1000).then(obj => {
            setImgUrl(obj.artwork);
            setSongInfo(() => ({title: obj.title, album: obj.album, artist: obj.artist, genre: obj.genre, artwork: obj.artwork }));
          }).catch(() => {});
        setImgUrl(false);
      }
    }, [newSong, newArtist]);
    
    const handleSubmit = e => {
      e.preventDefault();
      if (imgUrl) {
        setPlaylist(prev => {
        for (const song of prev) {
          if (song.title === songInfo.title) {
            return prev;
          }
        }
      return [...prev, songInfo];
      });
      } 
    };
    
      return (
        <div>
        <form onSubmit={handleSubmit}>
    
          <label htmlFor="new-artist">Enter artist name</label>
          <input id="new-artist" type="text" placeholder="Artist name goes here..." value={newArtist} onChange={handleNewArtist}></input><br/>
    
          <label htmlFor="new-song">Enter song name</label>
          <input id="new-song" type="text" placeholder="Song name goes here..." value={newSong} onChange={handleNewSong}></input><br/>
    
          <button id="add">Add to playlist</button>
        </form>
        {!imgUrl && newSong && newArtist ? <p id="error"> Unable to retrieve track details. Please refine your search.</p> : null}
        {imgUrl && newSong && newArtist ? <AlbumArt imgUrl={imgUrl} song={songInfo} /> : null}
        </div>
      )
    };
    
    