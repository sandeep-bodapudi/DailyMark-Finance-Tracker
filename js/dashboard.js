const Dashboard = {
    async render() {
        const container = document.getElementById('view-dashboard');
        
        // 1. Get Data
        const today = new Date().toISOString().split('T')[0];
        const currentMonth = today.slice(0, 7); // "2026-01"

        const tasks = await DB.getAll('tasks');
        const money = await DB.getAll('money');
        const transactions = await DB.getAll('transactions');

        // 2. Calculate Stats
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

        // 3. Render HTML
        container.innerHTML = `
            <h2>Dashboard</h2>
            
            <div class="card">
                <button id="btn-daily-review" onclick="Dashboard.markReviewDone()">✅ Daily Review Done</button>
            </div>

            <div class="stat-grid">
                <div class="stat-box">
                    <small>Today's Tasks</small>
                    <span class="stat-val">${pendingTasks}</span>
                </div>
                <div class="stat-box">
                    <small>Pending Money</small>
                    <span class="stat-val">${pendingMoney}</span>
                </div>
                <div class="stat-box">
                    <small>Today Spent</small>
                    <span class="stat-val text-danger">${todayExp}</span>
                </div>
                <div class="stat-box">
                    <small>Month Income</small>
                    <span class="stat-val text-success">${monthIncome}</span>
                </div>
            </div>
            
            <div class="stat-box" style="margin-top: 10px;">
                <small>Month Expense</small>
                <span class="stat-val text-danger">${monthExp}</span>
            </div>
        `;

        // Check Logic for Review
        this.checkReviewStatus();
        
        // Run Notifications Check
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
        alert("Great job! Stay disciplined.");
    }
};