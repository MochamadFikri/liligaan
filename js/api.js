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

function getMatches() {
  fetch(base_url + "competitions/2014/matches?status=FINISHED",{
    method: 'GET',
    headers: {
        'X-Auth-Token': 'd93d4aef37974d35a2a45aa8b062f53f',
    }
  })
    .then(status)
    .then(json)
    .then(function(data) {
      var matchesHTML = "";
      data.matches.forEach(function(matches) {
        matchesHTML += `
              <div class="card">
                <div class="card-content">
                  <span class="card-title">${matches.awayTeam.name} ${matches.score.fullTime.awayTeam} VS ${matches.score.fullTime.homeTeam} ${matches.homeTeam.name}</span>
                </div>
              </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("matches").innerHTML = matchesHTML;
    })
    .catch(error);
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
        teamsHTML += `
              <div class="card">
                <div class="card-content">
                  <span class="card-title">${teams.name}</span>
                  <img width="100%" height="100%" src="${teams.crestUrl}">
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

        tabs2HTML += `<div id="${standings.type}">`;

        standings.table.forEach(function(table) {
          tabs2HTML +=`
                <div class="card blue-grey darken-3">
                  <div class="card-content white-text">
                      <p>${table.position} ${table.team.name}</p>
                  </div>
                </div>
              `;
        });
        
        tabs2HTML +=`</div>`;
        document.getElementById("type").innerHTML = tabs2HTML;
        
      });

      // Sisipkan komponen card ke dalam elemen dengan id #content
      var el = document.querySelector('.tabs');
      var instance = M.Tabs.init(el, {});
    })
    .catch(error);
}