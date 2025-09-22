// =================================================
// 1. REJESTRACJA SERVICE WORKERA
//    Ten kod aktywuje plik service-worker.js,
//    który odpowiada za działanie offline.
// =================================================
if ('serviceWorker' in navigator) {
   window.addEventListener('load', () => {
      navigator.serviceWorker
         .register('/service-worker.js')
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
//    Ten kod obsługuje przechwytywanie monitu
//    instalacyjnego i pokazywanie go po kliknięciu.
// =================================================
let deferredPrompt;
// Znajdź WSZYSTKIE przyciski instalacji za pomocą wspólnej klasy
const installButtons = document.querySelectorAll('.pwa-install-button');

// Funkcja do pokazywania/ukrywania przycisków
const setButtonsVisible = (visible) => {
   installButtons.forEach((button) => {
      button.style.display = visible ? 'block' : 'none';
   });
};

// Na starcie ukryj wszystkie przyciski
setButtonsVisible(false);

window.addEventListener('beforeinstallprompt', (e) => {
   e.preventDefault();
   deferredPrompt = e;
   // Pokaż wszystkie przyciski, gdy aplikacja jest instalowalna
   setButtonsVisible(true);
});

// Funkcja obsługująca kliknięcie (ta sama dla wszystkich przycisków)
const handleInstallClick = () => {
   if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
         if (choiceResult.outcome === 'accepted') {
            console.log('Użytkownik zaakceptował instalację');
            // Ukryj przyciski po udanej instalacji
            setButtonsVisible(false);
         }
         deferredPrompt = null;
      });
   }
};

// Dodaj to samo zdarzenie 'click' do każdego przycisku
installButtons.forEach((button) => {
   button.addEventListener('click', handleInstallClick);
});

window.addEventListener('appinstalled', () => {
   console.log('PWA zainstalowana!');
   deferredPrompt = null;
});
