// On the page, there is a div with the id of "dog-bar". On page load, make a fetch to get all of the pup objects. When you have this information, you'll need to add a span with the pup's name to the dog bar (ex: <span>Mr. Bonkers</span>).

const url = `http://localhost:3000/pups`
const dogBar = document.querySelector('#dog-bar')

function displayPups(){
    fetch(url)
    .then(res => res.json())
    .then(pupsArray => {
        pupsArray.forEach(pup => renderPupBar(pup))
    })
    
    
}

function renderPupBar(pup){
    const dogBarInfo = document.createElement('span')
    dogBarInfo.dataset.id = pup.id
    dogBarInfo.className = 'dog-name'
    dogBarInfo.innerText = `${pup.name}`
    dogBar.append(dogBarInfo)
}

dogBar.addEventListener('click', showMorePupInfo)

function showMorePupInfo(e){
    const dogId = e.target.closest('span.dog-name')
    const dogInfo = document.querySelector('#dog-info')
    if (e.target.className === 'dog-name'){
        fetch(url + '/' + (dogId.dataset.id))
        .then(res => res.json())
        .then(theDogYouClickedOn => {
            dogInfo.dataset.id = theDogYouClickedOn.id
            dogInfo.innerHTML= `
            <img src=${theDogYouClickedOn.image}>
                <h2>${theDogYouClickedOn.name}</h2>
                <button class="good-bad">${goodOrBadDog(theDogYouClickedOn)}</button>`
            })
        }
        
        
    }
    
    function goodOrBadDog(dog){
        if (dog.isGoodDog === true) {
            return "Good Dog!"
        } else {
    return "Bad Dog!"}
    
    
}
const dogSummary = document.querySelector('#dog-info')
dogSummary.addEventListener('click', clickManager)

function clickManager(e){
    if (e.target.className === "good-bad") {
        changeDogAlignment(e)
    }

}

function changeDogAlignment(e){
    const dogId = e.target.closest('div').dataset.id
    const dogThing = e.target.closest('div')
    const goodBad = dogThing.children[2].innerText
    const dogInfo = document.querySelector('#dog-info')
    let tOrF;
   
    if (goodBad === "Good Dog!"){
        tOrF = false
    fetch(url + '/' + (dogId), {
        method: "PATCH",
        headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({isGoodDog: tOrF})
})   
.then(res => res.json())
        .then(theDogYouClickedOn => {
            dogInfo.innerHTML= `
                <img src=${theDogYouClickedOn.image}>
                <h2>${theDogYouClickedOn.name}</h2>
                <button class="good-bad" >${goodOrBadDog(theDogYouClickedOn)}</button>`
        }) 
    } else if(goodBad === "Bad Dog!") {
        tOrF = true
        fetch(url + '/' + (dogId), {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({isGoodDog: tOrF})
        })   
            .then(res => res.json())
            .then(theDogYouClickedOn => {
                dogInfo.innerHTML= `
                    <img src=${theDogYouClickedOn.image}>
                    <h2>${theDogYouClickedOn.name}</h2>
                    <button class="good-bad">${goodOrBadDog(theDogYouClickedOn)}</button>`
            })
    }
        

   
    
}


displayPups()