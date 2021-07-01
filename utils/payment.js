const fs = require('fs');

// membuat folder data jika belum ada
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// mmebuat file contact.json jika belum ada
const dataPath = './data/zakat.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

// mengambil/mengakses data yang ada dalam contacts.json
const loadContacts = () => {
    const fileBuffer = fs.readFileSync('data/zakat.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);
    return contacts;
}

// mengambil data sebuah kontak
const findContact = (nama) => {
    const contacts = loadContacts();
    const contact = contacts.find((contact) => contact.nama === nama);
    return contact;
}

// menuliskan/menimpa file contacts.json dengan data yang baru
const saveContacts = (contacts) => {
    fs.writeFileSync('data/zakat.json', JSON.stringify(contacts));
}

// menambahkan data yang baru
const addContact = (contact) => {
    const contacts = loadContacts();
    //generate code disini ya, Kinoy
    contacts.push(contact);
    saveContacts(contacts);
}

// cek nama yang duplikat
const cekDuplikat = (nama) => {
    const contacts = loadContacts();
    return contacts.find((contact) => contact.nama === nama);
}

module.exports = { addContact, cekDuplikat };