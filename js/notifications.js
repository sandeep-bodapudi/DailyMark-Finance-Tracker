const Notifications = {
    init() {
        if ("Notification" in window && Notification.permission !== "granted") {
            Notification.requestPermission();
        }
    },

    send(title, body) {
        if (Notification.permission === "granted") {
            new Notification(title, { body: body, icon: '../icons/icon-192.png' });
        }
    },

    checkReminders(tasks, money) {
        const today = new Date().toISOString().split('T')[0];
        
        // Check Tasks
        const dueTasks = tasks.filter(t => t.due_date === today && t.status === 'pending');
        if (dueTasks.length > 0) {
            this.send("DailyMark Task", `You have ${dueTasks.length} tasks due today.`);
        }

        // Check Money
        const overdueMoney = money.filter(m => m.return_date <= today && m.status === 'pending');
        if (overdueMoney.length > 0) {
            this.send("DailyMark Money Alert", `You have ${overdueMoney.length} payments overdue.`);
        }
    }
};