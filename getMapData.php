<?php
include("config.php");
if(strtotime("+$mapUpdate seconds",@filemtime("mapData.json")) > time()) die(file_get_contents("mapData.json"));
$ftp = ftp_connect($ftpHost);
ftp_login($ftp,$ftpUser,$ftpPass);
ftp_get($ftp,"mapData.json",$ftpDir."mapData.json", FTP_BINARY);
ftp_close($ftp);
echo file_get_contents("mapData.json");
?>