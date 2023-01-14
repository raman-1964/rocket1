function Spinner({ className }) {
  return (
    <div className="sContainer">
      <div
        className={`lds-ring
        ${className}`}
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Spinner;
