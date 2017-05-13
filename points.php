<?php

require_once('initGame.php');

if (!empty($_POST['teams']) && !empty($_POST['id']) && !empty($_POST['point']))
{
    $teams = $_POST['teams'];
    $id = $_POST['id'];
    $point = $_POST['point'];

    $file = getFileName($teams);
    $game = file_exists($file) ? json_decode(file_get_contents($file)) : initGame($teams);

    if ($point > 0)
    {
        $game->{$id}->points += $point;
    }
    else {
        foreach ($game as $teamId => $team)
        {
            if ($teamId != $id)
            {
                $game->{$teamId}->points -= $point;
            }
        }
    }

    file_put_contents($file, json_encode($game));
    echo json_encode($game);
}

?>
