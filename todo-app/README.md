# To-Do List Application

A modern, fully functional to-do list application with **local storage** functionality. Your tasks are automatically saved to your browser's local storage and persist even after you close the page!

## ✨ Features

- ✅ **Add, complete, and delete tasks** - Full task management
- 💾 **Local Storage** - Your tasks are saved automatically to your browser
- 🎨 **Beautiful UI** - Modern gradient design with smooth animations
- 🔍 **Filter Tasks** - View All, Active, or Completed tasks
- 📊 **Task Counter** - See how many tasks you need to complete
- 🗑️ **Clear Completed** - Remove all completed tasks at once
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile

## 🚀 Live Demo

Open `index.html` in your browser to start using the app immediately!

### GitHub Pages Link (if enabled):
https://kbarchvie.github.io/kbarchive/todo-app/

## 📝 How to Use

1. **Add a Task**: Type in the input field and click "Add Task" or press Enter
2. **Complete a Task**: Click the checkbox to mark a task as completed
3. **Delete a Task**: Click the "Delete" button to remove a task
4. **Filter Tasks**: Use the filter buttons to view All, Active, or Completed tasks
5. **Clear Completed**: Click "Clear Completed" to remove all finished tasks

## 📁 Files

- `index.html` - Main HTML structure
- `style.css` - Beautiful styling and animations
- `script.js` - JavaScript logic with local storage functionality

## 🎯 Key Features Explained

### Local Storage
- All tasks are automatically saved to `localStorage` with the key `todoList`
- Your tasks persist even after closing the browser
- Each task stores: ID, text, completion status, and creation date

### Data Structure
```javascript
{
    id: 1234567890,           // Unique timestamp-based ID
    text: "Buy groceries",    // Task text
    completed: false,         // Completion status
    createdAt: "6/9/2026..."  // Creation date
}
```

## 💡 Usage Example

```html
<!-- Simply open index.html in your browser -->
<!-- No installation or setup required! -->
```

## 🛠️ Technical Details

- **JavaScript Classes**: TodoManager (data) and TodoUI (display)
- **Local Storage API**: Browser's native storage system
- **Vanilla JS**: No dependencies required
- **Responsive CSS Grid**: Works on all screen sizes

## 🎨 Customization

You can easily customize:
- Colors in `style.css` (gradient: `#667eea` to `#764ba2`)
- Font family in `style.css`
- Storage key in `script.js` (change `storageKey`)

## 📱 Browser Support

Works in all modern browsers that support:
- HTML5 Local Storage
- ES6 Classes
- CSS Grid and Flexbox

---

**Enjoy your productivity boost! 🚀**
