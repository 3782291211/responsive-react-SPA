import './App.css';
import { Header } from './components/Header';
import { AddSong } from './components/AddSong';
import { Playlist } from './components/Playlist';
import { useState } from 'react';

function App() {
  const [playlist, setPlaylist] = useState([]);
  return (
    <div className="App">
        <Header />
        <AddSong setPlaylist={setPlaylist} />
        <Playlist playlist={playlist} setPlaylist={setPlaylist}/>
    </div>
  );
};

export default App;