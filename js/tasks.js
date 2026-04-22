const TaskModule = {
    async render() {
        const container = document.getElementById('view-tasks');
        container.innerHTML = `
            <div class="page-header">
                <h2>Tasks</h2>
                <p>Track your pending to-dos</p>
            </div>
            <div class="card">
                <div class="form-group">
                    <label>Task Title</label>
                    <input type="text" id="task-title" placeholder="What needs to be done?">
                </div>
                <div class="form-group">
                    <label>Due Date</label>
                    <input type="date" id="task-date">
                </div>
                <button class="add-btn" onclick="TaskModule.add()">+ Add Task</button>
            </div>
            <div class="section-title">Pending Tasks</div>
            <ul id="task-list"></ul>
        `;
        this.loadList();
    },

    async add() {
        const title = document.getElementById('task-title').value.trim();
        const date = document.getElementById('task-date').value;
        if (!title) return alert('Please enter a task title');
        await DB.add('tasks', { title, due_date: date, status: 'pending' });
        this.render();
    },

    async loadList() {
        const tasks = await DB.getAll('tasks');
        const list = document.getElementById('task-list');
        const today = new Date().toISOString().split('T')[0];
        const pending = tasks.filter(t => t.status === 'pending');

        if (pending.length === 0) {
            list.innerHTML = `<div class="list-empty"><span class="empty-icon">🎉</span>No pending tasks!</div>`;
            return;
        }

        list.innerHTML = pending.map(t => {
            const isOverdue = t.due_date && t.due_date < today;
            return `
            <div class="list-item ${isOverdue ? 'overdue' : ''}">
                <div class="item-info">
                    <div class="item-title">${t.title}</div>
                    <div class="item-sub">${t.due_date ? (isOverdue ? '⚠️ Overdue · ' : '') + t.due_date : 'No due date'}</div>
                </div>
                <button class="secondary" onclick="TaskModule.complete(${t.id})">Done</button>
            </div>`;
        }).join('');
    },

    async complete(id) {
        const tasks = await DB.getAll('tasks');
        const task = tasks.find(t => t.id === id);
        task.status = 'done';
        await DB.update('tasks', task);
        this.loadList();
    }
};
