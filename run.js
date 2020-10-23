writingSystem = ""
language = ""
letterInQuestion = ""
itemType = ""
itemContent = ""
levelNumber = 0
levelSequence = 0
score = 0
currentLevel = []
theseLetters = []
previousLetters = []

function scriptsRender() {
    Hempty("scripts")
    Happend("scripts", "<h1 class='choose' id='chooseWriting'>Choose your writing system:</h1>")
    for(x of Object.keys(scripts)) {
        Happend("scripts", `
        <div class="ascript script ${scripts[x].comingSoon ? 'soon': 'now'}" id="${x}">
            <h1>${x.charAt(0).toUpperCase() + x.slice(1)} ${scripts[x].comingSoon ? `- In Dev` : ``}</h1>
            <h2>Users: ~${scripts[x].users.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</h2>
            <h2>Locations: ${scripts[x].location.join(", ")}</h2>
            <h2>Languages: ${scripts[x].languages.join(", ")}</h2>
            <h2>Difficulty: ${scripts[x].difficulty}/5</h2>
            <img src="images/${x}.jpg">
        </div>`)
    }
}

function languagesRender() {
    Hhide("scripts")
    Hempty("languages")
    Hshow("languages")
    Happend("languages", "<h1 class='choose' id='chooseLanguage'>Choose your language:</h1>")
    for(x of Object.keys(scripts[writingSystem].langs)) {
        Happend("languages", `
        <div class="alanguage script" id="${x}">
            <h1>${x.charAt(0).toUpperCase() + x.slice(1)}</h1>
            <h2>Users: ~${scripts[writingSystem].langs[x].users.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</h2>
            <h2>Locations: ${scripts[writingSystem].langs[x].location.join(", ")}</h2>
            <img src="images/${x}.jpg">
        </div>`)
    }
}

function levelRender() {
    Hhide(["languages", "scripts"])
    Hshow("level")
    title = Object.keys(scripts[writingSystem].langs).length > 1 ? language : writingSystem
    Hempty("level")
    Happend("level", `
    <h1 id="leveltitle" class="title">${title.charAt(0).toUpperCase() + title.slice(1)} Levels</h1>
    <h2 class="subtitle" id="description">${scripts[writingSystem].info}</p>
    ${scripts[writingSystem].langs[language].info != undefined ? `<h2 class="subtitle" id="description">${scripts[writingSystem].langs[language].info}</p>` : ``}
    <div id="levels">
        ${[...Array(scripts[writingSystem].langs[language].levelList.length).keys()].map(x => x+1).map(x => `<div class="level ${colorLevel(x)}">${x}</div>`).join("")}
    </div>`)
    function colorLevel(z) {
        levelnum = +localStorage.getItem(language)
        if(z > levelnum) return "locked"
        else if(z == levelnum) return "next"
        else return "complete next"
    }
}

function lessonRender(item) {
    itemType = item.slice(0, 3)
    itemContent = item.slice(3, item.length)
    Hempty("lesson")
    switch(itemType){
        case "ltr":
            trnslt = scripts[writingSystem].langs[language].alphabet[itemContent]
            Happend("lesson", `
            <h1 id="theLetter">${presentLetter(itemContent)}</h1>
            ${/*scripts[writingSystem].bicameral ? `<p class="classification">forms:</p>
    <p class="form">${formLetter(itemContent)}</p>` : ``*/``}
            <p class="classification">transliteration:</p>
            <p class="transliteration">${trnslt == "" ? "(silent)" : trnslt}</p>
            ${scripts[writingSystem].langs[language].transliteration_explanations[itemContent] != undefined ? `<p id="description">${scripts[writingSystem].langs[language].transliteration_explanations[itemContent]}</p>`: ``}
            ${goToIPA(trnslt) !== "" ? `<p class="classification">sound:</p>
            ${trnslt.split(",").map(c => `<p class="sound">${ipa[goToIPA(c)].replace(/\[/g, "<span class='sounds'>").replace(/\]/g, "</span>")}</p>`).join(" ")}
            <p>${trnslt.split(",").map(c => `<span class="listen" id="sound_${goToIPA(c)}">[click to listen]</span>`)}</p>`: ``}
            <button id="result" class="true">Click here to continue...</button>`)
            break
        case "snd":
            if(levelNumber > 0) alf = (previousLetters.concat(theseLetters)).map(x => scripts[writingSystem].langs[language].alphabet[x])
            else alf = theseLetters.map(x => scripts[writingSystem].langs[language].alphabet[x])
            x = Math.random()
            if(x > 0.5){
                arr = Object.values(alf)
                arr.splice(Object.values(alf).indexOf(scripts[writingSystem].langs[language].alphabet[itemContent]), 1)
                letterInQuestion = arr[Math.floor(Math.random() * arr.length)]
            }
            else letterInQuestion = (scripts[writingSystem].langs[language].alphabet[itemContent])
            Happend("lesson", `
            <h2 class="title">Does <span style="color:#b58900">${itemContent}</span>  make the <span class="sounds">${letterInQuestion}</span> sound?</h2>
            <button class="tf" id="t">Yes!</button><button class="tf" id="f">No!</button>`)
            break
        case "tlt":
        case "wrd":
            Happend("lesson", `
            <h2 class="title">Transliterate this ${itemType == "tlt" ? "letter" : "word"}:</h1>
            <h2 class="word title">${itemContent}</h2>
            <input id="input"></input>
            <div id="specialLetters">
            ${scripts[writingSystem].langs[language].specialLetters.map(x => `<button class="specialLettersButton">${x}</button>`).join(" ")}
            </div>
            <button id="enter">Enter</button>`)
            break
        case "tip":
            Happend("lesson", `
            <h2 class="title">Tip:</h1>
            <h2 class="subtitle">${itemContent}</h2>
            <button id="result" class="true">Click here to continue...</button></input>`)
            break
        case "fin":
            if(score > 0){
                Happend("lesson", `<p class="subtitle" style="color:#859900">Your score is ${score}!</p>
                <button id="result" class="true">Click here to finish</button></input>`)
                if(+localStorage.getItem(language) - 1 == levelNumber) localStorage.setItem(language, "" + (+localStorage.getItem(language) + 1))
            }
            else{
                Happend("lesson", `<p class="subtitle" style="color:#dc322f">Your score is ${score}!</p>
                <button id="result" class="false">Click here to finish</button></input>`)
            }
    }
}

document.addEventListener('DOMContentLoaded',
    function(){
        scriptsRender()
    }, 
false);

for(x of Object.keys(scripts)){
    for(y of Object.keys(scripts[x].langs)){
        if(localStorage.getItem(y) === null)  localStorage.setItem(y, "1")
    }
}


function shuffle(array) {
    return array.sort(() => Math.random() - 0.5)
}


function goToIPA(letter){
    if(scripts[writingSystem].langs[language].toIPA.hasOwnProperty(letter))  return scripts[writingSystem].langs[language].toIPA[letter]
    else return letter
}

function formLetter(letter){
    if(letter == "ς") return `Σ [<span class="formname">uppercase</span>], σ [<span class="formname">medial</span>], ς [<span class="formname">final</span>]`
    else if(letter.length > 1 || letter == "և") return `${letter} [<span class="formname">digraph</span>]`
    else return `${letter.toUpperCase()} [<span class="formname">uppercase</span>], ${letter} [<span class="formname">lowercase</span>]`
}

function transliterate(word){
    word = word.split("")
    returnword = []
    switch(writingSystem){
        case "hebrew":
            word = word.join("")
            .replace(/בּ/g, "b")
            .replace(/כּ/g, "k")
            .replace(/פּ/g, "p")
            .replace(/שׁ/g, "sh")
            .replace(/שׂ/g, "s")
            .replace(/וּ/g, "o")
            .replace(/וֹ/g, "u")
            .replace(/ְ/g, "")
            .replace(/ֱ/g, "e")
            .replace(/ֲ/g, "a")
            .replace(/ֳ/g, "o")
            .replace(/ִ/g, "i")
            .replace(/ֵ/g, "e")
            .replace(/ֶ/g, "e")
            .replace(/ַ/g, "a")
            .replace(/ָ/g, "a")
            .replace(/ֻ/g, "u")
            .replace(/ֹ/g, "o")
            .split("")
            for(var x of word) returnword.push(scripts[writingSystem].langs[language].alphabet[x])
            break
        case "tifinagh":
            for(var x of word) returnword.push(scripts[writingSystem].langs[language].alphabet[x])
            break
        case "cyrillic":
            for (const [i, x] of word.entries()) {      
                if("еёюя".includes(x) && language == "russian"){
                    if(i == 0 || "аеёийуъыьэюя".includes(word[i-1])) returnword.push(scripts[writingSystem].langs[language].alphabet[x].split(",")[0])
                    else returnword.push(scripts[writingSystem].langs[language].alphabet[x].split(",")[1])
                }
                else returnword.push(scripts[writingSystem].langs[language].alphabet[x])
            }
            break
        case "armenian":
            word = word.join("").replace(/ու/g, "u").split("")
            for (const [i, x] of word.entries()) {      
                if("եոև".includes(x)){
                    if(i == 0) returnword.push(scripts[writingSystem].langs[language].alphabet[x].split(",")[0])
                    else returnword.push(scripts[writingSystem].langs[language].alphabet[x].split(",")[1])
                }
                else if(x == "u") returnword.push("u")
                else returnword.push(scripts[writingSystem].langs[language].alphabet[x])
            }
            break
        case "georgian":
            for(var x of word) returnword.push(scripts[writingSystem].langs[language].alphabet[x])
            break
        case "arabic": //incomplete: more research needed
            for(var x of word) returnword.push(scripts[writingSystem].langs[language].alphabet[x])
            break
        case "greek":
            word = word.join("")
            .replace(/ά/g, "α")
            .replace(/έ/g, "ε")
            .replace(/ή/g, "η")
            .replace(/ί/g, "ι")
            .replace(/ό/g, "ο")
            .replace(/ύ/g, "υ")
            .replace(/ώ/g, "ω")
            .replace(/αι/g, "e")
            .replace(/ει/g, "i")
            .replace(/οι/g, "i")
            .replace(/υι/g, "i")
            .replace(/ου/g, "u")
            .replace(/τζ/g, "dz")
            .replace(/γγ/g, "ng")
            .replace(/γκ/g, "ng")
            .replace(/αυ/g, "af")
            .replace(/ευ/g, "ef")
            .replace(/ντ/g, "d")
            .replace(/μπ/g, "b")
            .split("")
            for(var x of word) returnword.push(scripts[writingSystem].langs[language].alphabet[x])
            break
    }
    return returnword.join("")
}

function presentLetter(letter){
    if(letter == "ς") return "Σσς"
    else if(letter.length > 1 || !scripts[writingSystem].bicameral || letter == "և") return letter
    else return letter.toUpperCase() + letter
}

function Hhide(id){
    if(typeof id == "object"){
        for(var x of id) document.getElementById(x).style.display = 'none'
    }
    else document.getElementById(id).style.display = 'none'
}
function Hshow(id){
    document.getElementById(id).style.display = 'initial'
}

function Hempty(id){
    id = document.getElementById(id)
    while(id.firstChild) id.removeChild(id.firstChild)
}

function Hremove(id){
    id = document.getElementById(id)
    id.parentNode.removeChild(id)
}

function Happend(id, html){
    document.getElementById(id).insertAdjacentHTML('beforeend', html)
}