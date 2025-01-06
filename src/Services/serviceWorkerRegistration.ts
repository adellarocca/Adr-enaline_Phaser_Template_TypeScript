export function registerServiceWorker(): void {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('service-worker.js')
                .then((registration) => {
                    console.log('Service Worker successfully registered :', registration);
                })
                .catch((error) => {
                    console.error('Error registering Service Worker :', error);
                });
        });
    } else {
        console.warn('Service Worker not supported by this browser.');
    }
};
