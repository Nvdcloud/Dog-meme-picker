import { catsData } from "./data.mjs";
const emotionRadios = document.getElementById("emotion-radios")


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
    let emotionOptions = getCatEmotions()
    emotionRadios.innerHTML += `
        <div class="radios">${emotionOptions}</div>
    `

}

renderRadios()

