document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();  // Evita que el formulario se envíe automáticamente

    const form = e.target;
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    // Muestra un spinner o mensaje de carga
    Swal.fire({
        title: 'Sending...',
        text: 'Please wait while we process your request.',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
    .then(async (response) => {
        const json = await response.json();
        Swal.close();  // Cierra el spinner
        if (response.ok) {
            Swal.fire({
                title: 'Success!',
                text: 'Your message was sent successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } else {
            Swal.fire({
                title: 'Error!',
                text: json.message || 'There was an error sending your message.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        Swal.fire({
            title: 'Error!',
            text: 'Something went wrong. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    })
    .finally(() => {
        form.reset();  // Reinicia el formulario después de enviar
    });
});
