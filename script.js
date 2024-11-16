function handleSubmit() {
  const emailInput = document.getElementById('floatingInputDisabled');
  const nameInput = document.getElementById('floatingName');
  const messageInput = document.getElementById('floatingText');
  const topicSelect = document.getElementById('floatingSelectDisabled');

  const button = document.getElementById('submitBtn');
  const spinner = document.getElementById('btnSpinner');
  const btnText = document.getElementById('btnText');
  const toast = new bootstrap.Toast(document.getElementById('successToast'));

  let isValid = true;
  const errors = [];

  if (!emailInput.value) {
    errors.push('Email is required');
    emailInput.classList.add('is-invalid');
    isValid = false;
  } else if (!isValidEmail(emailInput.value)) {
    errors.push('Please enter a valid email address');
    emailInput.classList.add('is-invalid');
    isValid = false;
  } else {
    emailInput.classList.remove('is-invalid');
    emailInput.classList.add('is-valid');
  }

  if (!nameInput.value.trim()) {
    errors.push('Name is required');
    nameInput.classList.add('is-invalid');
    isValid = false;
  } else {
    nameInput.classList.remove('is-invalid');
    nameInput.classList.add('is-valid');
  }

  if (!messageInput.value.trim()) {
    errors.push('Message is required');
    messageInput.classList.add('is-invalid');
    isValid = false;
  } else {
    messageInput.classList.remove('is-invalid');
    messageInput.classList.add('is-valid');
  }

  if (topicSelect.value === 'Select a topic') {
    errors.push('Please select a topic');
    topicSelect.classList.add('is-invalid');
    isValid = false;
  } else {
    topicSelect.classList.remove('is-invalid');
    topicSelect.classList.add('is-valid');
  }

  if (!isValid) {
    alert(errors.join('\n'));
    return;
  }

  button.disabled = true;
  spinner.classList.remove('d-none');
  btnText.textContent = 'Sending...';

  setTimeout(() => {
    try {
      const formData = {
        email: emailInput.value,
        name: nameInput.value,
        message: messageInput.value,
        topic: topicSelect.value,
      };

      console.log('Form data:', formData);

      emailInput.value = '';
      nameInput.value = '';
      messageInput.value = '';
      topicSelect.value = 'Select a topic';

      [emailInput, nameInput, messageInput, topicSelect].forEach((input) => {
        input.classList.remove('is-valid');
      });

      toast.show();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error sending your message. Please try again.');
    } finally {
      spinner.classList.add('d-none');
      button.disabled = false;
      btnText.textContent = 'Send Message';
    }
  }, 3000);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-container');
  form.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  });
});


// payment.html
const urlParams = new URLSearchParams(window.location.search);
        
        window.onload = function() {
            const title = decodeURIComponent(urlParams.get('title'));
            const price = decodeURIComponent(urlParams.get('price'));
            const description = decodeURIComponent(urlParams.get('description'));
            const image = decodeURIComponent(urlParams.get('image') || '');

            document.getElementById('productTitle').textContent = title;
            document.getElementById('productPrice').textContent = price;
            document.getElementById('productDescription').textContent = description;
            document.getElementById('subtotalPrice').textContent = price;
            
            // Set product image if available
            const productImage = document.getElementById('productImage');
            if (image) {
                productImage.src = image;
            } else {
                productImage.src = 'https://via.placeholder.com/150';
            }
        }

        // Event listener untuk metode pembayaran
        document.querySelectorAll('input[name="payment"]').forEach(radio => {
            radio.addEventListener('change', function() {
                document.getElementById('payButton').disabled = false;
                
                // Highlight selected payment method
                document.querySelectorAll('.payment-method').forEach(method => {
                    method.style.backgroundColor = 'white';
                });
                this.closest('.payment-method').style.backgroundColor = '#f8f9fa';
            });
        });

        function showSpinner() {
            document.getElementById('spinnerOverlay').style.display = 'flex';
        }

        function hideSpinner() {
            document.getElementById('spinnerOverlay').style.display = 'none';
        }

        function processPembayaran() {
            const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
            const productTitle = document.getElementById('productTitle').textContent;
            const productPrice = document.getElementById('productPrice').textContent;
            
            showSpinner();
            
            setTimeout(() => {
                hideSpinner();
                alert(`Pembayaran Berhasil!\n\nDetail Transaksi:\nProduk: ${productTitle}\nHarga: ${productPrice}\nMetode: ${selectedPayment}`);
                kembaliKeHome();
            }, 3000);
        }

        function kembaliKeHome() {
            window.location.href = 'index.html';
        }