fetch('https://api.football-data.org/v2/competitions/2014/standings',{
    method: 'GET',
    headers: {
        'X-Auth-Token': 'd93d4aef37974d35a2a45aa8b062f53f',
    }
})
    .then(function (response) {
        if (response.status !== 200) {
            console.log('Error : ' + response.status);
            // Method reject() akan membuat blok catch terpanggil
            return Promise.reject(new Error(response.statusText));
        } else {
            // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
            return Promise.resolve(response);
        }
    }).then(function(response) {
        // Mengembalikan sebuah Promise berupa objek/array JavaScript
        // yang diubah dari teks JSON. 
        return response.json();
    }).then(function(data) {
        // Objek/array JavaScript dari response.json() masuk lewat data.
        console.log(data);
    }).catch(function(error) {
        // Parameter error berasal dari Promise.reject() 
        console.log('Error : ' + error);
    });