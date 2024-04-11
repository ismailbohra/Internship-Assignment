const express = require('express');
const router = express.Router();
const validate = require('../middelwares/validate');
const userController = require('../controllers/userController');
const  userValidation  = require('../validations/userValidation');
const { verifyToken } = require('../middelwares/Jwt');
const { isAdmin } = require('../middelwares/adminAccess');
const limiter = require('../middelwares/rateLimiter');
const upload = require('../middelwares/uploadMiddelware');

router.route('/').post(validate(userValidation.registerUser), userController.registerUser); 
router.route('/getUserbyid/:userId').get(verifyToken, validate(userValidation.getUser), userController.getUser); 
router.route('/getAllUser').get(verifyToken,isAdmin, userController.getAllUser); 
router.route('/login').post(limiter, validate(userValidation.login), userController.login); 
router.route('/').put(verifyToken, validate(userValidation.updateUser), userController.updateUser);
router.route('/upload').post(verifyToken, upload.single('profile'), userController.uploadProfile);
router.route('/profile').get(verifyToken, userController.getProfile);


module.exports = router;
