const express = require("express");
const router = express.Router();

const {uploadProfileImage, uploadAudioFile} = require("../middlewares/image.middleware")
const {
  getMediaPage,
  postProfileImage,postMultipleImages, getMultipleImages,
  postMultipleAudioFiles,
  } = require("../controllers/media.controller");
  
  router.get('/media-pages', getMediaPage)
  router.post('/upload/single_image', uploadProfileImage.single('image'), postProfileImage);
router.post('/upload/multiple_image/:id', uploadProfileImage.array('images', 5), postMultipleImages);
router.get('/multiple_image', getMultipleImages)

router.post('/upload/audio/:id', uploadAudioFile.array('audio', 5), postMultipleAudioFiles);

module.exports = router;