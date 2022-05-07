<?php

# User entry array declaration

class UserEntry {
    public int $id;
    public string $email;
    public string $name;

    public function __construct(int $id, string $email, string $name)
    {
        $this->id       = $id;
        $this->email    = $email;
        $this->name     = $name;
    }
}

$users = [
    new UserEntry(0, 'dog@example.com', 'user1'),
    new UserEntry(1, 'cat@example.com', 'user2'),
    new UserEntry(2, 'cow@example.com', 'user3')
];

# Validators

function isEmailValid(): bool
{
    return str_contains($_POST['email'], '@');
}

function isPassValid(): bool
{
    return strcmp($_POST['pass1'], $_POST['pass2']) == 0;
}

function doKeysExist(): bool
{
    return  array_key_exists('email', $_POST) &&
            array_key_exists('pass1', $_POST) &&
            array_key_exists('pass2', $_POST);
}

# Looking up the entered email

function checkArr(): bool
{
    global $users;
    foreach ($users as &$a)
        if (strcmp($_POST['email'], $a->email) == 0) return true;

    return false;
}

# Logging

function logToFile(): void
{
    $logfile = fopen('out.log', 'a');
    if ($logfile === false) return;

    $newline = date('d-m-y h:i:s') . " "
        . $_SERVER['REMOTE_ADDR'] . " "
        . http_response_code() . " ";

    if (array_key_exists('email', $_POST))
        $newline .= $_POST['email'];
    $newline .= PHP_EOL;

    fwrite($logfile, $newline);
    fclose($logfile);
}

# Main program logic

function processReq(): void
{
    if (!doKeysExist()) {
        http_response_code(400);
        echo 'Неверный запрос';
        return;
    }

    $exit = false;
    if (!isEmailValid()) {
        http_response_code(400);
        echo 'E-mail должен содержать символ "@".';
        $exit = true;
    }
    if (!isPassValid()) {
        http_response_code(400);
        echo 'Пароли должны совпадать.';
        $exit = true;
    }
    if ($exit) return;

    if (!checkArr()) {
        http_response_code(401);
        echo 'Пользователь не найден.';
        return;
    }

    http_response_code(200);
    echo 'Вход произошел успешно.';
}

processReq();
logToFile();
