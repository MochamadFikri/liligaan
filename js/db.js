var dbPromised = idb.open('db_liligaan', 1, upgradeDb => {  
    var teamObjectStore = upgradeDb.createObjectStore('teams', {    
        keyPath: 'id'  
    });  
    teamObjectStore.createIndex('name','name', { unique: false});
});

function saveForLater(team) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      console.log(team);
      store.add(team);
      return tx.complete;
    })
    .then(function() {
      console.log("Tim berhasil ditambahkan ke favorit.");
    });
}


function deleteFavourite (team) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("teams", "readwrite");
      tx.objectStore("teams").delete(team);
      return tx.complete;
    })
    .then(function() {
      console.log("Tim berhasil dihapus dari favorit.");
    });
};

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function(teams) {
        resolve(teams);
      });
  });
}
  