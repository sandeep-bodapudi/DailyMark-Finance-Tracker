const MoneyModule = {
    async render() {
        const container = document.getElementById('view-money');
        container.innerHTML = `
            <h2>Money Given</h2>
            <div class="card">
                <input type="text" id="m-name" placeholder="Person Name">
                <input type="number" id="m-amount" placeholder="Amount">
                <label>Return Date (Required)</label>
                <input type="date" id="m-date">
                <button onclick="MoneyModule.add()">+ Lend Money</button>
            </div>
            <ul id="money-list"></ul>
        `;
        this.loadList();
    },

    async add() {
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
        });
        this.render();
    },

    async loadList() {
        const data = await DB.getAll('money');
        const list = document.getElementById('money-list');
        const today = new Date().toISOString().split('T')[0];

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
        }).join('');
    },

    async returned(id) {
        const data = await DB.getAll('money');
        const item = data.find(i => i.id === id);
        item.status = 'returned';
        await DB.update('money', item);
        alert('Marked returned. Don\'t forget to add to Wallet if you received cash.');
        this.loadList();
    }
};