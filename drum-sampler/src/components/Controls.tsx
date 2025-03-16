interface ControlsProps {
  onLoadSample: (file: File) => void;
}

const Controls: React.FC<ControlsProps> = ({ onLoadSample }) => {
  return (
    <div className="controls">
      <button>&gt; PLAY</button>
      <button>• REC</button>
      <button># STOP</button>
      <button># STEP</button>

      <label className="button">
        LOAD
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              onLoadSample(e.target.files[0]); // Skickar filen till App.tsx
            }
          }}
          style={{ display: "none" }}
        />
      </label>
    </div>
  );
};

export default Controls;
