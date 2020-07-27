var base_url = "https://api.football-data.org/v2/";
var token = "d93d4aef37974d35a2a45aa8b062f53f";

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error : " + error);
}

function getTeams() {
  if ("caches" in window) {
    caches.match(base_url + "competitions/2014/teams",{
      method: 'GET',
      headers: {
          'X-Auth-Token': token,
      }
    })
    .then(function(response) {
      if (response) {
        response.json().then(function(data) {
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
          document.getElementById("teams").innerHTML = teamsHTML;
        });
      }
    });
  }

  fetch(base_url + "competitions/2014/teams",{
    method: 'GET',
    headers: {
        'X-Auth-Token': token,
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
                            <a href="./team.html?id=${teams.id}">Detail</a>
                          </div>
                        </div>
                      </div>
            `;
      });
      document.getElementById("teams").innerHTML = teamsHTML;
    })
    .catch(error);
}

function getStandings() {
  if ("caches" in window) {
    caches.match(base_url + "competitions/2014/standings",{
      method: 'GET',
      headers: {
          'X-Auth-Token': token,
      }
    }).then(function(response) {
      if (response) {
        response.json().then(function(data) {
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
    
        });
        
      }
    });
  }
  
  fetch(base_url + "competitions/2014/standings",{
    method: 'GET',
    headers: {
        'X-Auth-Token': token,
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

function getTeamsById() {
  return new Promise(function(resolve, reject) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    
    fetch(base_url + "teams/" + idParam,{
      method: 'GET',
      headers: {
          'X-Auth-Token': token,
      }
    })
      .then(status)
      .then(json)
      .then(function(teams) {
        console.log(teams);
        var teamsHTML = `
            <div class="section">
            <div class="center container white-text">
              <br><br>
              <img class="responsive-img" width="20%" src="${teams.crestUrl}">
              <h1 class="header center ">${teams.name}</h1>
              <h5 class="header col s12 light">( ${teams.shortName} )</h5>
              <br>
              <table>
                  <tr>
                    <td>Address</td>
                    <td> : </td>
                    <td>${teams.address}</td>
                  </tr>
                  <tr>
                    <td>Website</td>
                    <td> : </td>
                    <td>${teams.website}</td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td> : </td>
                    <td>${teams.phone}</td>
                  </tr>
                  <tr>
                    <td>Founded</td>
                    <td> : </td>
                    <td>${teams.founded}</td>
                  </tr>
                  <tr>
                    <td>Club Colors</td>
                    <td> : </td>
                    <td>${teams.clubColors}</td>
                  </tr>
                  <tr>
                    <td>Venue</td>
                    <td> : </td>
                    <td>${teams.venue}</td>
                  </tr>
              </table>
              <br>
              <br>
              <h3 class="center"> Squad </h3>
              <br>
              <table>
                <thead>
                  <tr>
                      <th class="center">Name</th>
                      <th class="center">Position</th>
                      <th class="center">Shirt Number</th>
                  </tr>
                </thead>
        
                <tbody>
            `;
          
          teams.squad.forEach(function(squad) {
              if(squad.shirtNumber == null){
                  squad.shirtNumber = " ";
              } 
              if(squad.position == null){
                squad.position = " ";
            }            
              teamsHTML += `
              <tr>
                  <th>${squad.name}</th>
                  <th class="center">${squad.position}</th>
                  <th class="center">${squad.shirtNumber}</th>
              </tr>`
          });

          teamsHTML +=`
                </tbody>
              </table>
            </div>
          </div>`;
        
        document.getElementById("body-content").innerHTML = teamsHTML;
        resolve(teams);
      });
  });
}

function getFavouriteTeams() {
  getAll().then(function(teams) {
    console.log(teams);
    var teamsHTML = "";
    teams.forEach(function(teams) {
      teamsHTML += `
                    <div class="col s12 m3">
                    <div class="card blue-grey darken-3  white-text">
                      <br>
                      <p class="center"><b>${teams.name}</b></p>
                      <div class="card-image">
                        <img src="${teams.crestUrl}" class="reponsive-img" height="150px">
                      </div>
                      <div class="card-content">
                      </div>
                      <div class="card-action center">
                        <a href="./team.html?id=${teams.id}&saved=true">Detail</a>
                      </div>
                    </div>
                  </div>
                `;
      
    });
    document.getElementById("teams").innerHTML = teamsHTML;
  });
}

function getFavouritedTeamsById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = parseInt(urlParams.get("id"));
  
  console.log(idParam);

  getById(idParam).then(function(teams) {
    console.log(teams);
    var teamsHTML = '';
    teamsHTML += `
    <div class="section">
    <div class="center container white-text">
      <br><br>
      <img class="responsive-img" width="20%" src="${teams.crestUrl}">
      <h1 class="header center ">${teams.name}</h1>
      <h5 class="header col s12 light">( ${teams.shortName} )</h5>
      <br>
      <table>
          <tr>
            <td>Address</td>
            <td> : </td>
            <td>${teams.address}</td>
          </tr>
          <tr>
            <td>Website</td>
            <td> : </td>
            <td>${teams.website}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td> : </td>
            <td>${teams.phone}</td>
          </tr>
          <tr>
            <td>Founded</td>
            <td> : </td>
            <td>${teams.founded}</td>
          </tr>
          <tr>
            <td>Club Colors</td>
            <td> : </td>
            <td>${teams.clubColors}</td>
          </tr>
          <tr>
            <td>Venue</td>
            <td> : </td>
            <td>${teams.venue}</td>
          </tr>
      </table>
      <br>
      <br>
      <h3 class="center"> Squad </h3>
      <br>
      <table>
        <thead>
          <tr>
              <th class="center">Name</th>
              <th class="center">Position</th>
              <th class="center">Shirt Number</th>
          </tr>
        </thead>

        <tbody>
    `;
    teams.squad.forEach(function(squad) {
        if(squad.shirtNumber == null){
            squad.shirtNumber = " ";
        } 
        if(squad.position == null){
          squad.position = " ";
      }            
        teamsHTML += `
        <tr>
            <th>${squad.name}</th>
            <th class="center">${squad.position}</th>
            <th class="center">${squad.shirtNumber}</th>
        </tr>`
    });

    teamsHTML +=`
          </tbody>
        </table>
      </div>
    </div>`;
    document.getElementById("body-content").innerHTML = teamsHTML;
  });
}

function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.get(id);
      })
      .then(function(teams) {
        resolve(teams);
      });
  });
}