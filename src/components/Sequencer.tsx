import React, { useState, useEffect } from "react";
import * as Tone from "tone";

interface SequencerProps {
  sounds: { [key: number]: string };
  bpm: number;
  setBpm: (bpm: number) => void;
}

const Sequencer: React.FC<SequencerProps> = ({ sounds, bpm, setBpm }) => {
  const [sequence, setSequence] = useState(
    Array.from({ length: 8 }, () => Array(64).fill(false))
  );
  const [players, setPlayers] = useState<Tone.Players | null>(null);
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sequenceLoop, setSequenceLoop] = useState<Tone.Sequence | null>(null);
  const [volume, setVolume] = useState<number>(-12); // Default volume in decibels

  useEffect(() => {
    const loadSounds = async () => {
      await Tone.start();
      const loadedPlayers = new Tone.Players(
        Object.fromEntries(
          Object.entries(sounds)
            .slice(0, 8)
            .map(([key, file]) => [key, `/assets/${file}`])
        )
      ).toDestination();

      await Tone.loaded();
      setPlayers(loadedPlayers);
    };

    loadSounds();
  }, [sounds]);

  useEffect(() => {
    Tone.Master.volume.value = volume;
  }, [volume]);

  const toggleStep = (trackIndex: number, stepIndex: number) => {
    setSequence((prevSequence) =>
      prevSequence.map((row, tIdx) =>
        tIdx === trackIndex
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
        sequence.forEach((row, soundIndex) => {
          if (row[step]) {
            const player = players.player(soundIndex.toString());
            if (player) {
              player.start(time);
            }
          }
        });
      },
      Array.from({ length: 64 }, (_, i) => i),
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
        <label>
          Volume:
          <input
            type="range"
            min="-60"
            max="6"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
        </label>
        <button onClick={playSequence} disabled={isPlaying}>
          ▶ PLAY
        </button>
        <button onClick={stopSequence} disabled={!isPlaying}>
          ■ STOP
        </button>
      </div>

      <div className="sound-labels">
        {Object.keys(sounds)
          .slice(0, 8)
          .map((sound, trackIdx) => (
            <div key={trackIdx} className="sound-label">
              <button
                className="sample-button"
                onClick={() => playSample(Number(trackIdx))}
              ></button>
            </div>
          ))}
      </div>

      <div className="grid-container">
        <div className="number-column">
          {Array.from({ length: 64 }).map((_, stepIdx) => (
            <div key={stepIdx} className="step-number">
              {stepIdx + 1}
            </div>
          ))}
        </div>

        {Object.keys(sounds)
          .slice(0, 8)
          .map((sound, trackIdx) => (
            <div key={trackIdx} className="column">
              {sequence[trackIdx].map((active, stepIdx) => (
                <div
                  key={stepIdx}
                  className={`step ${active ? "active" : ""}
                    ${stepIdx % 4 === 0 ? "beat-marker" : ""}
                    ${stepIdx === currentStep ? "playing" : ""}`}
                  onClick={() => toggleStep(trackIdx, stepIdx)}
                />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sequencer;
