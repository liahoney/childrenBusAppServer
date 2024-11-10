// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // 중복 확인
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: '이미 가입된 이메일입니다.' });
      }
  
      // 새로운 사용자 생성
      const newUser = new User({ username, email, password });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: '회원가입에 실패했습니다.' });
    }
  });

  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user || user.password !== password) {
        return res.status(401).json({ error: '이메일 또는 비밀번호가 잘못되었습니다.' });
      }
  
      // JWT 생성
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
  
      // 클라이언트에 토큰과 사용자 정보 반환
      res.json({ token, user: { username: user.username, email: user.email } });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: '로그인에 실패했습니다.' });
    }
  });


// 전체 사용자 조회
router.get('/users', async (req, res) => {
    try {
      const users = await User.find(); // 모든 사용자 조회
      res.json(users); // 사용자 목록 반환
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });


  // 특정 사용자 조회 (ID 기반)
router.get('/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id); // ID로 사용자 조회
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  });

module.exports = router;
