const express = require('express');
const router = express.Router();
const BusLocation = require('../models/BusLocation');

// router.post('/location', async (req, res) => {
//   const { latitude, longitude } = req.body;
//   const newLocation = new BusLocation({ latitude, longitude });

//   try {
//     await newLocation.save(); // MongoDB에 저장
//     res.json({ message: 'Location updated', newLocation });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to update location' });
//   }
// });
let busLocation = null; // 최신 위치 데이터를 저장하는 변수

// 위치 데이터 저장
// router.post('/location', (req, res) => {
//   const { latitude, longitude } = req.body;
  
//   // latitude와 longitude 값이 잘 들어오는지 확인하는 로그
//   console.log('Received location data:', { latitude, longitude });

//   busLocation = { latitude, longitude, timestamp: new Date() };
//   res.json({ message: 'Location updated', busLocation });
// });
router.post('/location', async (req, res) => {
  const { latitude, longitude } = req.body;

  try {
    const newLocation = new BusLocation({ latitude, longitude });
    await newLocation.save(); // MongoDB에 저장

    // 저장된 데이터를 클라이언트에게 응답으로 보냄
    res.json({ message: 'Location updated', newLocation });
  } catch (error) {
    console.error('Error saving location:', error);
    res.status(500).json({ error: 'Failed to save location' });
  }
});

// 위치 데이터 반환
// router.get('/location', (req, res) => {
//   console.log('GET 요청 수신');
//   if (busLocation) {
//     res.json(busLocation);
//     console.log('GET잘됨');
//   } else {
//     res.status(404).json({ error: 'Location not found' });
//     console.log('GET안됨');
//   }
// });
router.get('/location', async (req, res) => {
  try {
    const latestLocation = await BusLocation.findOne().sort({ timestamp: -1 }); // 최신 위치 조회
    
    if (latestLocation) {
      res.json(latestLocation);
    } else {
      res.status(404).json({ error: 'Location not found' });
    }
  } catch (error) {
    console.error('Error fetching location:', error);
    res.status(500).json({ error: 'Failed to fetch location' });
  }
});

module.exports = router;
