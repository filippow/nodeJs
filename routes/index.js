const router = require('express').Router(),
    mainController = require('../controllers/index'),
    loginController = require('../controllers/login'),
    adminController = require('../controllers/admin');

const isAdmin = function (req, res, next) {
    if (req.session.isAdmin) {
        next();
    } else {
        res.redirect('/login');
    }
};

//ВОТ ЭТОТ КОРНЕВОЙ РОУТ НА GET ВООБЩЕ НЕ ОТРАБАТЫВАЕТ
router.get('/', mainController.showMainPage);
router.post('/', mainController.sendEmailMessage);

router.get('/login', loginController.showLoginForm);
router.post('/login', loginController.authorize);

router.get('/admin', isAdmin, adminController.showAdminPanel);
router.post('/admin/skills', isAdmin, adminController.saveCounter);
router.post('/admin/products', isAdmin, adminController.saveProduct);

module.exports = router;