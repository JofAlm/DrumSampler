import Pad from "./Pad";
import * as Tone from "tone";

interface PadGridProps {
  selectedPad: number | null;
  setSelectedPad: (index: number) => void;
  players: Tone.Players | null;
  customSounds: { [key: number]: string };
}

const padColors = [
  "red",
  "red",
  "red",
  "red",
  "green",
  "green",
  "green",
  "green",
  "yellow",
  "yellow",
  "yellow",
  "yellow",
  "blue",
  "blue",
  "blue",
  "blue",
];

const PadGrid: React.FC<PadGridProps> = ({
  selectedPad,
  setSelectedPad,
  players,
  customSounds,
}) => {
  return (
    <div className="pad-grid">
      {Array.from({ length: 16 }).map((_, i) => (
        <Pad
          key={i}
          isSelected={selectedPad === i}
          onClick={() => setSelectedPad(i)}
          soundIndex={i}
          players={players}
          customSound={customSounds[i]} // Skickar in det nya ljudet om det finns
          color={padColors[i]}
        />
      ))}
    </div>
  );
};

export default PadGrid;
