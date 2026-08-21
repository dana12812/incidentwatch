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

// ── Middleware ──────────────────────────────────────────

// ── Controllers ─────────────────────────────────────────

const app = express();
const port = process.env.PORT ? process.env.PORT : '3000';

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


// ── PROTECTED ROUTES ───────────────────────────────────

// ── Start server ───────────────────────────────────────
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});