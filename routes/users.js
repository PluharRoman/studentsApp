var express = require('express');
var router = express();
var users = require('../users.json');
var headers = {
  header: 'Content-type',
  value: 'application/json'
};
var _ = require('lodash');
/* GET users listing. */
router.get('', function(req, res, next) {
  res.send(JSON.stringify(users));
});

/* GET users listing. */
router.get('/refreshAdmins', function(req, res, next) {
  res.append(headers.header, headers.value);
  res.status(204).end();
});

/* POST user. */
router.post('', function(req, res, next) {
  var data = req.body;
  var newUser;
  if (data) {
    newUser = data;
  } else {
    newUser = {};
  }
  if(!newUser.role){
    newUser.role = 'Student';
  }
  if(!(newUser.role === 'Administrator' || newUser.role === 'Admin' || newUser.role === 'Support' || newUser.role === 'Student')){

    res.append(headers.header, headers.value);
    res.status(401).end();
    return;
  }
  if (!req.headers['content-type'] || req.headers['content-type'].indexOf('application/json') === -1) {
    res.append(headers.header, headers.value);
    res.status(401).end();
    return;
  } else {
    if (newUser.role === 'Admin') {
      newUser.role = 'Administrator';
    }
    if (users.length != 0) {
      newUser.id = (+(_.maxBy(users, 'id')).id + 1);
    } else {
      newUser.id = '1';
    }

    users.push(newUser);
    res.append(headers.header, headers.value);
    res.send(JSON.stringify(newUser));
    return;
  }
});

/* PUT user. */
router.put('*', function(req, res, next) {
  var update = req.body;
  users.forEach(function(user, index) {
    if (+user.id === +update.id) {
      if (!(req.headers['content-type'] || req.headers['content-type'].indexOf('application/json') === -1)) {
        res.append(headers.header, headers.value);
        res.status(401);
        res.end()
      } else {
        users.splice(index, 1, update);
        res.append(headers.header, headers.value);
        res.status(204);
        res.end()
        return;
      }
    }
  });
});

/* DELETE user. */
router.delete('*', function(req, res, next) {
  var id = req.url.split('/')[1];
  var item;
  if (id) {
    item = _.find(users, {id: +id});
    if(!item){
      res.append(headers.header, headers.value);
      res.status(404).end();
      return;
    }
  }
  if (!(req.headers['content-type'] || req.headers['content-type'].indexOf('application/json') === -1)) {
    res.append(headers.header, headers.value);
    res.status(401).end();
    return;
  } else {
    users.splice(users.indexOf(item), 1);
    res.append(headers.header, headers.value);
    res.status(204).end();
    return;
  }
});
module.exports = router;
