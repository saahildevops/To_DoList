
let todoList = [
    {itemname:"Assignment1", deadline:'01/21/2023', priority:"low", completed:false},
    {itemname:"Assignment2", deadline:'01/22/2023', priority:"low", completed:true},
    {itemname:"Assignment3", deadline:'01/21/2023', priority:"low", completed:false},
    {itemname:"Assignment4", deadline:'01/21/2023', priority:"low", completed:false},
    {itemname:"Assignment5", deadline:'01/25/2023', priority:"low", completed:false},
    {itemname:"Assignment6", deadline:'01/20/2023', priority:"low", completed:false}
];


function addTodo() {
    let itemName = $('#itemname').val();
    let deadline = $('#deadline').val();
    let priority = $('#priority').val();

    if (!itemName) {
        $('#todo_status').text('Please fill Todo item name.');
        return false;
    }
    if (!deadline) {
        $('#todo_status').text('Please select Todo item deadline date.');
        return false;
    }
    if (!priority) {
        $('#todo_status').text('Please select Todo item priority.');
        return false;
    }

    const todo = {
        itemname:itemName,
        deadline:deadline,
        priority:priority,
        completed: false,
      };
    
      todoList.push(todo);
      renderTodo();
      $('#itemname').val('');
      $('#deadline').val('');
      $('#priority').val('');
      $('#todo_status').text('');
    
}

function renderTodo(){
   localStorage.setItem('todoList', JSON.stringify(todoList));
  
    let filterObjs = filtertodoList(todoList);
    let sno = 0;

    let todayTodo = filterObjs['today_todo'];
    let todayrow = '<table>';
    todayTodo.forEach(today => {
        sno++;
       let key = today['key'];
        todayrow+='<tr class="data_row">';
        todayrow+='<td id="item_name" class="data_column">'+sno+'. '+capitalize(today['itemname'])+'</td>';
        todayrow+='<td id="item_name" class="data_column">Name:'+today['deadline']+'</td>';
        todayrow+='<td id="column_profession" class="data_column">priority:'+capitalize(today['priority'])+'</td>';
        todayrow+='<td class="data_column"><p onclick=updateTodo('+key+')><img id="img" src="tick_white.png"></p></td>';
        todayrow+='<td class="data_column"><p onclick=deleteTodo('+key+')><img id="img" src="delete_white.png"></p></td>';
        todayrow+='</tr>';
    });
    todayrow+= '</table>';
    if(todayTodo.length===0)
        document.getElementById("todays_list").innerHTML='<div id="filter_data"><div>No Todays Todo data found.</div></div>';
    else
        document.getElementById("todays_list").innerHTML=todayrow;

    let futureTodo = filterObjs['future_todo'];
    let futurerow = '<table>';
    sno = 0;
    futureTodo.forEach(future => {
        sno++;
        let key = future['key'];
        futurerow+='<tr class="data_row">';
        futurerow+='<td id="item_name" class="data_column">'+sno+'. '+capitalize(future['itemname'])+'</td>';
        futurerow+='<td id="item_name" class="data_column">Name:'+future['deadline']+'</td>';
        futurerow+='<td id="column_profession" class="data_column">priority:'+capitalize(future['priority'])+'</td>';
        futurerow+='<td class="data_column"><p onclick=updateTodo('+key+')><img id="img" src="tick_white.png"></p></td>';
        futurerow+='<td class="data_column"><p onclick=deleteTodo('+key+')><img id="img" src="delete_white.png"></p></td>';
        futurerow+='</tr>';
    });
    futurerow+= '</table>';

    if(futureTodo.length===0)
        document.getElementById("future_list").innerHTML='<div id="filter_data"><div>No Future Todo data found.</div></div>';
    else
        document.getElementById("future_list").innerHTML=futurerow;

    let completedTodo = filterObjs['completed_todo'];

    let completerow = '<table>';
    sno = 0;
    completedTodo.forEach(complete => {
        sno++;
        let key = complete['key'];
        completerow+='<tr class="data_row_complete">';
        completerow+='<td id="item_name" class="data_column">'+sno+'. '+capitalize(complete['itemname'])+'</td>';
        completerow+='<td id="item_name" class="data_column">Name:'+complete['deadline']+'</td>';
        completerow+='<td id="column_profession" class="data_column">priority:'+capitalize(complete['priority'])+'</td>';
        completerow+='<td class="data_column"><p onclick=deleteTodo('+key+')><img id="img" src="delete_black.png"></p></td>';
        completerow+='</tr>';
    });
    completerow+= '</table>';

    if(futureTodo.length===0)
        document.getElementById("completed_list").innerHTML='<div id="filter_data"><div><h3>No Complete Todo data found.</div></div>';
    else
        document.getElementById("completed_list").innerHTML=completerow;
}

function updateTodo(listkey) {
    var str = localStorage.getItem("todoList");
    if (str != null) {
        todoList = JSON.parse(str);
    }
    todoList[listkey]['completed'] = true;
    renderTodo();
}

function deleteTodo(listkey) {
    var str = localStorage.getItem("todoList");
    if (str != null) {
        todoList = JSON.parse(str);
    }
    todoList.splice(listkey, 1);
    renderTodo();
}

function filtertodoList() {
    var str = localStorage.getItem("todoList");
    if (str != null) {
      todoArray = JSON.parse(str);
    }

    let filterData = [];
    filterData['today_todo'] = [];
    filterData['future_todo'] = [];
    filterData['completed_todo'] = [];
    let todaysDate=formatDate(new Date());
    for(var i = 0; i < todoArray.length; i++){
        todo = todoArray[i];
        todoData = formatDate(new Date(todo['deadline']));
        if(todoData==todaysDate && todo['completed']==false) {
            filterData['today_todo'][i]=todo;
            filterData['today_todo'][i]['key'] =i;
        } 
        if(todoData!=todaysDate && todo['completed']==false) {
            filterData['future_todo'][i]=todo;
            filterData['future_todo'][i]['key'] =i;
        }
        if(todo['completed']==true) {
            filterData['completed_todo'][i]=todo;
            filterData['completed_todo'][i]['key'] =i;
        }
    }
 
    return filterData;
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
}

function capitalize(string)
{
    return string[0].toUpperCase() + string.slice(1);
}
window.onload=function(){   
    renderTodo();
}
