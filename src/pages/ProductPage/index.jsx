import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getCube, getLiked, like, api,  } from "../../core/api.js";
import { saveLiked, changeReload, } from "../../core/slice.js";

import { Loading } from "../../components";
import './index.css';

function ProductPage() {
  const { id } = useParams();
  const [cube, setCube] = useState(null)
  const [liked, setLiked] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const savedCubes = useSelector(state => state.todos.cubes);
  const likedCubes = useSelector(state => state.todos.liked);
  const needReload = useSelector(state => state.todos.needReload);

  function clickLike() {
    like(id)
      .then(data => {
        setLiked(!liked);
        dispatch(changeReload(true)); // нужно ли обновить данные
      })
      .catch(err => console.log(err))
  }

  function clickBack() {
    navigate(-1);
  }

  function updateCubes() {
    if (savedCubes.length) {
      const cube = savedCubes.find(cube => cube.id === +id);
      setCube(cube);
    } else {
      getCube(id)
        .then(cube => {
          console.log(cube);
          setCube(cube);
        })
        .catch(err => console.log(err))
    }
  }

  function getCubes() {
    if (savedCubes && savedCubes.length) {
      const cube = savedCubes.find(cube => cube.id === +id);
      setCube(cube);
    } else {
      api.get(`/cubes/${id}`)
        .then(cube => {
          console.log(cube);
          setCube(cube);
        })
        .catch(err => console.log(err))
    }
  }

  function updateLiked() {
    if (!needReload && likedCubes.length !== 0) {
      if (likedCubes.find(liked => liked.id === +id)) {
        setLiked(true);
      }
    } else {
      getLiked()
        .then(data => {
          console.log(data);
          dispatch(saveLiked(data));
          dispatch(changeReload(false));
          if (data.find(liked => liked.id === +id)) {
            setLiked(true);
          }
        })
        .catch(err => console.log(err))
    }
  }

  function getLiked() {
    if (!needReload && likedCubes && likedCubes.length) {
      if (likedCubes.find(liked => liked.id === +id)) {
        setLiked(true);
      }
    } else {
      api.get('/liked')
        .then(data => {
          console.log(data);
          dispatch(saveLiked(data));
          dispatch(changeReload(false));
          if (data.find(liked => liked.id === +id)) {
            setLiked(true);
          }
        })
        .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    getCubes();
    getLiked();
  }, [])

  return (<>
    {
      cube ? (
        <div className="ProductPage" >
          <div className="header">
            <h1>{cube.name}</h1>
            <button className={liked ? "active" : ""} onClick={clickLike}>
              <ion-icon name="heart-outline"></ion-icon>
            </button>
          </div>
          <div className="body">
            <div className="image">
              <img src={cube.imageUrl} alt={cube.name} />
            </div>
            <div className="blog">
              <p>{cube.description}</p>
            </div>
          </div>
          <button className="back" onClick={clickBack}>
            <ion-icon name="arrow-back-outline"></ion-icon>
          </button>
        </div>
      ) : (
        <Loading />
      )
    }
  </>)
};

export { ProductPage };
