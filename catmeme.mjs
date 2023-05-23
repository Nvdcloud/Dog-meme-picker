import { catsData } from "./data.mjs";
const emotionRadios = document.getElementById("emotion-radios")


function highlightOption(event){
    // const radios = document.getElementsByClassName("radio")
    // for(let radio of radios){
        
    // }

    const clickedElement = document.getElementById(event.target)
    console.log(clickedElement)
}

  

function getCatEmotions(){
    const CAT_EMOTIONS = []
    for (let cat of catsData){
        for(let emotion of cat.emotionTags)
            if(!CAT_EMOTIONS.includes(emotion)){
            CAT_EMOTIONS.push(emotion)
            }
    }
    return CAT_EMOTIONS
}

function renderRadios(){
    const emotions = getCatEmotions()
    let radioStr = ``
    for (let emotion of emotions){
        radioStr += `
        <div class="radio">
        <label for="${emotion}">${emotion}</label>
        <input type="radio" name="emotions" value="${emotion}" id="${emotion}">
        </div>
    `
    }
    emotionRadios.innerHTML = radioStr
}

renderRadios()
highlightOption(event)
