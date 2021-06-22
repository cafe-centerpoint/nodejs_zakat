function launch() {
    //program hitung mundur
    const tanggalTujuan = new Date('June 22, 2021 08:00:00').getTime();
    const hitungMundur = setInterval(function () {
        const sekarang = new Date().getTime();
        const selisih = tanggalTujuan - sekarang;
        const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
        const jam = Math.floor( selisih % (1000 * 60 * 60* 24)/(1000*60*60));
        const menit = Math.floor( selisih % (1000 * 60 * 60) / (1000*60));
        const detik = Math.floor(selisih % (1000 * 60) / 1000);

        // const rst = hari + " HARI " + "[" + jam + ":" + menit + ":" + detik + "]";
        const rst = hari;
        // console.log(rst);

        // if (selisih == 0) {
        //     clearInterval(hitungMundur);
        //     console.log("Cafe Center Point sudah dibuka.");
        // }
        return "kinoyjo";
    }, 1000);
}

module.exports = launch;