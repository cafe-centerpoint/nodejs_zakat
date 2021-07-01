const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const midtransClient = require('midtrans-client');
const { addContact, cekDuplikat } = require('./utils/payment')
const { body, validationResult, check } = require('express-validator'); //panggil check utk kostumisasi pesan error
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

// express n port
const app = express();
const port = process.env.PORT || 8080;

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
    res.render('index', { //nama view
        title: 'Easy Zakat',
        layout: 'layouts/main-layout',
    }) 
})


app.get('/access', (req, res) => {
    res.render('access', { //nama view
        title: 'Halaman logout',
        layout: 'layouts/main-layout',
    }) 
})



// insert contact //tambahin validator sebelum callback req res
app.post('/', [
    //kostumisasi pake body n check
    body('namalengkap').custom( (value) => {
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
                res.render('index', {
                    title: 'Form Tambah Data Muzakki',
                    layout: 'layouts/main-layout',
                    errors: errors.array(), //karena ditaruh di dalam array
                });
        } else {
            addContact(req.body); //respon yg dikirim berupa object res.send(req.body
            res.redirect('/detail');
            req.flash('msg', 'Data contact berhasil ditambahkan...');
        }
})

app.get('/detail', (req, res) => {
        res.render('detail', { //nama view
            title: 'Detail Transaksi',
            layout: 'layouts/main-layout',
            msg: req.flash('msg'),

    });
})


app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404. Page not found.<h1>');
});

app.listen(port, () => {
    console.log(`Listening to port ${port}....`)
});