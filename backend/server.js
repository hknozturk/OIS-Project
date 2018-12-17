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

/**
 * user e-mail and password check
 */
app.route('/authenticate').post((req, res) => {
  let user_email = req.body.email;
  let user_password = req.body.password;

  mysql_con.query('SELECT * FROM ois.User WHERE email=?', user_email, function(
    err,
    results
  ) {
    if (err) {
      throw err;
    } else {
      if (results.length > 0) {
        bcrypt.compare(user_password, results[0].password, function(
          err,
          compareResult
        ) {
          if (err) throw err;

          if (compareResult) {
            res.send({
              data: results[0],
              message: 'User Succesfully Authenticated'
            });
          } else {
            res.send({
              data: [],
              message: 'User Authenticated Failed!'
            });
          }
        });
      } else {
        res.send({
          data: [],
          message: 'Email does not exists'
        });
      }
    }
  });
});

app.route('/getenumtypes').get((req, res) => {
  mysql_con.query(
    "SHOW COLUMNS FROM ois.User WHERE Field = 'gender' or Field = 'blood_type'",
    function(err, result) {
      if (err) {
        throw err;
      } else {
        res.send({
          data: result
        });
      }
    }
  );
});

app.route('/postnewuser').post((req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) throw err;

    req.body.password = hash;
    mysql_con.query('INSERT INTO ois.User SET ? ', req.body, function(
      err,
      results
    ) {
      if (err) {
        return res.send({
          error: true,
          data: [],
          message: 'Email exists'
        });
      } else {
        return res.send({
          error: false,
          data: results,
          message: 'Registration successful'
        });
      }
    });
  });
});

app.route('/useraddress').post((req, res) => {
  mysql_con.query(
    'INSERT INTO ois.Address(country, city, number, street_name, zip_code) SELECT "' +
      req.body.country +
      '", "' +
      req.body.city +
      '", "' +
      req.body.number +
      '", "' +
      req.body.street_name +
      '", "' +
      req.body.zip_code +
      '"',
    function(err, results) {
      if (err) {
        return res.send({
          error: true,
          data: [],
          message: err
        });
      } else {
        return res.send({
          error: false,
          data: results
        });
      }
    }
  );
});

app.route('/getuserid').post((req, res) => {
  mysql_con.query(
    'SELECT id FROM ois.User WHERE email=?',
    req.body.email,
    function(err, results) {
      if (err) {
        return res.send({
          error: true,
          data: [],
          message: err
        });
      } else {
        return res.send({
          error: false,
          data: results
        });
      }
    }
  );
});

app.route('/getaddressid').get((req, res) => {
  mysql_con.query(
    'SELECT id FROM ois.Address ORDER BY id DESC LIMIT 1',
    function(err, results) {
      if (err) {
        return res.send({
          error: true,
          data: [],
          message: err
        });
      } else {
        return res.send({
          error: false,
          data: results
        });
      }
    }
  );
});

app.route('/userlocation').post((req, res) => {
  let user_id = req.body.userid;
  let addr_id = req.body.addressid;
  mysql_con.query(
    'INSERT INTO ois.User_location(user_id, address_id) VALUES("' +
      user_id +
      '", "' +
      addr_id +
      '")',
    function(err, results) {
      if (err) {
        return res.send({
          error: true,
          data: [],
          message: err
        });
      } else {
        return res.send({
          error: false,
          data: results
        });
      }
    }
  );
});

app.route('/addhealthcondition').post((req, res) => {
  let user_email = req.body.user_email;
  let severity = req.body.severity;
  let symp_id = req.body.symp_id;
  mysql_con.query('SELECT id from ois.User WHERE email=?', user_email, function(
    err,
    result
  ) {
    if (err) {
      return res.send({
        error: true,
        data: [],
        message: err
      });
    } else {
      console.log(result);
      mysql_con.query(
        'INSERT INTO ois.Health_condition(user_id, severity, date, symp_id) SELECT "' +
          result[0].id +
          '", "' +
          severity +
          '", SYSDATE(), "http://purl.obolibrary.org/obo/' +
          symp_id +
          '"',
        function(err, results) {
          if (err) {
            return res.send({
              error: true,
              data: [],
              message: err
            });
          } else {
            return res.send({
              error: false,
              data: results
            });
          }
        }
      );
    }
  });
});
