if (!('serviceWorker' in navigator)) {
    console.log("Service worker tidak didukung browser ini.");
} else {
    registerServiceWorker();
    setTimeout(function(){ 
      requestPermission();
    }, 3000);
}

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/service-worker.js')
            .then(function() {
                console.log('Pendaftaran ServiceWorker berhasil');
            })
            .catch(function(){
                console.log('Pendaftaran ServiceWorker gagal');
            });
        })
    } else {
        console.log("ServiceWorker belum didukung browser ini.")
    }    
}

function requestPermission() {
    if ('Notification' in window) {
    Notification.requestPermission().then(function (result) {
        if (result === "denied") {
        console.log("Fitur notifikasi tidak diijinkan.");
        return;
        } else if (result === "default") {
        console.error("Pengguna menutup kotak dialog permintaan ijin.");
        return;
        }
        
        if (('PushManager' in window)) {
            navigator.serviceWorker.getRegistration().then(function(registration) {
                registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array("BAu8YUse6Bgsvc3uZYY9jPWM2VXnTlTHaN_1RcBbAXeuynBxgSjE22Qj8ohAoAnuToAIdSFXalgqC6mK3uvvTbA")
                }).then(function(subscribe) {
                    console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                    console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                        null, new Uint8Array(subscribe.getKey('p256dh')))));
                    console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                        null, new Uint8Array(subscribe.getKey('auth')))));
                }).catch(function(e) {
                    console.error('Tidak dapat melakukan subscribe ', e.message);
                });
            });
        }
    });
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

// {
//     "publicKey":"BAu8YUse6Bgsvc3uZYY9jPWM2VXnTlTHaN_1RcBbAXeuynBxgSjE22Qj8ohAoAnuToAIdSFXalgqC6mK3uvvTbA",
//     "privateKey":"N_2wcesCMjmK2_x_972vvRkSjst42D0-_Cre4H7QID8"
// }