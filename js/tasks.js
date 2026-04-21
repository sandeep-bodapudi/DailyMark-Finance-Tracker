const TaskModule = {
    async render() {
        const container = document.getElementById('view-tasks');
        container.innerHTML = `
            <h2>Tasks</h2>
            <div class="card">
                <input type="text" id="task-title" placeholder="New Task Title">
                <input type="date" id="task-date">
                <button onclick="TaskModule.add()">+ Add Task</button>
            </div>
            <ul id="task-list"></ul>
        `;
        this.loadList();
    },

    async add() {
        const title = document.getElementById('task-title').value;
        const date = document.getElementById('task-date').value;
        if (!title) return alert('Title required');

        await DB.add('tasks', { title, due_date: date, status: 'pending' });
        this.render(); // Refresh
    },

    async loadList() {
        const tasks = await DB.getAll('tasks');
        const list = document.getElementById('task-list');
        list.innerHTML = tasks.filter(t => t.status === 'pending').map(t => `
            <li>
                <span>${t.title} <small>(${t.due_date || 'No Date'})</small></span>
                <button class="secondary" onclick="TaskModule.complete(${t.id})">Done</button>
            </li>
        `).join('');
    },

    async complete(id) {
        // We need to get the item first to update it properly
        // For simplicity in this constrained app, we might just delete or mark done.
        // Let's mark done.
        const tasks = await DB.getAll('tasks');
        const task = tasks.find(t => t.id === id);
        task.status = 'done';
        await DB.update('tasks', task);
        this.loadList();
    }
};