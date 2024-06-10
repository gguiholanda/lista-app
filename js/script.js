const showTasks = () => {
    const table = document.getElementById("idListTable");
    const tbody = table.querySelector("tbody");
 
 
 
 
    tbody.innerHTML =
    `<tr>
      <th>DATA</th>
      <th>NOME</th>
      <th>STATUS</th>
      <th>EDITAR</th>
      <th>EXCLUIR</th>  
    </tr>`;
 
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
 
 
    tasks.forEach((task, index) => {
      const taskContent =
 
          `<tr>
            <td>${task.date}</td>
            <td>${task.name}</td>
            <td>${task.statusType}</td>
            <td><button class="btnEdit" onclick="editTask(${index})"><i class="fa fa-pencil-square-o fa-3x" aria-hidden="true"></i></button></td>
            <td><button class="btnDelete" onclick="deleteTask(${index})"><i class="fa fa-trash fa-3x" aria-hidden="true"></i></button></td>
          </tr>`;
 
      const row = tbody.insertRow();
      row.innerHTML = taskContent;
 
    });
  }
 
  const addTask = (event) => {
    event.preventDefault();
    let form = document.getElementById("idForm");
    let name = document.getElementById("idName").value.trim();
    let statusType = document.getElementById('idStatusType').value;
    let date = document.getElementById("idDate").value.trim();
    let emptyFields = [];
    let newDate = new Date(date);
    let datePtBr = new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timestyle: 'long',
      timeZone: 'America/Belem',
    });
 
    name == '' ? emptyFields.push("Nome") : '';
    statusType == '' ? emptyFields.push("tipo de Stautus") : '';
    date == '' ? emptyFields.push("Data") : '';
 
    if(name == '' || statusType == '' || date == ''){
 
      alert("Por favor, preencha todos os campos! " + emptyFields);
    }else {
      const task = {name: name, statusType: statusType, date: datePtBr.format(newDate)}
   
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      form.reset();
      showTasks();
    }
  }
 
  const cleanForm = () => {
    document.getElementById('idForm').reset();
  }
 
  const deleteTask = (index) => {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    console.log(tasks)
 
    tasks.splice(index, 1);
 
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showTasks();
  }
 
  const editTask = (index) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks[index];
    document.getElementById('idName').value = task.name;
    document.getElementById('idStatusType').value = task.statusType;
    document.getElementById('idDate').value = task.date;
 
 
    const updateTask = (event) => {
      event.preventDefault();
      task.name = document.getElementById('idName').value.trim();
      task.statusType =  document.getElementById('idStatusType').value;
      task.date = document.getElementById('idDate').value.trim();
 
      const upTask = JSON.stringify(tasks);
      localStorage.setItem('tasks', upTask);
 
      showTasks();
      document.getElementById('idForm').reset();
 
      document.querySelector('.btnAdd').removeEventListener('click', updateTask);
      document.querySelector('.btnAdd').addEventListener('click', addTask);
    }
    document.querySelector('.btnAdd').removeEventListener('click', addTask);
    document.querySelector('.btnAdd').addEventListener('click', updateTask);
 
  }
 
  const init = () => {
    document.querySelector('.btnAdd').addEventListener('click', addTask);
    showTasks();
  }
 
  const changeName =
 
  init();