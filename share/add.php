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

function saveToken($id, $token, $expirationTime) {
    if ($token != '' && $expirationTime != '')  {
        $data = "\n$id|$token|$expirationTime";
        file_put_contents('tokens.txt', $data, FILE_APPEND);
    }

}
$id = generateUniqueId();
$token =$_POST['token'];
$time = $_POST['time'];
$expirationTime = strtotime("+$time"); 
function generateUniqueId() {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $id = '';
    $length = 16; 
    $charCount = strlen($characters);
    for ($i = 0; $i < $length; $i++) {
        $id .= $characters[rand(0, $charCount - 1)];
    }
    return $id;
}
saveToken($id, $token, $expirationTime);
echo "ID|$id";
?>



