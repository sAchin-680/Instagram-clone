import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const PORT = 3000;

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello ');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
