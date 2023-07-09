const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: "*"
}));

const dataPathCubes = './cubes.json';
const dataPathLikedCubes = './likedcubes.json';
const imagesPath = path.join(__dirname, 'images');
const dataPathUsers = './users.json';

// Чтение данных из файла
function readCubesData(filePath) {
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const cubes = JSON.parse(jsonData);
  return cubes;
}

// Запись данных о кубиках в файл
function writeLikedCubesData(data) {
  try {
    fs.writeFileSync(dataPathLikedCubes, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Ошибка записи в файл:', error);
  }
}

app.post('/liked/:id', (req, res) => {
  const likedCubes = readCubesData(dataPathLikedCubes);
  const cubes = readCubesData(dataPathCubes);
  const id = parseInt(req.params.id); // ид кубика 

  const index = likedCubes.findIndex(cube => cube.id === id);

  // если кубик не был лайкнут
  if (index === -1) {
    const cubeToAdd = cubes.find(cube => cube.id === id);
    if (cubeToAdd) {
      likedCubes.push(cubeToAdd);
      writeLikedCubesData(likedCubes);

      res.status(200).json({ message: 'Cube added to liked cubes.' });
    } else {
      res.status(404).json({ message: 'Cube not found.' });
    }
  } else { // если кубик уже был лайкнут
    const deletedCube = likedCubes.splice(index, 1)[0];
    writeLikedCubesData(likedCubes);

    res.status(200).json({ message: 'Cube removed from liked cubes.', deletedCube });
  }
});

app.get('/liked', (req, res) => {
  const cubes = readCubesData(dataPathLikedCubes);
  res.json(cubes);
});

// получение всех кубиков
app.get('/cubes', (req, res) => {
  const cubes = readCubesData(dataPathCubes);
  res.json(cubes);
});
// получение одного кубика
app.get('/cubes/:id', (req, res) => {
  const cubes = readCubesData(dataPathCubes);
  const id = parseInt(req.params.id); // ид кубика 
  const cube = cubes.find(cube => cube.id === id);
  res.json(cube);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const users = readCubesData(dataPathUsers);
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    res.status(200).json({ message: 'Авторизация успешна' });
  } else {
    res.status(401).json({ message: 'Неверный логин или пароль' });
  }
});

// добавление нового кубика
/* app.post('/cubes', (req, res) => {
  const newCube = req.body;

  if (!newCube.name || !newCube.description || !newCube.imageUrl) {
    return res.status(400).json({ error: 'Не заполнены обязательные поля' });
  }

  const cubes = readCubesData();

  // уникальный идентификатор
  const id = cubes.length > 0 ? cubes[cubes.length - 1].id + 1 : 1;
  newCube.id = id;

  cubes.push(newCube);

  writeCubesData(cubes);

  res.status(201).json(newCube);
}); */

// удаление кубика по ид
/* app.delete('/cubes/:id', (req, res) => {
  const id = parseInt(req.params.id);

  let cubes = readCubesData();

  const index = cubes.findIndex(cube => cube.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Кубик с указанным ID не найден' });
  }

  const deletedCube = cubes.splice(index, 1)[0];

  writeCubesData(cubes);

  res.json(deletedCube);
}); */

app.use('/images', express.static(imagesPath));

// Запуск сервера
const port = 3000;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
