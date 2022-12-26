import { PlaylistItem } from './PlaylistItem';

export function Playlist ({playlist, setPlaylist}) {

    const handleClick = e => {
      setPlaylist(prev => prev
      .filter(song => song.title !== e.target.id)
      .map(m => ({...m})));
    } 
    
      return (
      <div>
        <h2>Your playlist</h2>
        {playlist.length === 0 ? <p className="empty-playlist">Your playlist is currently empty. Let's add some songs to it!</p> :
        <div className="playlist-flexbox">
        {playlist.map(song => <PlaylistItem key={song.title} song={song} handleClick={handleClick} />)}
      </div> }
      </div>
      );
    }