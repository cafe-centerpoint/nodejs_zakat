const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;

//gunakan ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);

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

    res.render('index', {
        nama: 'Nona Cantik nan Sederhana',
        title: 'Home',
        mahasiswa,
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