const express=require('express');
const router=express.Router();
const {welcome,fetchData, writeData,appendData,deleteData,osInfo}=require('../controller/controller');

const {apiKeyMiddleware}=require('../middleware/middleware');

router.use(apiKeyMiddleware);

router.get('/',welcome);
router.get('/os-info',osInfo);
router.get('/data',fetchData);
router.post('/data',writeData);
router.put('/data',appendData);
router.delete('/data',deleteData);

module.exports=router;