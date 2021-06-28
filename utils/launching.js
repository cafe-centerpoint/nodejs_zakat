function hitungHari() {
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

module.exports = { hitungHari };