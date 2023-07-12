import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveCubes, setServer } from "../../core/slice";

import { Card, Loading, Background, } from "../../components";
import { api } from "../../core/api";
import "./index.css"

function ProductsPage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const savedCubes = useSelector(state => state.todos.cubes); // данные о кубах
  const isServer = useSelector(state => state.todos.server); // работает ли сервер

  let [cubes, setCubes] = useState([]);

  // клик на карточку
  function clickCard(event) {
    const card = event.target.closest(".Card");
    if (card) {
      const cardId = card.getAttribute('data-id')
      navigate(`/products/${cardId}`);
    }
  }

  // запрос кубиков 
  function updateCubes() {
    if (savedCubes && savedCubes.length) {
      setCubes(savedCubes);
    } else {
      api.get('/cubes')
        .then(response => {
          const cubes = response.data;
          setCubes(cubes);
          console.log(cubes);
          dispatch(saveCubes(cubes)); //кэшируем
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  useEffect(() => {
    api.get('/hellow') // чтобы не показывать страшные карточки без картинок)
      .then(() => {
        dispatch(setServer(true)) // сервер работает
        console.log('сервер работает');
      }).catch(() => {
        dispatch(setServer(false)) // сервер не работает
        console.log('сервер не отвечает');
      }
      )
    updateCubes();
  }, [])

  return (
    <>
      {isServer && cubes.length !== 0 ? (
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
