<?php
$players;
$players[0] = array("Ian",0,0,16777215,100,100);
$players[1] = array("James",0,0,16711935,100,100);
$players[2] = array("Johnny",0,0,16777215,100,100);

$s = date("s");

$players[0][1] = 200 + (200 * sin(deg2rad($s * 6)));
$players[0][2] = 200 + (200 * cos(deg2rad($s * 6)));
$players[1][1] = 1000 + (200 * sin(-deg2rad($s * 6)));
$players[1][2] = 1000 + (200 * cos(-deg2rad($s * 6)));
$players[2][1] = 2000 + (200 * sin(deg2rad($s * 6)));
$players[2][2] = 2000 + (200 * cos(deg2rad($s * 6)));

echo json_encode($players);
?>