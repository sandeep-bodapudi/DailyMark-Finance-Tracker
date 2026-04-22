const PWAInstall = {
    deferredPrompt: null,

    init() {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            // Show install button in header
            document.getElementById('btn-install').classList.remove('hidden');
            // Show install card in settings
            const card = document.getElementById('install-card');
            if (card) card.classList.remove('hidden');
        });

        window.addEventListener('appinstalled', () => {
            this.deferredPrompt = null;
            document.getElementById('btn-install').classList.add('hidden');
            const card = document.getElementById('install-card');
            if (card) card.classList.add('hidden');
        });
    },

    async prompt() {
        if (!this.deferredPrompt) {
            alert('To install: tap the browser menu → "Add to Home Screen"');
            return;
        }
        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            this.deferredPrompt = null;
            document.getElementById('btn-install').classList.add('hidden');
        }
    }
};
