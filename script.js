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
            let challenge = document.getElementById('challengeBlock')
            let htmlString = ""

            //displaying all data
            data.forEach(challenge => {
                htmlString +=
                    `<article id="card">
                       
                            <h3>${challenge.name}</h3>
                        
                        <div id="info">
                            <p>${challenge.course}</p>
                            <p>${challenge.points}</p>
                            <p>${challenge.session}</p>
                        </div>
                        <div id="change">
                            <p id="delete">delete</p>
                            <p id="change">change</p>
                        </div>
                    </article>`
            })
            challenge.innerHTML = htmlString
        });
}

function newChallenge() {
    //get form values
    let name = document.getElementById('name').value;
    let points = document.getElementById('points').value;
    let course = document.getElementById('course').value;
    let session = document.getElementById('session').value;
    //post user created challenge
    fetch('https://teambritt.herokuapp.com/saveData', {
            method: 'POST',
            body: JSON.stringify({
                name,
                points,
                course,
                session
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('challenge made', data);
        });
    //display new challenge with all challenges
    displayAll();
}