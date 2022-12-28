export function PlaylistItem ({song, handleClick}) {

  return (
    <div className="flex-item">
      
      <p className="song-title">{song.title}</p>
      <img className="playlist-image" 
          src={song.artwork} 
          alt="album art added to playlist" /> 
      <br />
      <button id={song.title} className="delete" onClick={handleClick}>Remove</button> 

   </div>
  )
};