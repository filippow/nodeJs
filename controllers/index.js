const skillsModel = require('../models/skills'),
    config = require('../config/config'),
    nodemailer = require('nodemailer');

module.exports = {
    showMainPage: function (req, res) {
        console.log('MAIN!!!!!!!!!!!!!!');
        res.render('pages/index');
    },

    sendEmailMessage: function (req, res) {
        if (!req.body.email || !req.body.name) {
            res.status(400).send('Необходимо заполнить все данные');
        } else {
            var mailConfig = config.mail,
                transporter = nodemailer.createTransport(mailConfig.smtp),
                mailOptions = {
                    from: 'Филиппов Евгений',
                    to:  mailConfig.user,
                    subject: mailConfig.subject,
                    text: 'Какой то текст',
                    html: `<b>Почтовый адрес, указанный при отправлении данных формы <${req.body.email}></b><br>` +
                        `<div>Комментарий ${req.body.message}</div>`
                };

            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    return res.status(400).send(`При отправке сообщения произошла ошибка!: ${err}`);
                }

                res.status(200).send('Сообщение успешно отправлено');
            });
        }
    }
};