const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const  { addContact, cekDuplikat } = require('./utils/contact');
const { createRandomCode } = require('./utils/random_code');
const { hitungHari } = require('./utils/launching');
const { body, validationResult, check } = require('express-validator'); //panggil check utk kostumisasi pesan error
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
// QR CODE
const QRCode = require('qrcode');
// random code generator
var RandomCodes = require('random-codes');
// express n port
const app = express();
const port = process.env.PORT || 3000;

//set up packages
app.set('view engine', 'ejs');
app.use(expressLayouts); // view enginenya satu dg ejs
app.use(express.static('public')); //built-in middleware
app.use(express.urlencoded({extended: true}));

// konfigurasi flash
app.use(cookieParser('secret'));
app.use(
    session({
        cookie: {maxAge: 6000},
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);
app.use(flash());


app.get('/', (req, res) => {
    const days = hitungHari();
    res.render('index', { //nama view
        title: 'Welcome home',
        layout: 'layouts/main-layout',
        days,
    }) 
})


app.get('/voucher', (req, res) => {
    const days = hitungHari();
    res.render('voucher', { //nama view
        title: 'Voucher...voucher...',
        layout: 'layouts/main-layout',
        days,
    }) 
})

app.get('/whatsapp', (req, res) => {
    const days = hitungHari();
    res.render('whatsapp', { //nama view
        title: 'Hubungi kami via WA',
        layout: 'layouts/main-layout',
        days,
    }) 
})

// route for ADD harus ditulis sebelum route for FIND agar tereksekusi
app.get('/voucher/add', (req, res) => {
    const days = hitungHari();
    const randomCode = createRandomCode();
    const rc = new RandomCodes(randomCode);
    const value = rc.generate();
    res.render('add_contact', {
        title: 'Voucher...voucher...',
        layout: 'layouts/main-layout',
        value: value.toLowerCase(),
        days,
    })
})

// insert contact //tambahin validator sebelum callback req res
app.post('/voucher', [
    //kostumisasi pake body n check
    body('nama').custom( (value) => {
        const duplikat = cekDuplikat(value);
        if(duplikat) {
            throw new Error('Nama sudah digunakan!') //agar bisa ditangkap oleh validationResult sebagai parameter
        }
        return true; //return true artinya lolos, submit datanya //rturn false artinya return new Error
    }),
    check('email', 'Email tidak valid!').isEmail(),
    check('noHP', 'No HP tidak valid!').isMobilePhone('id-ID'), //harus sama dg attribute NAME di form contact
    ], (req, res) => {
        // VALIDATION
        const errors = validationResult(req); //ini bagian dari validasi, ngecek ada error apa gak
        if (!errors.isEmpty()) { //jika error tidak kosong
                res.render('add_contact', {
                    title: 'Voucher...voucher...',
                    layout: 'layouts/main-layout',
                    errors: errors.array(), //karena ditaruh di dalam array
                });
        } else {
            addContact(req.body) //respon yg dikirim berupa object res.send(req.body
            //sbelum redirect, kirim flash message dulu
            req.flash('msg', 'Data contact berhasil ditambahkan');
            res.redirect('/detail'); //klo berhasil redirect ke halaman contact
        }
})

app.get('/detail', (req, res) => {
    const days = hitungHari();
    const qrcodeInfo = 'https://cafe-centerpoint.herokuapp.com';
    QRCode.toDataURL(qrcodeInfo, { errorCorrectionLevel: 'H' }, (err, url) => {
        res.render('detail', { //nama view
            title: 'Voucher...voucher...',
            layout: 'layouts/main-layout',
            url,
            days,
        })
    }) 
})

app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404. Page not found.<h1>');
});

app.listen(port, () => {
    console.log(`Listening to port ${port}....`)
});