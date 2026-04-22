const MoneyModule = {
    async render() {
        const container = document.getElementById('view-money');
        container.innerHTML = `
            <div class="page-header">
                <h2>Lend Tracker</h2>
                <p>Track money you've lent out</p>
            </div>
            <div class="card">
                <div class="form-group">
                    <label>Person Name</label>
                    <input type="text" id="m-name" placeholder="Who did you lend to?">
                </div>
                <div class="form-group">
                    <label>Amount (₹)</label>
                    <input type="number" id="m-amount" placeholder="0">
                </div>
                <div class="form-group">
                    <label>Expected Return Date</label>
                    <input type="date" id="m-date">
                </div>
                <button class="add-btn" onclick="MoneyModule.add()">+ Record Lending</button>
            </div>
            <div class="section-title">Pending Returns</div>
            <ul id="money-list"></ul>
        `;
        this.loadList();
    },

    async add() {
        const name = document.getElementById('m-name').value.trim();
        const amount = parseFloat(document.getElementById('m-amount').value);
        const date = document.getElementById('m-date').value;
        if (!name || !amount || !date) return alert('All fields are required');
        await DB.add('money', {
            person_name: name,
            amount,
            return_date: date,
            given_date: new Date().toISOString().split('T')[0],
            status: 'pending'
        });
        this.render();
    },

    async loadList() {
        const data = await DB.getAll('money');
        const list = document.getElementById('money-list');
        const today = new Date().toISOString().split('T')[0];
        const pending = data.filter(m => m.status === 'pending');

        if (pending.length === 0) {
            list.innerHTML = `<div class="list-empty"><span class="empty-icon">✨</span>No pending returns!</div>`;
            return;
        }

        list.innerHTML = pending.map(m => {
            const isOverdue = m.return_date < today;
            return `
            <div class="list-item ${isOverdue ? 'overdue' : ''}">
                <div class="item-info">
                    <div class="item-title">${m.person_name}</div>
                    <div class="item-sub">${isOverdue ? '⚠️ Overdue · ' : ''}Return by ${m.return_date}</div>
                </div>
                <div style="display:flex;align-items:center;gap:8px">
                    <span class="item-amount neg">₹${m.amount.toLocaleString('en-IN')}</span>
                    <button class="secondary" onclick="MoneyModule.returned(${m.id})">Got Back</button>
                </div>
            </div>`;
        }).join('');
    },

    async returned(id) {
        const data = await DB.getAll('money');
        const item = data.find(i => i.id === id);
        item.status = 'returned';
        await DB.update('money', item);
        alert("Marked as returned! Don't forget to log it in your Wallet. 💰");
        this.loadList();
    }
};
