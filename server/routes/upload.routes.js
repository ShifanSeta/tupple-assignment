const express = require('express');
const multer = require('multer');
const User = require('../models/user');
const fs = require('fs');
const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const userId = req.params.id;
      const userFolderPath = `public/profiles/${userId}`;
      // Create the user folder if it doesn't exist
      if (!fs.existsSync(userFolderPath)) {
        fs.mkdirSync(userFolderPath, { recursive: true });
      }
      cb(null, userFolderPath);
    },
    filename: function (req, file, cb) {
      cb(null, `profile.jpg`);
    }
  });

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post('/:id', upload.single('profilePic'), async (req, res) => {
    console.log('req----', req.file)
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).send('User not found');
    }
    console.log(req.body)
    console.log(req.file)
    user.profilePic = req.file.filename;
    await user.save();
    res.send('Profile picture uploaded successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
