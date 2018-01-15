function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'questions.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);  
}

function createSection(id, questions){

    let anchor = document.createElement('a');
    anchor.name = "section" + id;

    let section = document.createElement('section');
    section.className = "section" + id;
    
    let heading = document.createElement('div');
    heading.className = "section-heading";
    heading.innerHTML = "Section " + id;
    
    let content = document.createElement('div');
    content.className = "section-content";

    let question_list = document.createElement('ul');
    question_list.className = "list-of-questions";

    for(var i = 0; i < questions.length; i++){
        let question = document.createElement('li');
        let question_content = document.createElement('span');
        question_content.innerHTML = questions[i];
        question_content.className = "link";
        question.appendChild(question_content);
        question_list.appendChild(question);
    }
    
    let back = document.createElement('a');
    back.href = "#top";
    back.className = "back";
    back.innerHTML = "Back to top";

    content.appendChild(anchor);
    content.appendChild(question_list);
    section.appendChild(heading);
    section.appendChild(content);
    content.appendChild(back);

    return section;
}

function render(){
    loadJSON(function(response){
        let json = JSON.parse(response);
        let content = document.getElementsByClassName("content")[0];
    
        for(let section = 0; section < json.sections.length; section++){
            let s = createSection(json.sections[section].id, json.sections[section].question);
            content.appendChild(s);        
            content.appendChild(document.createElement('hr'));
        }
    
    });
}

render();
