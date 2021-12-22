const router = require("express").Router();

const authContoller = require('../../controllers/authController');

//Check for authentication
// router.use(authContoller.protect);

router.get('/public-playlist', authContoller.allPublicPlayList);

router.use(authContoller.protect);
//Common routes for all users
// router.get('', authContoller.detail);
router.put('/create-playlist', authContoller.createPlaylist);
router.get('/myplaylist', authContoller.getMyPlaylist);
router.put('/add-into-playlist', authContoller.addIntoPlaylist);

module.exports = router;
