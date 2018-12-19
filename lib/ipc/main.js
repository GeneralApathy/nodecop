const remote = require('electron').remote
const app = remote.app
const ipcRenderer = require('electron').ipcRenderer;
const $ = require('jquery');

$(document).on('click', '.sel', (e) => {

  var el = $(e.currentTarget);
  if(!el.hasClass("checked")){
    el.addClass("checked");
    el.addClass("fas");
    el.removeClass("fa-square");
    el.addClass("fa-check-square");
    el.css({color: "#4b7bec"})

    return;
  }

  el.css({color: "black"})
  el.removeClass("checked");
  el.removeClass("fas");
  el.removeClass("fa-check-square");
  el.addClass("fa-square");

})

ipcRenderer.on('config', (event, config) => {

  if(Object.keys(config).length == 0)
    return;

  $(".task-list").empty();

  for(item in config){
    $(".task-list").prepend(`

        <div class="task"> <i class="far fa-square sel" select-id="${item.task_id}"></i> <i class="far fa-trash-alt del" del-id="${config[item].task_id}"></i> <i class="fas fa-play play" style="margin-right: 10px;" play-id="${config[item].task_id}"></i> ${config[item].task_name} </div>

      `)

  }

})

ipcRenderer.on('task-update', (event, item) => {

  if($(".task").length == 0)
    $(".task-list").empty();

  $(".task-list").prepend(`

      <div class="task"> <i class="far fa-square sel" select-id="${item.task_id}"></i> <i class="far fa-trash-alt del" del-id="${item.task_id}"></i> <i class="fas fa-play play" style="margin-right: 10px;" play-id="${item.task_id}"></i> ${item.task_name} </div>

    `)

})

$("#new").on('click', (e) => {

  ipcRenderer.send('new-task')

})

$("#g-login").on('click', (e) => {

  ipcRenderer.send('google-login')

})