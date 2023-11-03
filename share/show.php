<?php

function checkAndDeleteExpiredTokens() {
    $lines = file('tokens.txt', FILE_IGNORE_NEW_LINES);
    $currentTime = time();
    $updatedLines = array();

    foreach ($lines as $line) {
        list($id, $token, $expirationTime) = explode('|', $line);
        if ($currentTime < (int)$expirationTime) {
            $updatedLines[] = "$id|$token|$expirationTime";
        }
    }
    file_put_contents('tokens.txt', implode("\n", $updatedLines));
}

checkAndDeleteExpiredTokens();

function checkToken($id) {
    $lines = file('tokens.txt', FILE_IGNORE_NEW_LINES);
    foreach ($lines as $line) {
        list($savedId, $token, $expirationTime) = explode('|', $line);
        if ($id == $savedId) {
            $currentTime = time();
            if ($currentTime < $expirationTime) {
                return $token;
            } else {
                return "ссылка устарела";
            }
        }
    }
    return "ссылка не найдена";
}

$idToCheck = $_POST['token'];
$token = checkToken($idToCheck);
echo "TOKEN|$token";
?>