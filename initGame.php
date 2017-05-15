<?php

function initGame($teams)
{
    $game = new stdClass();
    for ($i = 0; $i < count($teams); $i++)
    {
        $game->{$i + 1} = (object)['name' => $teams[$i], 'points' => 0, 'sets' => 0];
    }

    $game->finished = false;

    return $game;
}

function getFileName()
{
    return 'games/current-game.json';
}
?>
