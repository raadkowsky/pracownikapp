document.addEventListener('DOMContentLoaded', () => {
   const otpContainer = document.getElementById('otp-container');
   const inputs = [...otpContainer.querySelectorAll('.otp-input')];

   inputs.forEach((input, index) => {
      // Obsługa wklejania kodu
      input.addEventListener('paste', (e) => {
         e.preventDefault();
         const pasteData = e.clipboardData.getData('text').trim();
         if (pasteData.length === inputs.length && /^\d+$/.test(pasteData)) {
            inputs.forEach((box, i) => {
               box.value = pasteData[i];
            });
            inputs[inputs.length - 1].focus();
         }
      });

      // Automatyczne przenoszenie kursora do przodu
      input.addEventListener('input', (e) => {
         if (input.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
         }
      });

      // Obsługa backspace - przenoszenie kursora do tyłu
      input.addEventListener('keydown', (e) => {
         if (e.key === 'Backspace' && input.value.length === 0 && index > 0) {
            inputs[index - 1].focus();
         }
      });
   });
});
