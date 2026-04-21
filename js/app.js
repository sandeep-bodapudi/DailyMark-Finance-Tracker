const App = {
    async init() {
        // 1. Register Service Worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./service-worker.js');
        }

        // 2. Open DB
        await DB.open();

        // 3. Init Notifications
        Notifications.init();

        // 4. Load Dashboard by default
        this.navigate('dashboard');
    },

    navigate(viewId) {
        // Hide all views
        document.querySelectorAll('.view').forEach(el => el.classList.add('hidden'));
        // Show target
        document.getElementById('view-' + viewId).classList.remove('hidden');

        // Render specific module
        if (viewId === 'dashboard') Dashboard.render();
        if (viewId === 'tasks') TaskModule.render();
        if (viewId === 'money') MoneyModule.render();
        if (viewId === 'transactions') TransModule.render();
    }
};

// Start App
window.addEventListener('DOMContentLoaded', () => App.init());