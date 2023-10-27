const Die = (props) => {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };

  return (
    <div className="die__face" style={styles} onClick={props.holdDice}>
      <h2 className="die__num">{props.value}</h2>
    </div>
  );
};

export default Die;