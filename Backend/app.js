
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const cors = require('cors')

const app = express();
connectDB();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to GitHub User API');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
