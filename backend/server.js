const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.options('*', cors());

const bodyParser = require('body-parser');
const mysql = require('mysql');

//app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const mysql_con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ois'
});

mysql_con.connect();

app.listen(8000, () => {
  console.log('Server listens port 8000');
});

// app.route('/login').get((req, res) => {
//   res.send({
//     first: [{ name: 'Hello World' }]
//   });
// });

app.route('/users').get((req, res) => {
  mysql_con.query('SELECT * FROM ois.users ', function(err, results) {
    if (err) throw err;

    console.log('anan artık: ', results);
    return res.send({ results });
  });
});

app.get('/login/:id', function(req, res) {
  let user_id = req.params.id;

  if (!user_id) {
    return res
      .status(400)
      .send({ error: true, message: 'Please provide user_id' });
  }

  mysql_con.query('SELECT * FROM users where id=?', user_id, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results[0],
      message: 'Specific user'
    });
  });
});

app.post('/register', function(req, res) {
  let user = req.body.user;

  if (!user) {
    return res
      .status(400)
      .send({ error: true, message: 'Please provide user info' });
  }

  mysql_con.query('INSERT INTO users SET ? ', { user: user }, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: 'New User Registered.'
    });
  });
});
