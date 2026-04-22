const TransModule = {
<<<<<<< HEAD
    currentType: 'expense',

    async render() {
        const container = document.getElementById('view-transactions');
        container.innerHTML = `
            <div class="page-header">
                <h2>Wallet</h2>
                <p>Log your income & expenses</p>
            </div>
            <div class="card">
                <div class="type-toggle">
                    <button class="selected expense" id="toggle-expense" onclick="TransModule.setType('expense')">💸 Expense</button>
                    <button id="toggle-income" onclick="TransModule.setType('income')">💰 Income</button>
                </div>
                <div class="form-group">
                    <label>Amount (₹)</label>
                    <input type="number" id="t-amount" placeholder="0">
                </div>
                <div class="form-group">
                    <label>Category</label>
                    <input type="text" id="t-category" placeholder="e.g. Food, Fuel, Salary...">
                </div>
                <button class="add-btn" onclick="TransModule.add()">+ Add Entry</button>
            </div>
            <div class="section-title">Recent History</div>
            <ul id="trans-list"></ul>
        `;
        this.currentType = 'expense';
        this.loadList();
    },

    setType(type) {
        this.currentType = type;
        document.getElementById('toggle-expense').classList.toggle('selected', type === 'expense');
        document.getElementById('toggle-expense').classList.toggle('expense', type === 'expense');
        document.getElementById('toggle-income').classList.toggle('selected', type === 'income');
    },

    async add() {
        const amount = parseFloat(document.getElementById('t-amount').value);
        const category = document.getElementById('t-category').value.trim();
        if (!amount || !category) return alert('Please fill in all fields');
        await DB.add('transactions', {
            type: this.currentType,
            amount,
            category,
=======
    async render() {
        const container = document.getElementById('view-transactions');
        container.innerHTML = `
            <h2>Wallet</h2>
            <div class="card">
                <select id="t-type">
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>
                <input type="number" id="t-amount" placeholder="Amount">
                <input type="text" id="t-category" placeholder="Category (Food, Fuel...)">
                <button onclick="TransModule.add()">+ Add Entry</button>
            </div>
            <h3>Recent History</h3>
            <ul id="trans-list"></ul>
        `;
        this.loadList();
    },

    async add() {
        const type = document.getElementById('t-type').value;
        const amount = parseFloat(document.getElementById('t-amount').value);
        const category = document.getElementById('t-category').value;

        if (!amount || !category) return alert('Fill fields');

        await DB.add('transactions', {
            type, amount, category,
>>>>>>> 5ef46963057914e9f6a81227728aef2dd505af42
            date: new Date().toISOString().split('T')[0]
        });
        this.render();
    },

    async loadList() {
        const data = await DB.getAll('transactions');
<<<<<<< HEAD
        const recent = data.reverse().slice(0, 20);
        const list = document.getElementById('trans-list');

        if (recent.length === 0) {
            list.innerHTML = `<div class="list-empty"><span class="empty-icon">👛</span>No transactions yet</div>`;
            return;
        }

        list.innerHTML = recent.map(t => `
            <div class="list-item ${t.type === 'income' ? 'income-item' : 'expense-item'}">
                <div class="item-info">
                    <div class="item-title">${t.category}</div>
                    <div class="item-sub">${t.date}</div>
                </div>
                <span class="item-amount ${t.type === 'income' ? 'pos' : 'neg'}">
                    ${t.type === 'income' ? '+' : '-'}₹${t.amount.toLocaleString('en-IN')}
                </span>
            </div>`
        ).join('');
    }
};
=======
        // Show last 10, reversed
        const recent = data.reverse().slice(0, 10);
        const list = document.getElementById('trans-list');
        
        list.innerHTML = recent.map(t => `
            <li style="border-left: 4px solid ${t.type === 'income' ? 'green' : 'red'}">
                <span>${t.category}</span>
                <strong>${t.type === 'income' ? '+' : '-'}${t.amount}</strong>
            </li>
        `).join('');
    }
};
>>>>>>> 5ef46963057914e9f6a81227728aef2dd505af42
