const App = {
    async init() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./service-worker.js');
        }
        await DB.open();
        PWAInstall.init();
        Notifications.init();
        this.navigate('dashboard');
    },

    navigate(viewId) {
        document.querySelectorAll('.view').forEach(el => el.classList.add('hidden'));
        document.getElementById('view-' + viewId).classList.remove('hidden');

        // Update nav active state
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === viewId);
        });

        if (viewId === 'dashboard') Dashboard.render();
        if (viewId === 'tasks') TaskModule.render();
        if (viewId === 'money') MoneyModule.render();
        if (viewId === 'transactions') TransModule.render();
    }
};

window.addEventListener('DOMContentLoaded', () => App.init());
