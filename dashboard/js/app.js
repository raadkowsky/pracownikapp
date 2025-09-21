document.addEventListener('DOMContentLoaded', function () {
   // === SEKCJA 1: SKRYPT DO PODŚWIETLANIA AKTYWNEJ NAWIGACJI ===

   // Sprawdzamy, czy na stronie w ogóle istnieje nawigacja, żeby niepotrzebnie nie uruchamiać skryptu
   const navLinks = document.querySelectorAll('.nav-link');
   if (navLinks.length > 0) {
      console.log('--- Skrypt nawigacji: START ---');
      const currentPage = window.location.pathname;
      console.log('Aktualna ścieżka strony (pathname):', currentPage);
      console.log(`Znaleziono ${navLinks.length} linków w nawigacji.`);

      navLinks.forEach((link) => {
         const linkPath = link.getAttribute('href');
         // Proste sprawdzenie, czy linkPath nie jest pusty, aby uniknąć błędów
         if (linkPath && currentPage.endsWith(linkPath)) {
            console.log(
               `ZNALEZIONO DOPASOWANIE! Dodaję klasę 'active' do linku: "${linkPath}"`
            );
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
         }
      });
      console.log('--- Skrypt nawigacji: KONIEC ---');
   }

   // === SEKCJA 2: SKRYPT DO FORMULARZA REJESTRACJI (SŁUŻBOWY EMAIL) ===

   const hasWorkEmailCheckbox = document.getElementById(
      'has-work-email-checkbox'
   );
   // Sprawdzamy, czy checkbox istnieje na tej stronie
   if (hasWorkEmailCheckbox) {
      const workEmailWrapper = document.getElementById('work-email-wrapper');
      const workEmailInput = document.getElementById('work-email-input');

      hasWorkEmailCheckbox.addEventListener('change', function () {
         if (this.checked) {
            // Pokaż pole i ustaw jako wymagane
            workEmailWrapper.classList.remove('hidden');
            workEmailInput.required = true;
         } else {
            // Ukryj pole, usuń status wymagany i wyczyść wartość
            workEmailWrapper.classList.add('hidden');
            workEmailInput.required = false;
            workEmailInput.value = '';
         }
      });
   }
});
