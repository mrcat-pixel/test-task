async function onButtonClick() {
    clearAllAlerts();
    if (!isFormValid()) return;

    let response = await sendRequest();
    if (response.ok) {
        showAlert(await response.text(), 'alert-success');
        hideInputs();
    } else
        showAlert(await response.text(), 'alert-danger');
}

function sendRequest() {
    return fetch('handler.php', {
        method: 'POST',
        body: new URLSearchParams({
            name1: document.getElementById('tbx_first_name' ).value,
            name2: document.getElementById('tbx_last_name'  ).value,
            email: document.getElementById('tbx_email'      ).value,
            pass1: document.getElementById('tbx_pass'       ).value,
            pass2: document.getElementById('tbx_pass_ver'   ).value
        })
    });
}

function hideInputs() {
    document.getElementById('inputs_panel').style.visibility = 'hidden';
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

function clearAllAlerts() {
    document.getElementById('alerts_placeholder').innerHTML = "";
}