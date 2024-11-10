// routes/protectedRoute.js
const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');

// 보호된 라우트 예제
router.get('/protected-route', authenticateJWT, (req, res) => {
  res.json({ message: '이것은 보호된 데이터입니다.', user: req.user });
});

module.exports = router;
