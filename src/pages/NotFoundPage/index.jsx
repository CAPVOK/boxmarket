import { Link } from "react-router-dom";
import "./index.css"

function NotFoundPage() {

  return (
    <div className="NotFoundPage">
      <p>This page was not found</p>
      <p>Go to the <Link to="/">Main Page</Link></p>
    </div>
  )
};

export { NotFoundPage };
