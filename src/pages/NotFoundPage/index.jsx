import { Link } from "react-router-dom";
import { Background } from "../../components";
import "./index.css"

function NotFoundPage() {

  return (
    <div className="NotFoundPage">
      <p>This page was not found</p>
      <p>Go to the <Link to="/">Main Page</Link></p>
      <Background/>
    </div>
  )
};

export { NotFoundPage };
