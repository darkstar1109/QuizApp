let fetchBtn = document.getElementById("start-button");
document.getElementById("loader-view").style.display = "none"
document.getElementById("quiz").style.display = "none";
fetchBtn.addEventListener("click", buttoneventlistener)
let submitBtn = document.getElementById("submit-button")
submitBtn.setAttribute("disabled", "false")


let flag = true;
let count = 1 ;

function buttoneventlistener() {
  document.getElementById("start-button").style.display = "none"
  document.getElementById("pre-quiz-instructions").style.display = "none";
  document.getElementById("loader-view").style.display = "block"
  optionsCreator(0)
  document.getElementById("submit-button").addEventListener("click", submitListener)
}

 async function optionsCreator(questionid){
  // let questionid = Math.floor(Math.random() * (6 - 0) + 1) - 1
  let apidata =   await fetch(`https://jsonmock.hackerrank.com/api/questions/${questionid}`)
  apidata =   await apidata.json()
  apidataGlobal = JSON.parse(JSON.stringify(apidata));
  document.getElementById("quiz").style.display = "block"
  document.getElementById("loader-view").style.display = "none"
  let quest = apidataGlobal.data.question
  document.getElementById('question').innerText = apidataGlobal.data.question;
  let optionsContainer = document.getElementById("options-container")
  while (optionsContainer.firstChild) {
    optionsContainer.removeChild(optionsContainer.firstChild);
  }
  var options = apidataGlobal.data.options;
  options.map((option) => {
    let optionHtml = document.createElement("div")
    optionHtml.addEventListener("click", optionEventListerner)
    optionHtml.innerText = option
    optionsContainer.appendChild(optionHtml)
            })
          
        }


function optionEventListerner(e) {
  let submitBtn = document.getElementById("submit-button")
  if(flag == true){
   flag = false 
   submitBtn.disabled = false 
  }
  let children = document.getElementById("options-container").children
  for (child of children) {
    child.classList.remove('user-answer')
  }
  e.target.classList.add('user-answer')
}

// document.getElementById("submit-button").addEventListener("click", submitListener)
function submitListener() {
  let i = -1
  let children = document.getElementById("options-container").children
  let vr = apidataGlobal.data.answer
  for (child of children) {
    i += 1
    if (apidataGlobal.data.answer == i) {
      child.classList.add("correct-answer")
    }
    if (child.classList.contains('user-answer')) {
      if (apidataGlobal.data.answer != i) {
        child.classList.add("wrong-answer")
      }
    }
  }
  
  document.getElementById("submit-button").disabled = true;
  flag = true

  if(count<5){
        optionsCreator(count)
  }
  count = count+1;

  
  }

function waitListener(){
  
}



 