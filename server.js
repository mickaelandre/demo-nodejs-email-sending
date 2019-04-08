const express = require('express');
const path = require('path');
const nodeMailer = require('nodemailer');
const bodyParser = require('body-parser');
const smtpTransport = require('nodemailer-smtp-transport')


const app = express();
const port = 3000;
const emailSetting = require('./config/config');


app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send("Hello World");
});


app.get('/getSetting', function (req, res) {
   res.send(emailAddress.emailSetting.user);
});

app.post('/send-email', function (req, res) {
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: emailSetting.emailAddress.user,
            pass: emailSetting.emailAddress.pass
        }
    });

    const mailOptions = {
        from: emailSetting.emailAddress.user, // sender address
        to: 'mickael.viseo@gmail.com', // list of receivers
        subject: 'Subject of your email', // Subject line
        html: '<p>Post 08/04 </p>'// plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
            console.log(err)
        else
            console.log(info);
    });

});


app.listen(port, function(){
    console.log('Server is running at port: ',port);
});
