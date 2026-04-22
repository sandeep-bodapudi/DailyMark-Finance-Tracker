const Dashboard = {
    async render() {
        const container = document.getElementById('view-dashboard');
<<<<<<< HEAD

        const today = new Date().toISOString().split('T')[0];
        const currentMonth = today.slice(0, 7);

        const now = new Date();
        const hour = now.getHours();
        const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

        const dateStr = now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
=======
        
        // 1. Get Data
        const today = new Date().toISOString().split('T')[0];
        const currentMonth = today.slice(0, 7); // "2026-01"
>>>>>>> 5ef46963057914e9f6a81227728aef2dd505af42

        const tasks = await DB.getAll('tasks');
        const money = await DB.getAll('money');
        const transactions = await DB.getAll('transactions');

<<<<<<< HEAD
        const pendingTasks = tasks.filter(t => t.status === 'pending' && t.due_date <= today).length;
        const pendingMoney = money.filter(m => m.status === 'pending').reduce((sum, m) => sum + m.amount, 0);

=======
        // 2. Calculate Stats
        const pendingTasks = tasks.filter(t => t.status === 'pending' && t.due_date <= today).length;
        const pendingMoney = money.filter(m => m.status === 'pending').reduce((sum, m) => sum + m.amount, 0);
        
>>>>>>> 5ef46963057914e9f6a81227728aef2dd505af42
        const todayExp = transactions
            .filter(t => t.date === today && t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        const monthIncome = transactions
            .filter(t => t.date.startsWith(currentMonth) && t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const monthExp = transactions
            .filter(t => t.date.startsWith(currentMonth) && t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

<<<<<<< HEAD
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
=======
        // 3. Render HTML
        container.innerHTML = `
            <h2>Dashboard</h2>
            
            <div class="card">
                <button id="btn-daily-review" onclick="Dashboard.markReviewDone()">✅ Daily Review Done</button>
>>>>>>> 5ef46963057914e9f6a81227728aef2dd505af42
            </div>

            <div class="stat-grid">
                <div class="stat-box">
<<<<<<< HEAD
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
=======
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
>>>>>>> 5ef46963057914e9f6a81227728aef2dd505af42
        Notifications.checkReminders(tasks, money);
    },

    checkReviewStatus() {
        const lastReview = localStorage.getItem('last_review');
        const today = new Date().toISOString().split('T')[0];
        const banner = document.getElementById('review-banner');
<<<<<<< HEAD
=======
        
>>>>>>> 5ef46963057914e9f6a81227728aef2dd505af42
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
<<<<<<< HEAD
        alert('Great job! Stay disciplined. 💪');
    }
};
=======
        alert("Great job! Stay disciplined.");
    }
};
>>>>>>> 5ef46963057914e9f6a81227728aef2dd505af42
