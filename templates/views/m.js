console.log('The live server is setup');

fetch('http:puzzle.mead.io/puzzle')
    .then((response) => {
        response.json().then((data) => {
            console.log(data)
        })
    })
