import React, { useState } from "react";
import Sequencer from "./components/Sequencer";

const soundMap = {
  0: "808.mp3",
  1: "Kick.mp3",
  2: "Snare.mp3",
  3: "Break.mp3",
  4: "Chord.mp3",
  5: "Arp.mp3",
  6: "Pad.mp3",
  7: "Synth.mp3",
};

const App: React.FC = () => {
  const [bpm, setBpm] = useState(165); // 🔥 Ändrat BPM till 165 som default

  return (
    <div className="app">
      <Sequencer sounds={soundMap} bpm={bpm} setBpm={setBpm} />
    </div>
  );
};

export default App;
