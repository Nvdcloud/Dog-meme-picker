import { catsData } from "./data.mjs";

const emotionRadios = document.getElementById("emotion-radios")
const getImageBtn = document.getElementById("get-image-btn")
const gifsOnlyOption = document.getElementById("gifs-only-option")
const modalClostBtn = document.getElementById("meme-modal-close-btn")
const memeModal = document.getElementById("meme-modal")
const memeModalInner = document.getElementById("meme-modal-inner")

emotionRadios.addEventListener("change", highlightOption)
getImageBtn.addEventListener("click", renderMemeCat)




//'hides' the modal display when clicked. 
modalClostBtn.addEventListener("click", function(){
    memeModal.style.display = "none"
})

//acknowledges selected emotion in radio and links to the cat array 

function getMatchingCat(){
        if(document.querySelector("input[type='radio']:checked")){
            const selectedEmotion = document.querySelector("input[type='radio']:checked").value
            const isGif = gifsOnlyOption.checked
    
            const selectedCat = catsData.filter(function(cat){
                if(isGif){
                    return cat.emotionTags.includes(selectedEmotion) && cat.isGif
                } else {
                    return cat.emotionTags.includes(selectedEmotion)
                }
            })
            return selectedCat
        }
            
    }
    

function getSingleCatObject(){
    const singleCat = getMatchingCat()

    if(singleCat.length === 1){
        return singleCat[0]
    } else {
      let randomNumber = Math.floor(Math.random() * singleCat.length)
        return singleCat[randomNumber]
    }
}

function renderMemeCat(){
    const renderCat = getSingleCatObject()
    memeModalInner.innerHTML = `
    <img class="cat-img" src="./images/${renderCat.image}" alt="${renderCat.alt}">
    
    `
    memeModal.style.display = "flex"
}

//function that adds and remove a CSS property to the selected target
function highlightOption(event){
    const radioSelect = document.getElementsByClassName("radio")
    const classList = document.getElementById(event.target.id)
        for(let selection of radioSelect){
            selection.classList.remove("highlight")
        }

   
   classList.parentElement.classList.add("highlight")
}


//function that pulls in array and makes a new array based on emotionTags
function getCatEmotions(cats){
    const emotionArray = []
    for(let cat of cats){
        for(let emotion of cat.emotionTags){
            if(!emotionArray.includes(emotion)){
                emotionArray.push(emotion)
            }
        }
    }
    return emotionArray
}


// code which pulls in a filtered array and then targets an attribute within the object to be presented in the document.
function renderEmotionRadio(cats){
    const emotionRadio = getCatEmotions(cats)
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

renderEmotionRadio(catsData)
getMatchingCat()