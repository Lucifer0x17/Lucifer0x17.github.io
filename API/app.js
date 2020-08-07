let rellax = new Rellax('');
// document.querySelector(".container-2").style.display = "none";
// document.querySelector(".container").style.display = "block";

document.querySelector('.form-group').addEventListener('submit' , e => {
    e.preventDefault();

    document.querySelector(".container-2").style.display = "none";
    document.querySelector(".container-1").style.display = "block";


    const user = document.getElementById("user").value;


    async function data(user){
       const res = await fetch(`https://api.github.com/users/${user}`);
       const data = await res.json();
       return data;
    }

    data(user)
        .then(user => {
            if (`${user.login}` === "null" || `${user.login}` === "undefined")
            {
              alert("Invalid User");
            }
            else
            {
                document.querySelector(".container-1").style.display = "none";
                document.querySelector(".container").style.display = "block";
                document.querySelector("#pic").setAttribute("src", user.avatar_url);
                document.querySelector('#name').innerHTML = user.name;
                document.querySelector('#username').innerHTML = `@${user.login}`;
                const joined = new Date(user.created_at).toDateString();
                document.querySelector(
                  "#joined"
                ).innerHTML = `<i class="far fa-calendar-alt"></i> joined ${joined}`;
                document.getElementById('1').innerHTML = user.public_repos;
                document.getElementById('2').innerHTML = user.followers;
                document.getElementById('3').innerHTML = user.following;
            }
        })
    .catch(error => {
        console.log(error);
        setTimeout(() => {
            document.querySelector(".container-1").style.display = "none"; 
            alert(error);
            document.querySelector(".container-2").style.display = "inline-block";
        }, 4000);
    });

    let html = 0, jS = 0, other = 0, htmlStar = 0, jSStar = 0, otherStar = 0, repos = [], repoStars = [], ind1 = 0, ind2 = 0;

    async function chartData(user) {
      const res = await fetch(`https://api.github.com/users/${user}/repos`);
      const chartData = await res.json();
      return chartData;
    }
    chartData(user)
        .then(repoDetails => {
            // console.log(repoDetails);
            repoDetails.forEach(repo => {
                repos.push(repo.name);
                repoStars.push(repo.stargazers_count);

                if (repo.language === "HTML") {
                  html++;
                  if (repo.stargazers_count !== 0) {
                    htmlStar += repo.stargazers_count;
                  }
                } else if (repo.language === "JavaScript") {
                  jS++;
                  if (repo.stargazers_count !== 0) {
                    jSStar += repo.stargazers_count;
                  }
                }else {
                  other++;
                  if (repo.stargazers_count !== 0) {
                    otherStar += repo.stargazers_count;
                  }
                }
            });
            
            let ctx = document.getElementById('Top-lang').getContext("2d");
            let myChart = new Chart(ctx, {
              type: "polarArea",
              data: {
                labels: ["HTML", "JavaScript",  "Others"],
                datasets: [
                  {
                    data: [html , jS , other],
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.4)",
                      "rgba(54, 162, 235, 0.4)",
                      "rgba(255, 206, 86, 0.4)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            fontColor : 'black'
                        }
                    },
              },
            });
            let ctx1 = document.getElementById('Most-starred').getContext("2d");
            let myChart1 = new Chart(ctx1, {
              type: "bar",
              data: {
                labels: repos,
                datasets: [
                  {
                    data: repoStars,
                    backgroundColor: [
                      "rgba(255, 206, 86, 0.4)",
                      "rgba(255, 206, 86, 0.4)",
                      "rgba(255, 206, 86, 0.4)",
                      "rgba(255, 206, 86, 0.4)",
                      "rgba(255, 206, 86, 0.4)",
                      "rgba(255, 206, 86, 0.4)",
                      "rgba(255, 206, 86, 0.4)",
                      "rgba(255, 206, 86, 0.4)",
                      "rgba(255, 206, 86, 0.4)",
                      "rgba(255, 206, 86, 0.4)",
                    ],
                    borderColor: [
                      "rgba(255, 206, 86, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(255, 206, 86, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                legend: {
                  display: false,
                  position: "right",
                  labels: {
                    fontColor: "black",
                  },
                },
              },
            });
            let ctx2 = document.getElementById('Stars-per-lang').getContext("2d");
            let myChart2 = new Chart(ctx2, {
              type: "pie",
              data: {
                labels: ["HTML", "JavaScript", "Others"],
                datasets: [
                  {
                    data: [htmlStar, jSStar, otherStar],
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.4)",
                      "rgba(54, 162, 235, 0.4)",
                      "rgba(255, 206, 86, 0.4)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                legend: {
                  display: true,
                  position: "right",
                  labels: {
                    fontColor: "black",
                  },
                },
              },
            });

            let temp = repoStars.map((repo) => repo);
            temp.sort();
            temp.reverse();
            repoStars.forEach((repo, index) => {
              if (temp[0] === repo) {
                ind1 = index;
              }
              if (temp[1] === repo) {
                ind2 = index;
              }
            });
            document.getElementById("repo-1").textContent = repos[ind1];
            document.getElementById("repo-2").textContent = repos[ind2];
            repoDetails.forEach(repo => {
                if(repo.name === repos[ind1])
                {
                    document.getElementById("repo-1").setAttribute('href' , repo.clone_url);
                    document.getElementById("readme1").innerHTML = `${
                      repo.description
                    }<div class="pdt"><i class="fa fa-circle" style="color:orangered;"></i>
                    ${repo.language}
                    </div>
                        <div class="pdt"><i class="fa fa-star-o"></i> 
                        ${repo.stargazers_count}
                        </div>
                        <div class="pdt"><i class="fa fa-code-fork"></i>
                          ${repo.forks_count}
                        </div>
                        <div class="pdt">Updated on 
                        ${new Date(repo.updated_at).toDateString()}
                        </div>
                        <div class="pdt">
                        ${repo.size}Kb</div>`;
                }
                if(repo.name === repos[ind2])
                {
                    document.getElementById("repo-2").setAttribute('href' , repo.clone_url);
                    document.getElementById("readme2").innerHTML = `${
                      repo.description
                    }<div class="pdt"><i class="fa fa-circle" style="color:orangered;"></i>
                    ${repo.language}
                    </div>
                        <div class="pdt"><i class="fa fa-star-o"></i> 
                        ${repo.stargazers_count}
                        </div>
                        <div class="pdt"><i class="fa fa-code-fork"></i>
                          ${repo.forks_count}
                        </div>
                        <div class="pdt">Updated on 
                        ${new Date(repo.updated_at).toDateString()}
                        </div>
                        <div class="pdt">
                        ${repo.size}Kb</div>`;
                }
            });
        })
    .catch(error => console.log(error));
});