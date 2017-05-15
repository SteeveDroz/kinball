<?php

require_once('initGame.php');

if (!empty($_POST['teams']) && !empty($_POST['id']) && !empty($_POST['point']))
{
    $teams = $_POST['teams'];
    $id = $_POST['id'];
    $point = $_POST['point'];

    $file = getFileName($teams);
    $game = file_exists($file) ? json_decode(file_get_contents($file)) : initGame($teams);

    $first = -1;
    $firstPoints = 0;
    $last  = -1;
    $lastPoints = PHP_INT_MAX;
    foreach ($game as $teamId => $team)
    {
        if ($team->points > $firstPoints)
        {
            $first = $teamId;
            $firstPoints = $team->points;
        }
        if ($team->points < $lastPoints)
        {
            $last = $teamId;
            $lastPoints = $team->points;
        }
    }

    $disabledTeam = $firstPoints > 10 ? $last : -1;

    foreach ($game as $teamId => $team)
    {
        if ($teamId != $id && $teamId != $disabledTeam)
        {
            $game->{$teamId}->points += $point;
        }
    }

    foreach ($game as $teamId => $team)
    {
        if ($team->points > 12)
        {
            $game = nextPeriod($game);
            $team->sets++;
            break;
        }
    }

    file_put_contents($file, json_encode($game));
    echo json_encode($game);
}

function nextPeriod($game)
{
    foreach ($game as $teamId => $team)
    {
        $team->points = 0;
    }

    return $game;
}

?>
