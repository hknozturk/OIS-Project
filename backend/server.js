const express = require('express');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');

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

app.route('/users').get((req, res) => {
  mysql_con.query('SELECT * FROM ois.users ', function(err, results) {
    if (err) throw err;

    return res.send({ results });
  });
});

/**
 * user e-mail and password check
 */
app.route('/authenticate').post((req, res) => {
  let user_email = req.body.email;
  let user_password = req.body.password;

  console.log(req.body);

  bcrypt.hash(user_password, 10, function(err, hash) {
    if (err) throw err;
    mysql_con.query(
      'SELECT * FROM ois.users WHERE email=?',
      user_email,
      function(err, results, fields) {
        if (err) {
          res.send({
            code: 400,
            failed: 'error occured'
          });
        } else {
          if (results.length > 0) {
            if (results[0].password == hash) {
              res.send({
                code: 200,
                success: 'login successful',
                data: results[0]
              });
            } else {
              res.send({
                code: 204,
                success: 'Email and password does not match'
              });
            }
          } else {
            res.send({
              code: 204,
              success: 'Email does not exists'
            });
          }
        }
      }
    );
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
