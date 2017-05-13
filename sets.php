<?php

require_once('initGame.php');

if (!empty($_POST['teams']) && !empty($_POST['id']) && !empty($_POST['set']))
{
    $teams = $_POST['teams'];
    $id = $_POST['id'];
    $set = $_POST['set'];

    $file = getFileName();
    $game = file_exists($file) ? json_decode(file_get_contents($file)) : initGame($teams);

    $game->{$id}->sets += $set;

    foreach ($game as $team) {
        $team->points = 0;
    }

    file_put_contents($file, json_encode($game));
    echo json_encode($game);
}

?>
