import { useNavigate } from "react-router-dom";
import "./index.css";

function Card(props) {

  return (
    <div className="Card" data-id={props.id}>
      <div className="image">
        <img src={props.imageUrl} alt={props.name} />
      </div>
      <h3>{props.name}</h3>
      <div className="panel">
      </div>
    </div>
  )
};

export { Card };
