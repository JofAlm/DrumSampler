import React, { useState, useEffect } from "react";
import * as Tone from "tone";

interface SequencerProps {
  sounds: { [key: number]: string };
  bpm: number;
  setBpm: (bpm: number) => void;
}

const Sequencer: React.FC<SequencerProps> = ({ sounds, bpm, setBpm }) => {
  const [sequence, setSequence] = useState(
    Array.from({ length: 16 }, () => Array(32).fill(false))
  );
  const [players, setPlayers] = useState<Tone.Players | null>(null);
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sequenceLoop, setSequenceLoop] = useState<Tone.Sequence | null>(null);

  const rainbowColors = [
    "#FF0000",
    "#FF7F00",
    "#FFFF00",
    "#00FF00",
    "#0000FF",
    "#4B0082",
    "#9400D3",
    "#FF1493",
    "#00CED1",
    "#FFD700",
    "#8A2BE2",
    "#32CD32",
    "#DC143C",
    "#FF4500",
    "#ADFF2F",
    "#20B2AA",
  ];

  useEffect(() => {
    const loadSounds = async () => {
      await Tone.start();
      console.log("AudioContext aktiverat!");

      const loadedPlayers = new Tone.Players(
        Object.fromEntries(
          Object.entries(sounds).map(([key, file]) => [key, `/assets/${file}`])
        )
      ).toDestination();

      await Tone.loaded();
      setPlayers(loadedPlayers);
      console.log("Alla ljud laddade!");
    };

    loadSounds();
  }, [sounds]);

  const toggleStep = (rowIndex: number, stepIndex: number) => {
    setSequence((prevSequence) =>
      prevSequence.map((row, rIdx) =>
        rIdx === rowIndex
          ? row.map((step, sIdx) => (sIdx === stepIndex ? !step : step))
          : row
      )
    );
  };

  const playSequence = () => {
    if (!players) return;
    Tone.Transport.bpm.value = bpm;
    Tone.Transport.start();

    if (sequenceLoop) {
      sequenceLoop.dispose();
    }

    const loop = new Tone.Sequence(
      (time, step) => {
        setCurrentStep(step);
        sequence.forEach((row, trackIndex) => {
          if (row[step]) {
            const player = players.player(trackIndex.toString());
            if (player) {
              player.start(time);
            }
          }
        });
      },
      Array.from({ length: 32 }, (_, i) => i),
      "16n"
    ).start(0);

    setSequenceLoop(loop);
    setIsPlaying(true);
  };

  const stopSequence = () => {
    Tone.Transport.stop();
    setCurrentStep(null);
    if (sequenceLoop) {
      sequenceLoop.dispose();
    }
    setIsPlaying(false);
  };

  const playSample = (track: number) => {
    if (players) {
      players.player(track.toString()).start();
    }
  };

  return (
    <div className="sequencer">
      <div className="controls">
        <label>
          BPM:
          <input
            type="number"
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
          />
        </label>
      </div>
      <div className="grid-container">
        {Object.entries(sounds).map(([trackIndex, sound], rowIdx) => (
          <div className="row" key={trackIndex}>
            <button
              className="sample-button"
              onClick={() => playSample(Number(trackIndex))}
            >
              {sound}
            </button>
            {sequence[rowIdx].map((active, stepIdx) => (
              <div
                key={stepIdx}
                className={`step ${active ? "active" : ""} 
                  ${stepIdx % 4 === 0 ? "beat-marker" : ""} 
                  ${stepIdx === currentStep ? "playing" : ""}`}
                onClick={() => toggleStep(rowIdx, stepIdx)}
                style={{
                  backgroundColor: active
                    ? rainbowColors[rowIdx % rainbowColors.length]
                    : "",
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="playback-controls">
        <button onClick={playSequence} disabled={isPlaying}>
          ▶ PLAY
        </button>
        <button onClick={stopSequence} disabled={!isPlaying}>
          ■ STOP
        </button>
      </div>
    </div>
  );
};

export default Sequencer;
