<?php

require_once('initGame.php');

if (!empty($_GET['teams']))
{
    $teams = $_GET['teams'];

    $file = getFileName();
    $game = file_exists($file) ? json_decode(file_get_contents($file)) : initGame($teams);

    echo json_encode($game);
}
?>
