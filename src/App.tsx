import React, { useState } from "react";
import Sequencer from "./components/Sequencer";

const soundMap = {
  0: "808.mp3",
  1: "Arp.mp3",
  2: "Break.mp3",
  3: "Chord.mp3",
  4: "Crash.mp3",
  5: "Downer.mp3",
  6: "Fx.mp3",
  7: "Hat.mp3",
  8: "Key.mp3",
  9: "Kick.mp3",
  10: "Pad.mp3",
  11: "RevFx.mp3",
  12: "Siren.mp3",
  13: "Snare.mp3",
  14: "Synth.mp3",
  15: "Vox.mp3",
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
