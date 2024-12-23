const express = require('express');
const db = require('./config/database');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('./config/env');

const userRoute = require('./routes/user');
const contentRoute = require('./routes/content');
const categoryRoute = require('./routes/category');
const commentRoute = require('./routes/comment');
const reviewRoute = require('./routes/review');
const profileRoute = require('./routes/profile');
const videoRoute = require('./routes/video');
const signupRoute = require('./routes/registration/sign-up');
const loginRoute = require('./routes/registration/log-in');
const logoutRoute = require('./routes/registration/log-out');

const authorized = require('./middleware/authorization');
const authenticated = require('./middleware/authentication');
const unauthenticated = require('./middleware/unauthentication');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use('/api/users/', userRoute);
app.use('/api/contents/', contentRoute);
app.use('/api/categories/', categoryRoute);
app.use('/api/comments/', commentRoute);
app.use('/api/reviews/', reviewRoute);
app.use('/api/profiles/', profileRoute);
app.use('/api/videos/', videoRoute);

app.use('/sign-up/', unauthenticated, signupRoute);
app.use('/log-in/', unauthenticated, loginRoute);
app.use('/log-out/', authenticated, logoutRoute);

db.connect((err) => {
    if (err) {
        console.error('Failed connecting to the database');
        return;
    }
    console.log('Connected to MySQL database.');
});

app.use((req, res, next) => {
    res.status(404).send("404");
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("500 Internal Server Error");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});