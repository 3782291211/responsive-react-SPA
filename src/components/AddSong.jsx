import { AlbumArt } from './AlbumArt';
import { useState, useEffect } from 'react';
import musicInfo from 'music-info';

export function AddSong ({setPlaylist}) {
    const [newSong, setSong] = useState('');
    const [newArtist, setArtist] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [songInfo, setSongInfo] = useState({title: "", album: "", artist: "", genre: "" , artwork: ""});
    const [search, setSearch] = useState('false');
    const [error, setError] = useState('');
   
    const handleNewSong = e => setSong(e.target.value);
    const handleNewArtist = e => setArtist(e.target.value);
    
    useEffect(() => {
        musicInfo.searchSong(
          {title: newSong, artist: newArtist}).then(obj => {
            if (obj.artwork) {
              setImgUrl(obj.artwork);
              setSongInfo(() => {
                return {title: obj.title, album: obj.album, artist: obj.artist, genre: obj.genre, artwork: obj.artwork};
            });
            } else {
               setSearch(prev => !prev);
               setError('error');
            }
          }).catch(() => {});
    }, [search]);
    
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
    console.log(error);
    console.log(imgUrl);
      return (
        <div>
        <form onSubmit={e => {
            e.preventDefault();
            setImgUrl('');
            setError('clicked');
            setSearch(prev => !prev);
          }}>
    
          <label htmlFor="new-artist">Enter artist name</label>
          <input id="new-artist" type="text" placeholder="Artist name" value={newArtist} onChange={handleNewArtist}></input><br/>
    
          <label htmlFor="new-song">Enter song name</label>
          <input id="new-song" type="text" placeholder="Song name" value={newSong} onChange={handleNewSong}></input><br/>
          <button id="preview" type="submit">Preview track details</button>
          </form>

          <form id="form2" onSubmit={handleSubmit}>
          <button id="add" typ="submit">Add to playlist</button>
        </form>
        {!imgUrl && error === 'clicked' ? 
            <p id="error"> Unable to retrieve track details. Please refine your search.</p> 
            : imgUrl ? 
            <AlbumArt imgUrl={imgUrl} song={songInfo}/> : null}
        </div>
      )
    };
  