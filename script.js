"use strict"

window.onload = function () {
    displayAll();

    document.getElementById('form').addEventListener('submit', e => {
        e.preventDefault();
        newChallenge();
    })
}

function displayAll() {
    //fetching all challenges
    fetch('https://teambritt.herokuapp.com/challenges')
        .then(response => response.json())
        .then(function (data) {
            console.log(data);
            let challenge = document.getElementById('challengeBlock')
            let htmlString = ""

            //displaying all data
            data.forEach(challenge => {
                htmlString +=
                    `<article id="card">
                        <div>
                            <h3>${challenge.name}</h3>
                        </div>
                        <div id="info">
                            <p>${challenge.course}</p>
                            <p>${challenge.points}</p>
                            <p>${challenge.session}</p>
                        </div>
                    </article>`
            })
            challenge.innerHTML = htmlString
        });
}

/*
function newChallenge() {
    //post user created challenge
    fetch(`url`)
        .then(response => response.json())
        .then(function (data) {
            console.log(data)
        })
    //display new challenge with all challenges
    displayAll();
}*/