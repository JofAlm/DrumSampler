import { useState, useEffect } from "react";
import PadGrid from "./components/PadGrid";
import Controls from "./components/Controls";
import * as Tone from "tone";
import "./styles.css";

const soundFiles = [
  "/assets/Kick-1.mp3",
  "/assets/Snare-1.mp3",
  "/assets/Hat-1.mp3",
  "/assets/OHat-1.mp3",
  "/assets/Kick-2.mp3",
  "/assets/Snare-2.mp3",
  "/assets/Hat-2.mp3",
  "/assets/OHat-2.mp3",
  "/assets/Kick-3.mp3",
  "/assets/Snare-3.mp3",
  "/assets/Hat-3.mp3",
  "/assets/OHat-3.mp3",
  "/assets/Kick-4.mp3",
  "/assets/Snare-4.mp3",
  "/assets/Hat-4.mp3",
  "/assets/OHat-4.mp3",
];

const App = () => {
  const [selectedPad, setSelectedPad] = useState<number | null>(null);
  const [players, setPlayers] = useState<Tone.Players | null>(null);
  const [customSounds, setCustomSounds] = useState<{ [key: number]: string }>(
    {}
  );

  useEffect(() => {
    const loadSounds = async () => {
      await Tone.start();
      console.log("AudioContext aktiverat! State:", Tone.context.state);

      const loadedPlayers = new Tone.Players(
        soundFiles.reduce((acc, sound, index) => {
          acc[index] = sound;
          return acc;
        }, {} as Record<number, string>)
      ).toDestination();

      await Tone.loaded();
      setPlayers(loadedPlayers);
    };

    loadSounds();
  }, []);

  const handleLoadSample = (file: File) => {
    if (selectedPad !== null) {
      const newSoundUrl = URL.createObjectURL(file);
      setCustomSounds((prev) => ({ ...prev, [selectedPad]: newSoundUrl }));
      console.log(`Laddade nytt ljud på pad ${selectedPad}: ${newSoundUrl}`);
    }
  };

  return (
    <div className="container">
      <PadGrid
        selectedPad={selectedPad}
        setSelectedPad={setSelectedPad}
        players={players}
        customSounds={customSounds}
      />
      <Controls onLoadSample={handleLoadSample} />
    </div>
  );
};

export default App;
