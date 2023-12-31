import { Link, useNavigate, } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setServer } from "../../core/slice";
import { api } from "../../core/api";
import "./index.css"

function MainPage() {

  const navigate = useNavigate();
  const login = useSelector(state => state.todos.login);
  const dispatch = useDispatch();

  function clickButton() {
    navigate('/profile')
  }

  // запрос на будущее
  useEffect(() => {
    api.get('/hello')
      .then(() => {
        dispatch(setServer(true)) // сервер работает
        console.log('сервер работает');
      }).catch(() => {
        dispatch(setServer(false)) // сервер не работает
        console.log('сервер не отвечает');
      }
      )
  }, [])

  return (
    <div className="MainPage">
      <div className="top-left">
        <h1>Изысканные кубики для настоящих ценителей! </h1>
        <p className="scrollbar">
          Качество, надежность, удовольствие – это то, что вы найдете в нашем магазине кубиков. Мы тщательно отбираем каждый кубик, чтобы удовлетворить потребности и ожидания наших клиентов.
        </p>
        <Link to="/products"><h3>К новинкам</h3></Link>
      </div>
      <div className="top-middle"></div>
      <div className="top-right"></div>
      <div className="bottom-left">
        <h4>Специальное предложение</h4>
        <p className="scrollbar">Добавьте разнообразие в свою жизнь с нашими кубиками! Приготовьтесь к множеству удивительных комбинаций и возможностей, которые только они могут предложить.</p>
        <div className="sale">
          <div>
            25%
            OFF
          </div>
        </div>
      </div>
      <div className="bottom-middle">
        <h2>Новая коллекция</h2>
        <p className="scrollbar">Обретите гармонию и умиротворение с нашими кубиками! Вращайте их в своих руках, наслаждаясь спокойствием и релаксацией, которые они приносят.</p>
      </div>
      <div className="bottom-right">
        <p>КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ
          КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ КУБЫ
        </p>
      </div>
      {!login && <button onClick={clickButton}>
        <p>Войти</p>
      </button>}
    </div>
  )
};

export { MainPage };

{/* <p>"CubeWorld" – это место, где вы сможете найти идеальный куб для любого случая. Мы предлагаем кубики, которые идеально подойдут для развлечений, творчества или декорации. Независимо от того, нужны ли вам кубы для офиса, дома или подарка, у нас есть все, что вам нужно.</p>
      <p>Что делает наши кубики особенными? Вот несколько причин, почему стоит выбрать именно нас:</p>
      <p>Качество и надежность: Мы работаем только с проверенными поставщиками, чтобы гарантировать высокое качество и долговечность наших кубиков. Мы заботимся о вашем удовлетворении и стремимся предложить вам только лучшее.</p>
      <p>Разнообразие стилей: Мы предлагаем кубики в широком ассортименте цветов, материалов и форм. От ярких и игривых до элегантных и минималистичных, у нас есть кубики, которые подойдут к вашему индивидуальному стилю и предпочтениям.</p>
      <p>Функциональность и универсальность: Наши кубики не только красивы, но и практичны. Используйте их в своей повседневной жизни для организации пространства, создания уютной атмосферы или выражения своей индивидуальности. Возможности бесконечны!</p>
      <p>Простота заказа и доставки: Мы делаем процесс заказа легким и удобным. Вы можете выбрать нужные кубики прямо на нашем сайте и оформить заказ всего за несколько кликов. Мы также предлагаем быструю и надежную доставку, чтобы ваши кубики пришли к вам вовремя.</p>
      <p>Присоединитесь к "CubeWorld" сегодня и обнаружьте удовольствие от простоты и красоты наших кубиков. Мы уверены, что вы будете в восторге от разнообразия, которое мы предлагаем, и найдете идеальные кубики, которые подчеркнут ваш стиль и добавят особый шарм в вашу жизнь.</p> */}