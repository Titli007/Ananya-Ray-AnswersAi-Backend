const express = require('express');
const sequelize = require('./databaseConfig/db');
const userRoutes = require('./routes/userRoutes')
const questionRoutes = require('./routes/questionRoutes')
const authRoutes = require('./routes/authRoutes')
require('dotenv').config();

const app = express();
const port = 5000 || process.env.PORT;
app.use(express.json());


app.use('/api/users',userRoutes)
app.use('/api/questions', questionRoutes)
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    await sequelize.sync();
    console.log('Models synced with the database.');

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();