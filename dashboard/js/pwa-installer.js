// =================================================
// 1. REJESTRACJA SERVICE WORKERA
//    Poprawiona ścieżka bez ukośnika na początku
// =================================================
if ('serviceWorker' in navigator) {
   window.addEventListener('load', () => {
      // POPRAWKA JEST TUTAJ:
      navigator.serviceWorker
         .register('service-worker.js')
         .then((registration) => {
            console.log('Service Worker zarejestrowany pomyślnie!');
         })
         .catch((error) => {
            console.log(
               'Rejestracja Service Workera nie powiodła się: ',
               error
            );
         });
   });
}

// =================================================
// 2. LOGIKA PRZYCISKÓW INSTALACJI
//    (reszta pliku bez zmian)
// =================================================
let deferredPrompt;
const installButtons = document.querySelectorAll('.pwa-install-button');

const setButtonsVisible = (visible) => {
   installButtons.forEach((button) => {
      button.style.display = visible ? 'block' : 'none';
   });
};

setButtonsVisible(false);

window.addEventListener('beforeinstallprompt', (e) => {
   e.preventDefault();
   deferredPrompt = e;
   setButtonsVisible(true);
});

const handleInstallClick = () => {
   if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
         if (choiceResult.outcome === 'accepted') {
            console.log('Użytkownik zaakceptował instalację');
            setButtonsVisible(false);
         }
         deferredPrompt = null;
      });
   }
};

installButtons.forEach((button) => {
   button.addEventListener('click', handleInstallClick);
});

window.addEventListener('appinstalled', () => {
   console.log('PWA zainstalowana!');
   deferredPrompt = null;
});
