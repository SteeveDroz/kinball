<?php

require_once 'initGame.php';

if (!empty($_POST['teams']))
{
    $teams = $_POST['teams'];
    rename(getFileName(), getSaveName($teams));
}
 ?>
