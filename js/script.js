
class Todo {
  constructor(title) {
    this.title = title;
    this.isComplete = false;
  }
}

class TodoList {
  constructor(todosContainer) {
    this.todosContainer = todosContainer;
    this.todos = JSON.parse(localStorage.getItem("todos")) || [];
    this.todoInput = document.querySelector("input");
    this.addBtn = document.querySelector("#addButton");
    this.clearbtn = document.querySelector("#clearButton");

    this.render();
  }

  render() {
    this.todosContainer.innerHTML = "";

    this.addBtn.addEventListener("click", () => {
      this.addNewTodo(this.todoInput.value);
    });
    this.clearbtn.addEventListener("click", () => {
      this.clearTodos();
    });

    this.addTodosToDom();
    this.saveTodosInToLocalStorage();
  }
  addTodosToDom() {
    this.todos.forEach((todo,todoIndex) => {
      let li = document.createElement("li");
      li.className = "completed well";

      let todoTitleElem = document.createElement("label");
      todoTitleElem.innerHTML = todo.title;
      todo.isComplete ? todoTitleElem.classList.add("todo-completed") : null;

      let completBtn = document.createElement("button");
      completBtn.className = "btn btn-success";
      completBtn.innerHTML = "Complete";

      completBtn.addEventListener("click", (event) => {
        event.target.previousSibling.classList.toggle("todo-completed");
        todo.isComplete =!todo.isComplete
        this.saveTodosInToLocalStorage()
        this.render()
      });

      let deleteBtn = document.createElement("button");
      deleteBtn.className = "btn btn-danger";
      deleteBtn.innerHTML = "Remove";

      deleteBtn.addEventListener('click',() =>{
        this.todosContainer.removeChild(li)
        let mainTodoIndex = this.todos.findIndex((todo , index) => index === todoIndex)
        this.todos.splice(mainTodoIndex , 1)
        this.saveTodosInToLocalStorage()
        this.render()
      })

      li.append(todoTitleElem, completBtn, deleteBtn);

      this.todosContainer.append(li);
    });
  }

  addNewTodo(newTodoTitle) {
 
    if (newTodoTitle.trim()) {
      this.todos.push(new Todo(newTodoTitle));
      this.saveTodosInToLocalStorage();
      this.render();
      this.todoInput.value = "";
    }

    this.todoInput.addEventListener('keypress', (event)=>{
         if(event.key === 'Enter'){
          const newTodoTitle = this.todoInput.value.trim();
          if (newTodoTitle) {
              this.addNewTodo(newTodoTitle);
              this.todoInput.value = "";
         }
    }})
  }

  

  clearTodos() {
    this.todos = [];
    this.saveTodosInToLocalStorage();
    this.render();
  }

  saveTodosInToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }
}

new TodoList(document.querySelector("#todoList"));
