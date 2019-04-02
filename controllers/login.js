module.exports = {
    showLoginForm: function (req, res) {

        res.render('pages/login');
    },

    authorize: function (req, res) {
        const db = require('../models/db'),
            dbAdmin = db.get('users').value().admin,
            currentEmail = req.body.email,
            currentPassword = req.body.password;

        if (!req.body.email || !req.body.password) {
            res.status(404).send('Для входа необходимо ввести логин и пароль');
        } else {
            if (currentEmail === dbAdmin.email && currentPassword === dbAdmin.password) {
                req.session.isAdmin = true;
                res.redirect('/admin');
            } else {
                req.session.isAdmin = false;
                res.redirect('/');
            }
        }
    }
};
