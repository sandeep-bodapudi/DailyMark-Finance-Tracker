const TransModule = {
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
            date: new Date().toISOString().split('T')[0]
        });
        this.render();
    },

    async loadList() {
        const data = await DB.getAll('transactions');
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