var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const builds = require("./routes/builds");
const parts = require("./routes/parts");
const user = require("./routes/user");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.post('/builds', builds.addBuild);
app.post('/parts', parts.addPart);
app.post('/user', user.addUser);
app.get('/builds', builds.findAll);
app.get('/parts', parts.findAll);
app.get('/user', user.findAll);
app.get('/builds/findByCost/:cost', builds.findByCost);
app.get('/builds/findByCPU/:cpu', builds.findByCPU);
app.get('/builds/findByGPU/:gpu', builds.findByGPU);
app.get('/builds/findByRAM/:ram', builds.findByRAM);
app.get('/builds/findByStorage/:storage', builds.findByStorage);
app.get('/builds/findByOs/:os', builds.findByOs);
app.get('/builds/votes', builds.findTotalUpvotes);
app.get('/builds/:id', builds.findOne);
app.get('/parts/:id', parts.findOne);
app.get('/user/:id', user.findOne);
app.get('/user/userBuild/:userId', builds.findByUser);
app.get('/parts/findByType/:type', parts.findByType);
app.get('/parts/fuzzySearch/:title', parts.fuzzySearch);
app.put('/builds/:id/vote', builds.incrementUpvotes);
app.put('/builds/:buildId/partsCPU/:partId', builds.updateCPU);
app.put('/builds/:buildId/partsGPU/:partId', builds.updateGPU);
app.put('/builds/:buildId/partsRAM/:partId', builds.updateRAM);
app.put('/builds/:buildId/partsStorage/:partId', builds.updateStorage);
app.put('/builds/:buildId/partsOS/:partId', builds.updateOS);
app.put('/builds/:id/cost', builds.updateCost);
app.put('/builds/:id/title', builds.updateTitle);
app.put('/user/:userId/:newEmail', user.updateEmail);
app.delete('/builds/:id', builds.deleteBuild);
app.delete('/parts/:id', parts.deletePart);
app.delete('/user/:id', user.deleteUser);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
