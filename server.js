var HTTP_PORT = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var app = express();
var spawn = require('child_process').spawn;

app.set('view engine', 'ejs');
app.use(express.static('./assets/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function onHttpStart() {
  console.log('Express http server listening on ' + HTTP_PORT);
}

app.use(express.static('./assets/'));

// setup a 'route' to listen on the default url path
app.get('/', function (req, res) {
  res.redirect('/main');
});

app.get('/main', function (req, res) {
  res.sendFile(path.join(__dirname, './views/main.html'));
});

// ---------------------------------------------------

app.get('/howto', function (req, res) {
  res.sendFile(path.join(__dirname, './views/howto.html'));
});

// ---------------------------------------------------

app.get('/exercise', function (req, res) {
  res.sendFile(path.join(__dirname, './views/exercise.html'));
});

// ---------------------------------------------------

app.get('/school', function (req, res) {
  res.render('school');
});

app.post('/school', function (req, res) {
  console.log(req.body);
  const result = spawn('python', [
    'view.py',
    req.body.sentence,
    '요번 그룹 과제 티몬 혹시 다 뽑았어?', // req.body.voice
  ]);
  result.stdout.on('data', (data) => {
    console.log(JSON.parse(data));
    res.render('school', JSON.parse(data));
  });
});

// ---------------------------------------------------

app.get('/restaurant', function (req, res) {
  res.render('restaurant');
});

app.post('/restaurant', function (req, res) {
  console.log(req.body);
  const result = spawn('python', [
    'view.py',
    req.body.sentence,
    '가위, 바위, 보해서 이긴 사랑이 먹고 싶은 메뉴 고르자.', // req.body.voice
  ]);
  result.stdout.on('data', (data) => {
    console.log(JSON.parse(data));
    res.render('restaurant', JSON.parse(data));
  });
});

// ---------------------------------------------------
app.get('/greetings', function (req, res) {
  res.render('greetings');
});

app.post('/greetings', function (req, res) {
  console.log(req.body);
  const result = spawn('python', [
    'view.py',
    req.body.sentence,
    '안뇽하세요.저는 미국에서 온 타일러입니다.만나서 반갑습니다.', // req.body.voice
  ]);
  result.stdout.on('data', (data) => {
    console.log(JSON.parse(data));
    res.render('greetings', JSON.parse(data));
  });
});

// ---------------------------------------------------

app.get('/travel', function (req, res) {
  res.sendFile(path.join(__dirname, './views/travel.html'));
});

// ---------------------------------------------------
app.get('/hospital', function (req, res) {
  res.sendFile(path.join(__dirname, './views/hospital.html'));
});

// ---------------------------------------------------
app.get('/shopping', function (req, res) {
  res.render('shopping');
});

app.post('/shopping', function (req, res) {
  console.log(req.body);
  const result = spawn('python', [
    'view.py',
    req.body.sentence,
    '휴대전화 배터리 소모가 빨라요', // req.body.voice
  ]);
  result.stdout.on('data', (data) => {
    console.log(JSON.parse(data));
    res.render('shopping', JSON.parse(data));
  });
});
// ---------------------------------------------------
app.get('/practice', function (req, res) {
  res.sendFile(path.join(__dirname, './views/practice.html'));
});

// ---------------------------------------------------
app.get('/tonguetwister', function (req, res) {
  res.sendFile(path.join(__dirname, './views/tonguetwister.html'));
});

// ---------------------------------------------------
app.get('/colloquial', function (req, res) {
  res.sendFile(path.join(__dirname, './views/colloquial.html'));
});

// ---------------------------------------------------
// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);

// bootstrap template
// https://themewagon.com/themes/free-bootstrap-4-html5-admin-dashboard-template-plus-admin/

app.get('/greeting.json', (req, res) => {
  res.sendFile(path.join(__dirname, './assets/json/greeting.json'));
});

app.get('/hospital.json', (req, res) => {
  res.sendFile(path.join(__dirname, './assets/json/hospital.json'));
});

app.get('/restaurant.json', (req, res) => {
  res.sendFile(path.join(__dirname, './assets/json/restaurant.json'));
});

app.get('/school.json', (req, res) => {
  res.sendFile(path.join(__dirname, './assets/json/school.json'));
});

app.get('/shopping.json', (req, res) => {
  res.sendFile(path.join(__dirname, './assets/json/shopping.json'));
});

app.get('/travel.json', (req, res) => {
  res.sendFile(path.join(__dirname, './assets/json/travel.json'));
});

app.get('/tonguetwister.json', (req, res) => {
  res.sendFile(path.join(__dirname, './assets/json/tonguetwister.json'));
});

app.get('/colloquial.json', (req, res) => {
  res.sendFile(path.join(__dirname, './assets/json/colloquial.json'));
});
