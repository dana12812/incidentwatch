// server.js
require('dotenv').config();
require('./config/database');

const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo').MongoStore;
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT ? process.env.PORT : '3007';

// ── Controllers ─────────────────────────────────────────
const authCtrl = require('./controllers/authCtrl');
const recordsCtrl = require('./controllers/recordsCtrl');
const incidentsCtrl = require('./controllers/incidentsCtrl');
const usersCtrl = require('./controllers/usersCtrl');

// ── Middleware ──────────────────────────────────────────
const isSignedIn = require('./middleware/isSignedIn');
const isOwner = require('./middleware/isOwner');
const isAdmin = require('./middleware/isAdmin');

// ── App-level middleware ──────────────────────────────
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  })
);

// ── PUBLIC ROUTES ──────────────────────────────────────
app.get('/sign-up', authCtrl.newUser);
app.post('/sign-up', authCtrl.create);
app.get('/sign-in', authCtrl.newSession);
app.post('/sign-in', authCtrl.create);

// ── PROTECTED ROUTES ───────────────────────────────────
app.delete('/sign-out', isSignedIn, authCtrl.delete);

app.get('/records', isSignedIn, recordsCtrl.index);
app.get('/records/new', isSignedIn, recordsCtrl.new);
app.post('/records', isSignedIn, recordsCtrl.create);
app.get('/records/:id', isSignedIn, recordsCtrl.show);
app.get('/records/:id/edit', isSignedIn, isOwner, recordsCtrl.edit);
app.put('/records/:id', isSignedIn, isOwner, recordsCtrl.update);
app.delete('/records/:id', isSignedIn, isOwner, recordsCtrl.delete);

app.get('/incidents', isSignedIn, isAdmin, incidentsCtrl.index);
app.get('/incidents/:id', isSignedIn, isAdmin, incidentsCtrl.show);
app.post('/incidents/:id/review', isSignedIn, isAdmin, incidentsCtrl.createReview);
app.put('/incidents/:id/review', isSignedIn, isAdmin, incidentsCtrl.updateReview);

app.get('/users', isSignedIn, isAdmin, usersCtrl.index);
app.get('/users/:id', isSignedIn, isAdmin, usersCtrl.show);
app.put('/users/:id', isSignedIn, isAdmin, usersCtrl.update);
app.delete('/users/:id', isSignedIn, isAdmin, usersCtrl.delete);

// ── Start server ───────────────────────────────────────
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});