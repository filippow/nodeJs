const skillsModel = require('../models/skills');

module.exports = {
    showAdminPanel: function (res, req) {
        console.log('admin renderer');
        req.render('pages/admin');
    },

    saveProduct: function (req, res) {

    },

    saveCounter: function (req, res) {
        skillsModel.setRecords(req.body);
        res.redirect('pages/admin');
    }
};