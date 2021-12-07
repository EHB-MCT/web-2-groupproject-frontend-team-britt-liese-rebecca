"use strict"

let verwijder = document.getElementsByClassName('delete');
let verander = document.getElementsByClassName('edit');
document.getElementById('editblock').style.display = "none"

setInterval(displayAll, 1000)
document.getElementById('form').addEventListener('submit', e => {
    e.preventDefault();
    newChallenge();
})

//Display all existing challenges
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
                            <p>course: ${challenge.course}</p>
                            <p>points: ${challenge.points}</p>
                            <p>session: ${challenge.session}</p>
                        </div>
                        <div id="change">
                            <button id="delete" class="delete" value="${challenge._id}" >delete</button>
                            <button id="edit" class="edit" value="${challenge._id}" >change</button>
                        </div>
                    </article>`
            })
            challenge.innerHTML = htmlString
            //Eventlisteners for delete
            for (let i = 0; i < verwijder.length; i++) {
                verwijder[i].addEventListener('click', e => {
                    e.preventDefault();
                    let id = document.getElementById('delete').value;
                    deleteChallenge(id);
                })
            }
            //Eventlisteners for change
            for (let i = 0; i < verander.length; i++) {
                verander[i].addEventListener('click', e => {
                    e.preventDefault();
                    let id = document.getElementById('edit').value;
                    editChallenge(id);
                })
            }
        });
}

//Add a new challenge
function newChallenge() {
    //get form values
    let name = document.getElementById('name').value;
    let points = document.getElementById('points').value;
    let course = document.getElementById('course').value;
    let session = document.getElementById('session').value;

    let challenge = {
        name,
        points,
        course,
        session
    }
    //post user created challenge
    fetch('https://teambritt.herokuapp.com/challenges', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(challenge)
        })
        .then(response => response.json())
        .then(data => {
            console.log('challenge made', data);
        });
}

//To change an existing challenge
function deleteChallenge(id) {
    //Delete selected object
    fetch(`https://teambritt.herokuapp.com/challenges/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            console.log(`challenge deleted with id: ${id}`, data);
        });
}

//To change an existing challenge
function editChallenge(id) {
    document.getElementById('editblock').style.display = "";


    document.getElementById('editForm').addEventListener('submit', function (e) {
        e.preventDefault();
        let name = document.getElementById('editName').value
        let points = document.getElementById('editPoints').value
        let course = document.getElementById('editCourse').value
        let session = document.getElementById('editSession').value

        let challenge = {
            name,
            points,
            course,
            session
        }
        //post user created challenge
        fetch(`https://teambritt.herokuapp.com/challenges/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(challenge)
            })
            .then(response => response.json())
            .then(data => {
                console.log('challenge changed', data);
            });
    });
}