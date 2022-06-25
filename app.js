const addTodo = document.querySelector(".add");
const todolist = document.querySelector(".todo-list");
const search = document.querySelector(".search input");

// function to generate html tepmlate for new todos and inject the to the <ul>

const generateTemplate = (todo) => {
  const html = ` <li 
class="list-group-item d-flex align-items-center justify-content-between" >
<span>${todo}</span>
<i class="far fa-trash-alt delete"></i>
</li>`;
  todolist.innerHTML += html;
};

// listening to submit event on the form

addTodo.addEventListener("submit", (e) => {
  e.preventDefault();

  //   to trim off whitespace before or after the string

  const todo = e.target.add.value.trim();

  //   to prevent adding empty todos

  if (todo.length) {
    generateTemplate(todo);

    // to reset the input field in the form back to empty

    e.target.reset();
  }
});

// to delete todos

// the eventListener is added to the parent element <ul> by event bubbling, as adding an eventListener to the individual <li> is not practical and efficient.

todolist.addEventListener("click", (e) => {
  // check if the clicked element has a class name of delete(ie:trashcan)
  if (e.target.classList.contains("delete")) {
    // remove the list item that contains the element with the classname delete
    e.target.parentElement.remove();
  }
});

// function to filter the todos

const filterTodos = (userInput) => {
  // todolist.children gives the list items and since it returns a html collection we cannot use any array methods on it therefore we convert it to an array first.

  // using forEach() on the converted array to cycle through each item

  Array.from(todolist.children).forEach((item) => {
    // checking for items whose text content does not match to that of the userInput
    if (!item.textContent.includes(userInput)) {
      // adding a css class to hide the unmatched items
      item.classList.add("filter-out");
    } else {
      // removing the class to display the matching items
      item.classList.remove("filter-out");
    }
  });
};

// searching and filtering todos

search.addEventListener("keyup", (e) => {
  const userInput = search.value.trim();
  filterTodos(userInput);
});
