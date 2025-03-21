import React from "react";

interface TransportBarProps {
  bpm: number;
  setBpm: (bpm: number) => void;
  playSequence: () => void;
  stopSequence: () => void;
  isPlaying: boolean;
}

const TransportBar: React.FC<TransportBarProps> = ({
  bpm,
  setBpm,
  playSequence,
  stopSequence,
  isPlaying,
}) => {
  return (
    <div className="controls">
      <label>
        BPM:
        <input
          type="number"
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
        />
      </label>
      <button onClick={playSequence} disabled={isPlaying}>
        ▶ PLAY
      </button>
      <button onClick={stopSequence} disabled={!isPlaying}>
        ■ STOP
      </button>
    </div>
  );
};

export default TransportBar;
