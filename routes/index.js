const router = require('express').Router(),
    mainController = require('../controllers/main'),
    loginController = require('../controllers/login'),
    adminController = require('../controllers/admin');

const isAdmin = function (req, res, next) {

    if (req.session.isAdmin) {
        next();
    } else {
        res.redirect('/login');
    }
};

router.post('/', mainController.sendEmailMessage);
router.get('/', mainController.showMainPage);

router.get('/login', loginController.showLoginForm);
router.post('/login', loginController.authorize);

router.get('/admin', isAdmin, adminController.showAdminPanel);
router.post('/admin/skills', isAdmin, adminController.saveCounter);
router.post('/admin/products', isAdmin, adminController.saveProduct);

module.exports = router;