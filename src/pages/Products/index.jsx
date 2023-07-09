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
        {cubes.map((cube) =>
          <Card {...cube} key={cube.id} />
        )}
      </div>
    </div>
  )
};

export { ProductsPage };
