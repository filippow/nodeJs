var router = require('express').Router(),
    mainController = require('../controllers/main');

router.post('/', mainController.sendEmailMessage);
router.get('/', mainController.showMainPage);

module.exports = router;