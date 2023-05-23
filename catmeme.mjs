import { catsData } from "./data.mjs";

const emotionRadios = document.getElementById("emotion-radios")


emotionRadios.addEventListener("change", highlightOption)


function highlightOption(event){
    const radioSelect = document.getElementsByClassName("radio")
    const classList = document.getElementById(event.target.id)
        for(let selection of radioSelect){
            selection.classList.remove("highlight")
        }

   
   classList.parentElement.classList.add("highlight")
}

function getCatEmotions(){
    const emotionArray = []
    for(let cat of catsData){
        for(let emotion of cat.emotionTags){
            if(!emotionArray.includes(emotion)){
                emotionArray.push(emotion)
            }
        }
    }
    return emotionArray
}

function renderEmotionRadio(){
    const emotionRadio = getCatEmotions()
    let radioStr = ``
    for (let emotion of emotionRadio){
        radioStr += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input type="radio" name="emotions" id="${emotion}" value="${emotion}">
        </div>
        `
    }
     return emotionRadios.innerHTML = radioStr
}

renderEmotionRadio()