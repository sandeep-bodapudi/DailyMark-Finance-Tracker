const DB_NAME = 'DailyMarkDB';
const DB_VERSION = 1;

const DB = {
    db: null,

    open() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                // Tasks
                if (!db.objectStoreNames.contains('tasks')) {
                    const store = db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
                    store.createIndex('status', 'status', { unique: false });
                }
                // Money
                if (!db.objectStoreNames.contains('money')) {
                    const store = db.createObjectStore('money', { keyPath: 'id', autoIncrement: true });
                    store.createIndex('status', 'status', { unique: false });
                }
                // Transactions
                if (!db.objectStoreNames.contains('transactions')) {
                    const store = db.createObjectStore('transactions', { keyPath: 'id', autoIncrement: true });
                    store.createIndex('date', 'date', { unique: false });
                }
            };

            request.onsuccess = (e) => {
                this.db = e.target.result;
                resolve(this.db);
            };

            request.onerror = (e) => reject(e.target.error);
        });
    },

    // Generic Add
    add(storeName, data) {
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            const req = store.add(data);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    },

    // Generic Get All
    getAll(storeName) {
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            const req = store.getAll();
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    },

    // Update
    update(storeName, data) {
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            const req = store.put(data);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    },
    
    // Clear Store (for restore)
    clear(storeName) {
         return new Promise((resolve) => {
            const tx = this.db.transaction(storeName, 'readwrite');
            tx.objectStore(storeName).clear();
            tx.oncomplete = () => resolve();
        });
    }
};