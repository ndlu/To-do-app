const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

mongoose.connect('mongodb+srv://mac1234:mac1234@cluster1-gjzvq.mongodb.net/test?retryWrites=true', {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('MongoDB Connected...')
    })
    .catch(ex => console.error(ex));

const app = express();

require('./config/passport');

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.urlencoded({
    extended: true
}));

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));