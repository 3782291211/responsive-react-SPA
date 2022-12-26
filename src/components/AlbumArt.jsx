export function AlbumArt ({imgUrl, song}) {
    return (
      <section id="display-track-grid">
        <img id="current-image" src={imgUrl} alt="album art" />
        <p id="p1"> <span className="span">Song title:</span> <br /> {song.title}</p> <br></br>
        <p id="p2"> <span className="span">Artist name: </span> <br /> {song.artist}</p>
        <p id="p3"> <span className="span">Album: </span> <br /> {song.album}</p>
        <p id="p4"> <span className="span">Genre: </span> <br /> {song.genre}</p>
      </section>
    )
  }