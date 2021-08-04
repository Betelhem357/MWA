const express = require("express");
const router = express.Router();
const instrument_controller = require("../controller/instrument_controller");
const music_controller = require("../controller/music_controller");
const user_controller = require("../controller/user_controller")


router.route("/instruments")
       .get(instrument_controller.getAllInstruments)
       .post(instrument_controller.createOneInstrument);
router.route("/instruments/:instrumentId")
       .get(instrument_controller.getInstrumentById)
       .patch(instrument_controller.updatePartialOneInstrument)
       .put(instrument_controller.updateFUllOneInstrument)
       .delete(instrument_controller.deleteInstrument);
router.route("/instruments/:instrumentId/musics")
       .get(music_controller.getAllMusics)
       .post(music_controller.createOneMusic);
router.route("/instruments/:instrumentId/musics/:musicId")
       .get(music_controller.getMusicById)
       .patch(music_controller.updatePartialOneMusic)
       .put(music_controller.updateFUllOneMusic)
       .delete(music_controller.deleteMusic);
router.route("/users").post(user_controller.register);
router.route("/login").post(user_controller.login);


module.exports = router;