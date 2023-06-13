import { catsData } from "./data.mjs";

const emotionRadios = document.getElementById("emotion-radios")
const getImageBtn = document.getElementById("get-image-btn")
const gifsOnlyOption = document.getElementById("gifs-only-option")
const modalClostBtn = document.getElementById("meme-modal-close-btn")
const memeModal = document.getElementById("meme-modal")
const memeModalInner = document.getElementById("meme-modal-inner")
const memeOptions = document.getElementById("meme-options")
const memeOptionsBoxes = document.getElementById("meme-options-boxes")

emotionRadios.addEventListener("change", highlightOption)
getImageBtn.addEventListener("click", renderMemeCat)
getImageBtn.addEventListener("click", renderAlternativeCats)
memeOptionsBoxes.addEventListener("click", altSelection)



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

// return a single cat after filtering based on radio selected. 
    function getSingleCatObject(){
        const singleCat = getMatchingCat()
    
        if(singleCat.length === 1){
            return singleCat[0]
        } else {
          let randomNumber = Math.floor(Math.random() * singleCat.length)
            return singleCat[randomNumber]
        }
    }

//gets up to 3 alternative pic/gif options for rendering 
function getalternativeCat(){
    const altCatArray = []
    const alternativeCats = getMatchingCat()
        if(alternativeCats.length >= 2){
            for(let alterCat of alternativeCats){
            if(!altCatArray.includes(alterCat)){
                altCatArray.push(alterCat)
                
                }
            }
        } else if(alternativeCats.length >= 4){
            const shuffledCats = alternativeCats.splice()
            for(let i = shuffledCats.length - 1; i > 0; i--){
                const j = Math.floor(Math.random()* (i + 1))
               const randomCats = [shuffledCats[i], shuffledCats[j]] = [shuffledCats[j], shuffledCats[i]]
               const randomFour = shuffledCats.splice(0, 4)
               for(let four of randomFour){
                altCatArray.push(four)
               }
            }
        }
    
     return altCatArray.splice(0,4)

}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  


//function to render the random alternative cats
function renderAlternativeCats(){
    const renderCats = getalternativeCat()
    memeOptions.style.display = "flex"
    let addtionalOptions = ``
    for(let cats of renderCats){
        addtionalOptions += `
        <img class="cat-options-img" id="${cats.image}"src="./images/${cats.image}" alt="${cats.alt}">
        `
    }

    memeOptionsBoxes.innerHTML =  addtionalOptions
    

}



//render cat image/gif selected from previous function plus alt test. 
//Also need to change modal so that it 'appears'
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

// function that selects the alt memes and replaces the main pic
function altSelection(){
    const imgSelect = document.querySelectorAll(".meme-options-boxes img")
    for (let img of imgSelect){
         img.onclick = function(){
            memeModalInner.innerHTML = `
            <img class="cat-img" src="./images/${img.id}">
        
            `
         }
    }


    
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


        



   