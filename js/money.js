const MoneyModule = {
    async render() {
        const container = document.getElementById('view-money');
        container.innerHTML = `
<<<<<<< HEAD
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
=======
            <h2>Money Given</h2>
            <div class="card">
                <input type="text" id="m-name" placeholder="Person Name">
                <input type="number" id="m-amount" placeholder="Amount">
                <label>Return Date (Required)</label>
                <input type="date" id="m-date">
                <button onclick="MoneyModule.add()">+ Lend Money</button>
            </div>
>>>>>>> 5ef46963057914e9f6a81227728aef2dd505af42
            <ul id="money-list"></ul>
        `;
        this.loadList();
    },

    async add() {
<<<<<<< HEAD
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
=======
        const name = document.getElementById('m-name').value;
        const amount = parseFloat(document.getElementById('m-amount').value);
        const date = document.getElementById('m-date').value;

        if (!name || !amount || !date) return alert('All fields required');

        await DB.add('money', { 
            person_name: name, 
            amount, 
            return_date: date, 
            given_date: new Date().toISOString().split('T')[0],
            status: 'pending' 
>>>>>>> 5ef46963057914e9f6a81227728aef2dd505af42
        });
        this.render();
    },

    async loadList() {
        const data = await DB.getAll('money');
        const list = document.getElementById('money-list');
        const today = new Date().toISOString().split('T')[0];
<<<<<<< HEAD
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
=======

        list.innerHTML = data.filter(m => m.status === 'pending').map(m => {
            const isOverdue = m.return_date < today;
            return `
            <li class="${isOverdue ? 'overdue' : ''}">
                <div>
                    <strong>${m.person_name}</strong> - ${m.amount}<br>
                    <small>Return: ${m.return_date}</small>
                </div>
                <button class="secondary" onclick="MoneyModule.returned(${m.id})">Returned</button>
            </li>
            `;
>>>>>>> 5ef46963057914e9f6a81227728aef2dd505af42
        }).join('');
    },

    async returned(id) {
        const data = await DB.getAll('money');
        const item = data.find(i => i.id === id);
        item.status = 'returned';
        await DB.update('money', item);
<<<<<<< HEAD
        alert("Marked as returned! Don't forget to log it in your Wallet. 💰");
        this.loadList();
    }
};
=======
        alert('Marked returned. Don\'t forget to add to Wallet if you received cash.');
        this.loadList();
    }
};
>>>>>>> 5ef46963057914e9f6a81227728aef2dd505af42
