'use strict';
var steps = Array.from(document.querySelectorAll('.step')),
    contents = Array.from(document.querySelectorAll('.content')),
    inputs = Array.from(document.querySelectorAll('.input-answer')),
    modal = document.querySelector('.modal-container');

var addBtns = Array.from(document.querySelectorAll('.add-btn')),
    clearBtn = Array.from(document.querySelectorAll('.clear-btn')),
    nextBtn = document.querySelector('.next-btn'),
    backBtn = document.querySelector('.back-btn'),
    resetBtn = document.querySelector('.reset-btn'),
    noteBtn = document.querySelector('.note-btn'),
    closeBtn = document.querySelector('.close-btn'),
    currentStep = 0;

var q1 = document.querySelector('.q1'),
    q2 = document.querySelector('.q2'),
    q3 = document.querySelector('.q3');

var answers = {
    q1: [],
    q2: [],
    q3: [],
};

var errors = [];

// Functions
function updateContent(currentIndex){
    contents.forEach(function(content, index){
        if(currentIndex == index){
            if(!content.classList.contains('active')){
                content.classList.add('active');
            }
        }else{
            if(content.classList.contains('active')){
                content.classList.remove('active');
            }
        }
    });
}

function updateStep(currentIndex){
    if(currentIndex >= 1){
        if(currentIndex == 3){
            nextBtn.style.display = 'none';
            backBtn.style.display = 'none';
        }else{
            backBtn.style.display = 'inline-block';
        }
    }else{
        backBtn.style.display = 'none';
    }
    steps.forEach(function(step, index){
        if(index <= currentIndex){
            if(!step.classList.contains('active')){
                step.classList.add('active');
            }
        }else{
            if(step.classList.contains('active')){
                step.classList.remove('active');
            }
        }
    });
}

function onAddClick(e){
    let btns = e.target.parentElement,
        input  = btns.parentElement.querySelector('input'),
        question = input.getAttribute("name"),
        errorDiv = btns.parentElement.querySelector('.error-text'),
        answerList = btns.parentElement.querySelector('.answers');
    try {
        
        if(input.value == ''){
            throw "Try to come up with an assumption. It can be anything. You can do it! :)";
        }

        if(answers[question].length >= 3){
            input.value = '';
            throw "You are assuming too many. Try to pick just a few :)";
        }

        answers[question].push(input.value);

        let answer = document.createElement('p');
        answer.innerText = input.value;
        answerList.appendChild(answer);
        input.value = '';
    } catch (err) {
        errors.push(err);
        let errorText = document.createElement('p');
        errorText.innerText = errors.shift();
        errorDiv.appendChild(errorText);
        setTimeout(function(){ errorDiv.removeChild(errorDiv.firstChild); }, 4500);
    }
}

function onClearClick(e){
    let btns = e.target.parentElement,
        input  = btns.parentElement.querySelector('input'),
        question = input.getAttribute("name"),
        answerList = btns.parentElement.querySelector('.answers');
    input.value = '';
    answers[question] = [];
    answerList.innerHTML = '';
}

function pressEnterKey(e){
    if(e.keyCode == 13){
        let label = e.target.parentElement,
            addBtn = label.parentElement.querySelector('.add-btn');
        addBtn.click();
    }
}

function appendAnswers(ansArr, el){
    if(ansArr.length == 0){
        let h5 = document.createElement('h5');
        h5.innerText = 'Nothing... Really?';
        el.appendChild(h5);
    }else{
        ansArr.forEach(function(ans){
            let p = document.createElement('p');
            p.innerText = ans;
            el.appendChild(p); 
        });
    }
}

// Event Listener
inputs.forEach(function(input){
    input.addEventListener('keyup', pressEnterKey);
});

addBtns.forEach(function(btn){
    btn.addEventListener('click', onAddClick);
});

clearBtn.forEach(function(btn){
    btn.addEventListener('click', onClearClick);
});

nextBtn.addEventListener('click', function(e){
    if(currentStep < 3){
        currentStep++;
        updateStep(currentStep);
        updateContent(currentStep);
    }
});

backBtn.addEventListener('click', function(e){
    if(currentStep > 0){
        currentStep--;
        updateStep(currentStep);
        updateContent(currentStep);
    }
});


noteBtn.addEventListener('click', function(){
    modal.classList.add('active');
    if(q1.childNodes.length == 0){
        appendAnswers(answers['q1'], q1);
    }
    if(q2.childNodes.length == 0){
        appendAnswers(answers['q2'], q2);
    }
    if(q3.childNodes.length == 0){
        appendAnswers(answers['q3'], q3);
    }
    modal.style.width = `${window.innerWidth}px`;
    modal.style.height = `${window.innerHeight}px`;
});

closeBtn.addEventListener('click', function(){
    modal.classList.remove('active');
});

resetBtn.addEventListener('click', function(){ window.location.reload(); });

window.addEventListener('click', function(e){
    let targ = e.target;
    if(targ.classList.contains('modal-container') && targ.classList.contains('active')){
        targ.classList.remove('active');
    }
});

window.addEventListener('resize', function(){
    modal.style.width = `${window.innerWidth}px`;
    modal.style.height = `${window.innerHeight}px`;
});