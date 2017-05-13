<?php

require_once('initGame.php');

if (!empty($_POST['teams']))
{
    $teams = $_POST['teams'];

    $file = getFileName();
    $game = initGame($teams);

    file_put_contents($file, json_encode($game));
    echo 'OK';
}
?>
