// Upewnij się, że cały kod wykona się dopiero po załadowaniu strony
window.addEventListener('DOMContentLoaded', () => {
   // --- 1. Logika dla checkboxa i pola email ---
   const emailCheckbox = document.getElementById('has-work-email-checkbox');
   const emailWrapper = document.getElementById('work-email-wrapper');
   const emailInput = document.getElementById('work-email-input');

   // Sprawdzaj zmiany w checkboxie
   emailCheckbox.addEventListener('change', () => {
      // Jeśli checkbox jest zaznaczony...
      if (emailCheckbox.checked) {
         emailWrapper.classList.remove('hidden'); // Pokaż pole email
         emailInput.required = true; // Ustaw je jako wymagane
      } else {
         emailWrapper.classList.add('hidden'); // Ukryj pole email
         emailInput.required = false; // Ustaw je jako niewymagane
         emailInput.value = ''; // Wyczyść pole, jeśli ktoś coś wpisał
      }
   });

   // --- 2. Logika walidacji całego formularza przy próbie przejścia dalej ---
   const form = document.getElementById('registration-form');
   const submitLink = form.querySelector('a[href="register-agreements.html"]'); // Znajdź link "Przejdź dalej"

   submitLink.addEventListener('click', (event) => {
      // Sprawdź, czy formularz jest poprawny według wbudowanych reguł przeglądarki
      // (sprawdzi wszystkie pola z atrybutem "required" i "pattern")
      if (form.checkValidity() === false) {
         // Jeśli formularz NIE jest poprawny:
         event.preventDefault(); // ZABLOKUJ przejście do następnej strony

         // Sztuczne "kliknięcie" w niewidoczny przycisk submit,
         // aby przeglądarka pokazała, które pola są niepoprawne.
         // To standardowa technika.
         const tempSubmit = document.createElement('button');
         tempSubmit.type = 'submit';
         tempSubmit.style.display = 'none';
         form.appendChild(tempSubmit);
         tempSubmit.click();
         form.removeChild(tempSubmit);

         alert('Proszę wypełnić wszystkie wymagane pola poprawnie.');
      }
      // Jeśli formularz JEST poprawny, link zadziała normalnie i użytkownik przejdzie dalej.
   });
});
