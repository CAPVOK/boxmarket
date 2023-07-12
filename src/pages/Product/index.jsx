import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { like, api,  } from "../../core/api.js";
import { saveLiked, setReload, } from "../../core/slice.js";

import { Loading } from "../../components/index.jsx";
import './index.css';

function ProductPage() {
  const { id } = useParams();
  const [cube, setCube] = useState(null)
  const [liked, setLiked] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const savedCubes = useSelector(state => state.todos.cubes);
  const likedCubes = useSelector(state => state.todos.liked);
  const needReload = useSelector(state => state.todos.needReload);

  function clickLike() {
    like(id)
      .then(data => {
        setLiked(!liked);
        dispatch(setReload(true)); // нужно ли обновить данные
      })
      .catch(err => console.log(err))
  }

  function clickBack() {
    navigate(location.state?.prev || -1);
  }

  function getCube() {
    if (savedCubes && savedCubes.length) {
      const cube = savedCubes.find(cube => cube.id === +id);
      setCube(cube);
    } else {
      api.get(`/cubes/${id}`)
        .then(response => {
          const cube = response.data;
          console.log(cube);
          setCube(cube);
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
        .then(response => {
          const likedCubes = response.data;
          console.log(likedCubes);
          dispatch(saveLiked(likedCubes));
          dispatch(setReload(false));
          if (likedCubes.find(likedCube => likedCube.id === +id)) {
            setLiked(true);
          }
        })
        .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    getCube();
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
