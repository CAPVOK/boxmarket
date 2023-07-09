import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveCubes } from "../../core/slice";

import { Card, Loading, Background,  } from "../../components";
import { getCubes } from "../../core/api";
import "./index.css"

function ProductsPage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const savedCubes = useSelector(state => state.todos.cubes);

  let [cubes, setCubes] = useState([]);

  // клик на карточку
  function clickCard(event) {
    const card = event.target.closest(".Card");
    if (card) {
      const cardId = card.getAttribute('data-id')
      navigate(`/products/${cardId}`);
    }
  }

  function updateCubes() {
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
      setCubes(savedCubes);
    }
  }

  useEffect(() => {
    updateCubes();
  }, [])

  return (
    <>
      {cubes.length !== 0 ? (
        <div className="ProductsPage" onClick={clickCard}>
          <div className="grid">
            {cubes.map((cube) =>
              <Card {...cube} key={cube.id} />
            )}
          </div>
          <Background />
        </div>
      ) : (
        <Loading />
      )
      }
    </>
  )
};

export { ProductsPage };
