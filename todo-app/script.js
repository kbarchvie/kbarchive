// Local Storage Manager
class TodoManager {
    constructor() {
        this.storageKey = 'todoList';
        this.todos = this.loadFromStorage();
        this.currentFilter = 'all';
    }

    // Load todos from localStorage
    loadFromStorage() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    // Save todos to localStorage
    saveToStorage() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
    }

    // Add a new todo
    addTodo(text) {
        if (!text.trim()) return false;
        
        const todo = {
            id: Date.now(),
            text: text.trim(),
            completed: false,
            createdAt: new Date().toLocaleString()
        };
        
        this.todos.unshift(todo);
        this.saveToStorage();
        return todo;
    }

    // Delete a todo
    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveToStorage();
    }

    // Toggle todo completion
    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveToStorage();
        }
    }

    // Get filtered todos
    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(todo => !todo.completed);
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            default:
                return this.todos;
        }
    }

    // Clear completed todos
    clearCompleted() {
        this.todos = this.todos.filter(todo => !todo.completed);
        this.saveToStorage();
    }

    // Get active todo count
    getActiveTodoCount() {
        return this.todos.filter(todo => !todo.completed).length;
    }
}

// UI Controller
class TodoUI {
    constructor() {
        this.manager = new TodoManager();
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.clearBtn = document.getElementById('clearBtn');
        this.taskCount = document.getElementById('taskCount');
        this.filterBtns = document.querySelectorAll('.filter-btn');

        this.init();
    }

    init() {
        this.addEventListeners();
        this.render();
    }

    addEventListeners() {
        // Add task event listeners
        this.addBtn.addEventListener('click', () => this.handleAddTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleAddTodo();
        });

        // Filter buttons
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilter(e.target.dataset.filter));
        });

        // Clear completed
        this.clearBtn.addEventListener('click', () => this.handleClearCompleted());
    }

    handleAddTodo() {
        const text = this.todoInput.value;
        if (this.manager.addTodo(text)) {
            this.todoInput.value = '';
            this.todoInput.focus();
            this.render();
        } else {
            alert('Please enter a task!');
        }
    }

    handleFilter(filter) {
        this.manager.currentFilter = filter;
        
        // Update active button
        this.filterBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            }
        });

        this.render();
    }

    handleClearCompleted() {
        if (this.manager.todos.some(todo => todo.completed)) {
            if (confirm('Are you sure you want to clear all completed tasks?')) {
                this.manager.clearCompleted();
                this.render();
            }
        } else {
            alert('No completed tasks to clear!');
        }
    }

    handleDeleteTodo(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.manager.deleteTodo(id);
            this.render();
        }
    }

    handleToggleTodo(id) {
        this.manager.toggleTodo(id);
        this.render();
    }

    render() {
        this.renderTodoList();
        this.updateStats();
    }

    renderTodoList() {
        const filteredTodos = this.manager.getFilteredTodos();
        this.todoList.innerHTML = '';

        if (filteredTodos.length === 0) {
            this.todoList.innerHTML = '<div class="empty-message">No tasks to show 📝</div>';
            return;
        }

        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <input 
                    type="checkbox" 
                    class="checkbox" 
                    ${todo.completed ? 'checked' : ''}
                    onchange="todoUI.handleToggleTodo(${todo.id})"
                >
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <button class="delete-btn" onclick="todoUI.handleDeleteTodo(${todo.id})">Delete</button>
            `;
            this.todoList.appendChild(li);
        });
    }

    updateStats() {
        const activeCount = this.manager.getActiveTodoCount();
        const totalCount = this.manager.todos.length;
        
        this.taskCount.textContent = activeCount === 1 
            ? '1 task remaining' 
            : `${activeCount} tasks remaining`;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when DOM is ready
let todoUI;
document.addEventListener('DOMContentLoaded', () => {
    todoUI = new TodoUI();
});
