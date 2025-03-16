import * as Tone from "tone";

interface PadProps {
  isSelected: boolean;
  onClick: () => void;
  soundIndex: number;
  color: string;
  players: Tone.Players | null;
  customSound?: string; // Tar emot ett anpassat ljud
}

const Pad: React.FC<PadProps> = ({
  isSelected,
  onClick,
  soundIndex,
  color,
  players,
  customSound,
}) => {
  const playSound = async () => {
    await Tone.start();

    if (customSound) {
      console.log("Spelar uppladdat ljud:", customSound);
      const player = new Tone.Player(customSound).toDestination();
      player.autostart = true;
    } else if (players) {
      console.log("Spelar original-ljud:", soundIndex);
      players.player(soundIndex).start();
    } else {
      console.warn("Ljud är inte laddat ännu.");
    }
  };

  return (
    <button
      className={`pad ${color} ${isSelected ? "selected" : ""}`}
      onClick={() => {
        onClick();
        playSound();
      }}
    />
  );
};

export default Pad;
