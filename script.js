document.addEventListener('DOMContentLoaded', () => {
    // Login validation
    function validationLogin(username, password, callback) {
        if (username === "admin" && password === "12345") {
            callback(true);
        } else {
            callback(false);
        }
    }

    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        validationLogin(username, password, (isValid) => {
            if (isValid) {
                document.getElementById('loginPage').classList.add('d-none');
                document.getElementById('mainPage').classList.remove('d-none');
            } else {
                alert('Invalid username or password');
            }
        });
    });

    // Fetch todos and render them
    function fetchTodos() {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch todos');
                }
                return response.json();
            })
            .then(todos => renderTodos(todos))
            .catch(error => console.error('Error fetching todos:', error));
    }

    // Render todos
    function renderTodos(todos) {
        const todoContainer = document.getElementById('todoContainer');
        todoContainer.innerHTML = ''; // Clear the container

        let completeCount = 0;

        todos.slice(0, 20).forEach(todo => {
            // Create a container for each todo item
            const todoItem = document.createElement('div');
            todoItem.classList.add('form-check', 'mb-2');

            // Create a checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('form-check-input');
            checkbox.checked = todo.completed;

            // Create a label for the checkbox
            const label = document.createElement('label');
            label.classList.add('form-check-label');
            label.textContent = todo.title;

            // Initial completed count
            if (todo.completed) {
                completeCount++;
            }

            // Update completed count on checkbox change
            checkbox.addEventListener('change', () => {
                completeCount = checkbox.checked ? completeCount + 1 : completeCount - 1;
                validateCompletion(completeCount);
            });

            // Append the checkbox and label to the todo item
            todoItem.appendChild(checkbox);
            todoItem.appendChild(label);

            // Append the todo item to the container
            todoContainer.appendChild(todoItem);
        });

        // Validate the initial count
        validateCompletion(completeCount);
    }

    // Validate completion of 5 todos using Promise
    function validateCompletion(completeCount) {
        return new Promise((resolve, reject) => {
            if (completeCount === 5) {
                resolve();
            }
        }).then(() => {
            alert('Congrats. 5 Tasks have been Successfully Completed');
        });
    }

    // Logout
    function logout() {
        document.getElementById('loginPage').classList.remove('d-none');
        document.getElementById('mainPage').classList.add('d-none');
    }

    // Expose functions to the global scope
    window.fetchTodos = fetchTodos;
    window.logout = logout;
});
