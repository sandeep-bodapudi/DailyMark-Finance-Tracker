const Dashboard = {
    async render() {
        const container = document.getElementById('view-dashboard');

        const today = new Date().toISOString().split('T')[0];
        const currentMonth = today.slice(0, 7);

        const now = new Date();
        const hour = now.getHours();
        const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

        const dateStr = now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

        const tasks = await DB.getAll('tasks');
        const money = await DB.getAll('money');
        const transactions = await DB.getAll('transactions');

        const pendingTasks = tasks.filter(t => t.status === 'pending' && t.due_date <= today).length;
        const pendingMoney = money.filter(m => m.status === 'pending').reduce((sum, m) => sum + m.amount, 0);

        const todayExp = transactions
            .filter(t => t.date === today && t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        const monthIncome = transactions
            .filter(t => t.date.startsWith(currentMonth) && t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const monthExp = transactions
            .filter(t => t.date.startsWith(currentMonth) && t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        const balance = monthIncome - monthExp;

        container.innerHTML = `
            <div class="dash-greeting">${greeting} 👋</div>
            <div class="dash-date">${dateStr}</div>

            <div class="review-card">
                <div>
                    <h3>Daily Review</h3>
                    <p>Track your progress today</p>
                </div>
                <button class="btn-review" onclick="Dashboard.markReviewDone()">✅ Done</button>
            </div>

            <div class="stat-grid">
                <div class="stat-box">
                    <div class="stat-label">Overdue Tasks</div>
                    <span class="stat-val">${pendingTasks}</span>
                </div>
                <div class="stat-box accent">
                    <div class="stat-label">Pending Dues</div>
                    <span class="stat-val">₹${pendingMoney.toLocaleString('en-IN')}</span>
                </div>
                <div class="stat-box danger">
                    <div class="stat-label">Today Spent</div>
                    <span class="stat-val red">₹${todayExp.toLocaleString('en-IN')}</span>
                </div>
                <div class="stat-box success">
                    <div class="stat-label">Month Income</div>
                    <span class="stat-val green">₹${monthIncome.toLocaleString('en-IN')}</span>
                </div>
            </div>

            <div class="stat-wide">
                <div>
                    <div class="stat-label">Month Balance</div>
                    <span class="stat-val ${balance >= 0 ? 'green' : 'red'}">₹${Math.abs(balance).toLocaleString('en-IN')}</span>
                </div>
                <div style="text-align:right">
                    <div class="stat-label">Month Expense</div>
                    <span class="stat-val red">₹${monthExp.toLocaleString('en-IN')}</span>
                </div>
            </div>
        `;

        this.checkReviewStatus();
        Notifications.checkReminders(tasks, money);
    },

    checkReviewStatus() {
        const lastReview = localStorage.getItem('last_review');
        const today = new Date().toISOString().split('T')[0];
        const banner = document.getElementById('review-banner');
        if (lastReview !== today) {
            banner.classList.remove('hidden');
        } else {
            banner.classList.add('hidden');
        }
    },

    markReviewDone() {
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem('last_review', today);
        this.checkReviewStatus();
        alert('Great job! Stay disciplined. 💪');
    }
};
