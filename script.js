async function onButtonClick() {
    document.getElementById('alerts_placeholder').innerHTML = ""; // clear all alerts
    if (!isFormValid()) return;

    let response = await fetch('handler.php', {
        method: 'POST',
        body: new FormData(document.getElementById("input_form"))
    });

    if (response.ok) {
        showAlert(await response.text(), 'alert-success');
        document.getElementById('inputs_panel').style.display = 'none';
    }
    else showAlert(await response.text(), 'alert-danger');
}

function isFormValid() {
    let fill = areFieldsFilledIn(), email = isEmailValid(), pass = isPassValid();

    if (!fill)  showAlert('Все поля должны быть заполнены.',        'alert-warning');
    if (!email) showAlert('E-mail должен содержать символ "@".',    'alert-warning');
    if (!pass)  showAlert('Пароли должны совпадать.',               'alert-warning');

    return fill && email && pass;
}

function isPassValid() {
    return  document.getElementById('tbx_pass').value ===
            document.getElementById('tbx_pass_ver').value;
}

function isEmailValid() {
    return  document.getElementById('tbx_email').value.includes('@');
}

function areFieldsFilledIn() {
    return  document.getElementById('tbx_first_name'    ).value !== '' &&
            document.getElementById('tbx_last_name'     ).value !== '' &&
            document.getElementById('tbx_email'         ).value !== '' &&
            document.getElementById('tbx_pass'          ).value !== '' &&
            document.getElementById('tbx_pass_ver'      ).value !== '';
}

function showAlert(msg, style) {
    document.getElementById("alerts_placeholder").innerHTML +=

        '<div class="alert ' + style + ' alert-dismissible" role="alert">' +
            '<button class="btn-close" type="button" data-bs-dismiss="alert" aria-label="Close"></button>' +
            '<span>' + msg + '<\span>' +
        '</div>';
}