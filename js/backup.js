const BackupManager = {
    async exportData() {
        const tasks = await DB.getAll('tasks');
        const money = await DB.getAll('money');
        const transactions = await DB.getAll('transactions');

        const backup = {
            date: new Date().toISOString(),
            data: { tasks, money, transactions }
        };

        const blob = new Blob([JSON.stringify(backup)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `dailymark_backup_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
    },

    async restoreData(file) {
        if (!confirm("This will overwrite all current data. Continue?")) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const json = JSON.parse(e.target.result);
                if (!json.data) throw new Error("Invalid backup file");

                await DB.clear('tasks');
                await DB.clear('money');
                await DB.clear('transactions');

                const txTasks = json.data.tasks.map(i => DB.add('tasks', i));
                const txMoney = json.data.money.map(i => DB.add('money', i));
                const txTrans = json.data.transactions.map(i => DB.add('transactions', i));

                await Promise.all([...txTasks, ...txMoney, ...txTrans]);
                alert("Restore complete. Reloading...");
                window.location.reload();
            } catch (err) {
                alert("Error restoring file: " + err.message);
            }
        };
        reader.readAsText(file);
    }
};

// Listener for file input
document.getElementById('restore-file').addEventListener('change', (e) => {
    if(e.target.files.length > 0) BackupManager.restoreData(e.target.files[0]);
});