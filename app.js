const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const launch = require('./launchday');
const app = express();
const port = process.env.PORT || 3000;

//gunakan ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static(__dirname+'/public'));

app.get('/', (req, res) => {
    const mahasiswa = [
        {
            nama: 'sandhika',
            email: 'dhika@gmail.com'
        },
        {
            nama: 'galih',
            email: 'galih@gmail.com'
        },
        {
            nama: 'kinoy',
            email: 'kinoy@gmail.com'
        }
    ];

    
    function coba() {
        const tanggalTujuan = new Date('July 7, 2021 08:00:00').getTime();
        
        const sekarang = new Date().getTime();
        const selisih = tanggalTujuan - sekarang;
        const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
        const jam = Math.floor( selisih % (1000 * 60 * 60* 24)/(1000*60*60));
        const menit = Math.floor( selisih % (1000 * 60 * 60) / (1000*60));
        const detik = Math.floor(selisih % (1000 * 60) / 1000);
        const result = hari + " HARI " + jam + " JAM " + menit + " MENIT ";
        return result;
        // return hitungMundur;
        // return result;
    } 
    
    // setInterval(function(){
    //     return coba(); 
    // }, 1000);

    res.render('index', {
        nama: 'Nona Cantik nan Sederhana',
        title: 'Home',
        mahasiswa,
        coba(){
            return coba();
        },
        layout: 'layouts/main-layout',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Halaman About',
        layout: 'layouts/main-layout',
    });
});

app.get('/contact', (req, res) => {
    res.render('about', {
        title: 'Halaman Contact',
        layout: 'layouts/main-layout',
    });
});

app.get('/product/:id', (req, res) => {
    res.send(`Product ID: ${req.params.id} <br> ${req.query.category}`);
});

app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404. Page not found.<h1>');
});

app.listen(port, () => {
    console.log("Listening to port 3000....")
});