const express = require('express');  //like imports
const connectDB = require('./config/db.js');  //like imports
const usersRouter = require('./routes/api/users');  //like imports
const postsRouter = require('./routes/api/posts');  //like imports
const authRouter = require('./routes/api/auth');  //like imports
const profileRouter = require('./routes/api/profile');  //like imports


const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

//Initializing Middleware (allows us to get data in body)
app.use(express.json({extended: false}));



//Defining Routes
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);

app.get('/', (req, res) => res.send("API is running"));
app.listen(PORT, () => console.log(PORT ));

