show()
const addTask = document.getElementById("add");
const inputByUser = document.getElementById("get-input")
const btnOne=document.getElementById("btnOne")
const delBtn=document.getElementById("remove")
const searchInp=document.getElementById("search")
const trList=document.querySelectorAll("tr")

addTask.addEventListener("click", adding)

function adding() {
   let inputValue = inputByUser.value
    // trim() is function for removing spaces so we check if value given
    // by user is something or nothing so blank data do not get added and show blank row
    if(inputValue.trim()!=0){
       
        //   first we do getItem because we want to check if the array is present or not
    //   in local storage
    // Note:key name must start with capital letter 
    let task = localStorage.getItem("Task")
    //    when localStorage is empty no array is present so in order to add items in array we need 
    //    to create an array(1st attempt to add data in localStorage)
    if (task == null) {
        arr = []
    }
     else {
        //if array is present in localStorage parse and get item from storage(from 2nd attempt to add data else will be executed)
         arr = JSON.parse(task)
    }
    arr.push(inputValue)
    localStorage.setItem("Task", JSON.stringify(arr))

    }
    inputByUser.value="";
    show();

}

function show() {
// here we getItem again from localStorage because in start we are calling this function 
// so everything remains on screen so as its getting calling initially it do not recognize Array
let showTask = localStorage.getItem("Task")
      arr = JSON.parse(showTask)

    let showingItems = ''
    let addedTask = document.getElementById("addedTaskList")
    // on first index+1 because we are displaying index of array which starts from 0 
    arr.forEach((item, index) => {
        showingItems += `<tr>
        <th>${index+1}</th>
        <td>${item}</td>
        <td><i class="fa fa-pencil"><button id="btnOne" onClick=editShow(${index})>Edit</button></i></td>
        <td><i class="fa fa-trash"><button id="btnTwo" onClick=deleteItem(${index})>Delete</button></i></td>
    </tr>`
    })
    addedTask.innerHTML=showingItems
}

function editShow(index){
    let saveBtn=document.getElementById("save")
    let indexOfEditted=document.getElementById("saveIndex")
    // storing index of item on which clicked to edit 
    indexOfEditted.value=index
    // passing index which we stored in hidden input tag
    inputByUser.value=arr[index]
    saveBtn.style.display="block";
    addTask.style.display="none";

    
}
let saveBtn=document.getElementById("save")
saveBtn.addEventListener("click",savingInLocal)
function savingInLocal(){

    // get index on which edit was clicked which was stored in editShow function
    let indexOfEditted=document.getElementById("saveIndex").value
    // now pass that index in array and add user input on that place
    arr[indexOfEditted]=inputByUser.value
    // to add in localStorage
     localStorage.setItem("Task", JSON.stringify(arr))
    inputByUser.value=""
    saveBtn.style.display="none";
    addTask.style.display="block"
    show()
}

function deleteItem(index){
    let showTask = localStorage.getItem("Task")
    arr = JSON.parse(showTask)
    arr.splice(index,1)
    localStorage.setItem("Task", JSON.stringify(arr))
    show()
}

delBtn.addEventListener("click",deleteAll)
function deleteAll(){
arr=[]

localStorage.setItem("Task",JSON.stringify(arr))
    saveBtn.style.display="none";
    addTask.style.display="block"
    inputByUser.value=""
    show()

}

searchInp.addEventListener("input",searchShow)
function searchShow(){
    
Array.from(trList).forEach(function(item){
    // at 0th index of table of td we have data getting stored with help of item 
    // td[0].innerText is all items getting stored
    let text=item.getElementsByTagName("td")[0].innerText;
   
    let searchText=searchInp.value
   
      let reg=new RegExp(searchText,"gi")
    if(text.match(reg)){
      
        item.style.display="table-row"
    }else{
        item.style.display="none";
    }

})
}

