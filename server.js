// server.js
const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protectedRoute');
dotenv.config();
const cors = require('cors');
const app = express();
app.use(cors()); 
app.use(express.json());

// 기본 경로 설정
app.get('/', (req, res) => {
  res.send('Server is running');
});

const busRoutes = require('./routes/bus'); // 라우트 파일 가져오기

app.use('/api/bus', busRoutes); // /api/bus로 라우트 설정

app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes); // 보호된 라우트 등록

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Failed to connect to MongoDB:', error));

// 서버 시작
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
