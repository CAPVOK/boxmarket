import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveCubes } from "../../core/slice";

import { Card } from "../../components";
import { getCubes } from "../../core/api";
import "./index.css"

function ProductsPage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const savedCubes = useSelector(state => state.todos.cubes);

  let [cubes, setCubes] = useState([]);

  // клик на карточку
  function handleClick(event) {
    const card = event.target.closest(".Card");
    if (card) {
      const cardId = card.getAttribute('data-id')
      navigate(`/products/${cardId}`);
    }
  }

  useEffect(() => {
    if (savedCubes.length === 0) {
      getCubes()
        .then(data => {
          setCubes(data);
          console.log(data);
          dispatch(saveCubes(data)); //кэшируем
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      console.log(savedCubes)
      setCubes(savedCubes);
    }
  }, [])

  return (
    <div className="ProductsPage" onClick={handleClick}>
      <div className="grid">
        <div className="col col-1">
          {cubes.slice(0, 3).map((cube) =>
            <Card {...cube} key={cube.id} />
          )}
        </div>
        <div className="col col-2">
          {cubes.slice(3, 6).map((cube) =>
            <Card {...cube} key={cube.id} />
          )}
        </div>
        <div className="col col-3">
          {cubes.slice(6, 9).map((cube) =>
            <Card {...cube} key={cube.id} />
          )}
        </div>
        <div className="col col-4">
          {cubes.slice(9, 12).map((cube) =>
            <Card {...cube} key={cube.id} />
          )}
        </div>
      </div>
    </div>
  )
};

export { ProductsPage };
