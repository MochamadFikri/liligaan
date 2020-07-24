var base_url = "https://api.football-data.org/v2/";
var token = "d93d4aef37974d35a2a45aa8b062f53f";

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

function getTeams() {
  fetch(base_url + "competitions/2014/teams",{
    method: 'GET',
    headers: {
        'X-Auth-Token': 'd93d4aef37974d35a2a45aa8b062f53f',
    }
  })
    .then(status)
    .then(json)
    .then(function(data) {
      var teamsHTML = "";
      data.teams.forEach(function(teams) {
        teamsHTML += ` <div class="col s12 m3">
                        <div class="card blue-grey darken-3  white-text">
                          <br>
                          <p class="center"><b>${teams.name}</b></p>
                          <div class="card-image">
                            <img src="${teams.crestUrl}" class="reponsive-img" height="150px">
                          </div>
                          <div class="card-content">
                          </div>
                          <div class="card-action center">
                            <a href="#">Detail</a>
                          </div>
                        </div>
                      </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("teams").innerHTML = teamsHTML;
    })
    .catch(error);
}

function getStandings() {
  fetch(base_url + "competitions/2014/standings",{
    method: 'GET',
    headers: {
        'X-Auth-Token': 'd93d4aef37974d35a2a45aa8b062f53f',
    }
  })
    .then(status)
    .then(json)
    .then(function(data) {
      var tabsHTML = ``;
      var tabs2HTML = ``;
      data.standings.forEach(function(standings) {
        
        tabsHTML += `
                <li class="tab"><a href="#${standings.type}">${standings.type}</a></li>
            `;
        document.getElementById("tabs").innerHTML = tabsHTML;

        tabs2HTML += `<div id="${standings.type}">
        <table class="responsive-table">
          <thead>
            <tr>
                <th class="center">POSITION</th>
                <th class="center">TEAMS</th>
                <th class="center">WON</th>
                <th class="center">DRAW</th>
                <th class="center">LOST</th>
                <th class="center">GOALS</th>
                <th class="center">POINTS</th>
            </tr>
          </thead>
          <tbody>`;

        standings.table.forEach(function(table) {
          tabs2HTML +=`
                          <tr>
                            <th class="center">${table.position}</th>
                            <td><i class="material-icons"><img src="${table.team.crestUrl}" width="20px" height="20px"></i>&nbsp;&nbsp;&nbsp; ${table.team.name}</td>
                            <td class="center">${table.won}</td>
                            <td class="center">${table.draw}</td>
                            <td class="center">${table.lost}</td>
                            <td class="center">${table.goalsFor} : ${table.goalsAgainst}</td>
                            <td class="center">${table.points}</td>
                          </tr>
              `;
        });
        
        tabs2HTML +=`
        </tbody>
        </table></div>`;
        document.getElementById("type").innerHTML = tabs2HTML;
        
      });

      // Sisipkan komponen card ke dalam elemen dengan id #content
      var el = document.querySelector('.tabs');
      var instance = M.Tabs.init(el, {});
    })
    .catch(error);
}