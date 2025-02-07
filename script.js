document.addEventListener("DOMContentLoaded", function() {    
    let ulCont = document.getElementById("ulCont");
    let userinput = document.getElementById("userinput");
    let addbtn = document.getElementById("addbtn");
    let savebtn = document.getElementById("savebtn");

    

    function storageArea() {
        let stringified = localStorage.getItem("savedstorageitems");
        let parsedData = JSON.parse(stringified);
        if (parsedData === "") {
            return [];
        } else {
            return parsedData;
        }
    }
    
    let details = [];
    let listlength = details.length;
    console.log(details)
    
    function removelist(listid) {
        let confirmDelete = confirm("Are you sure you want to delete this task?");
        if (!confirmDelete) 
            return; // Exit if user cancels deletion
        
        let list = document.getElementById(listid);
        ulCont.removeChild(list);

        let itemindex = details.findIndex(function(each) {
            let eachitem = "list" + each.uniqueNo;
            if (listid === eachitem) {
                return true;
            } else {
                return false;
            }
        });
        details.splice(itemindex, 1);

        localStorage.setItem("savedstorageitems", JSON.stringify(details));

    }

    function performstrike(checkboxid, labelid) {
        let checkbox = document.getElementById(checkboxid);
        let label = document.getElementById(labelid);
        label.classList.toggle("strike");

        let itemindex = details.findIndex(function(each) {
            let eachitem = "checkbox" + each.uniqueNo;
            if (checkboxid === eachitem) {
                return true;
            } else {
                return false;
            }
        });
        let item = details[itemindex];
        if (item.is_checked === false) {
            item.is_checked = true;
        } else {
            item.is_checked = false;
        }

        localStorage.setItem("savedstorageitems", JSON.stringify(details));
    }

    function createandappend(todo) {
        let listid = "list" + todo.uniqueNo;
        let checkboxid = "checkbox" + todo.uniqueNo;
        let labelid = "label" + todo.uniqueNo;

        let liEle = document.createElement("li");
        liEle.classList.add("list-style", "d-flex", "flex-row");
        liEle.id = listid;
        ulCont.appendChild(liEle);

        let checkboxInpEle = document.createElement("input");
        checkboxInpEle.type = "checkbox";
        checkboxInpEle.classList.add("checkbox-style");
        checkboxInpEle.id = checkboxid;
        checkboxInpEle.checked = todo.is_checked;

        checkboxInpEle.onclick = function() {
            performstrike(checkboxid, labelid);
        };
        liEle.appendChild(checkboxInpEle);

        let divEle = document.createElement("div");
        divEle.classList.add("div-style", "w-100", "d-flex", "flex-row", "justify-content-between");
        liEle.appendChild(divEle);

        let labelEle = document.createElement("label");
        labelEle.setAttribute("for", checkboxid);
        labelEle.classList.add("label-style");
        labelEle.id = labelid;
        labelEle.textContent = todo.text;
        if (todo.is_checked === true) {
            labelEle.classList.add("strike");
        }
        divEle.appendChild(labelEle);

        let iconEle = document.createElement("i");
        iconEle.classList.add("bi", "bi-trash", "iconEle-style");
        iconEle.onclick = function() {
            removelist(listid);
        };
        divEle.appendChild(iconEle);

        localStorage.setItem("savedstorageitems", JSON.stringify(details));

    }

    function adduserinput() {
        let userinputvalue = userinput.value;
        if (userinputvalue === "") {
            alert("invalid input");
            return; //get out of function
        }

        listlength = listlength + 1;
        let newtaskobj = {
            text: userinputvalue,
            uniqueNo: listlength,
            is_checked: false

        };
        details.push(newtaskobj);
        createandappend(newtaskobj);
        userinput.value = "";

        localStorage.setItem("savedstorageitems", JSON.stringify(details));


    }
    userinput.addEventListener('keydown',function(event){
        if (event.key === "Enter"){
            adduserinput()
        }
    })

    addbtn.onclick = function() {
        adduserinput();
    }

    for (let each of details) {
        createandappend(each);
    }
});    
