const EngineStartButton = ({ onClick, engineStarted }) => (
    <button
        className='startengine'
        onClick={onClick}>
        { engineStarted ? "STOP" : "START" }
    </button>
);

export default EngineStartButton;