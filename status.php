<?php
include("config.php");
header('Content-Type: image/png');

if(strtotime("+$serverStatusUpdate seconds",@filemtime("serverStatus.json")) < time())
{
	$ftp = ftp_connect($ftpHost);
	ftp_login($ftp,$ftpUser,$ftpPass);
	ftp_get($ftp,"serverStatus.json",$ftpDir."serverStatus.json", FTP_BINARY);
	ftp_close($ftp);
}

$statusImage = imagecreatefrompng("./images/status1.png");
$data = json_decode(file_get_contents("serverStatus.json"));

$white = imagecolorallocate($statusImage, 255, 255, 255);

//title
imagettftext($statusImage, 20,0, 5, 25, $white, "segoeui.ttf", $data[0]);

//players
imagettftext($statusImage, 20,0, 5, imagesy($statusImage) - 5, $white, "segoeui.ttf", "Players: ". $data[3] ."/". $data[4]);

//map
$dimensions = imagettfbbox(20, 0, "segoeui.ttf", $data[1]);
imagettftext($statusImage, 20,0,  (imagesx($statusImage) - abs($dimensions[4] - $dimensions[0])) - 5, 25, $white, "segoeui.ttf", $data[1]);

//ip address
$dimensions = imagettfbbox(20, 0, "segoeui.ttf", $data[6].":".$data[7]);
imagettftext($statusImage, 20,0, (imagesx($statusImage) - abs($dimensions[4] - $dimensions[0])) - 5, imagesy($statusImage) - 25, $white, "segoeui.ttf", $data[6].":".$data[7]);

//gamemode
$dimensions = imagettfbbox(20, 0, "segoeui.ttf", $data[2]);
imagettftext($statusImage, 20,0, (imagesx($statusImage) - abs($dimensions[4] - $dimensions[0])) - 5, imagesy($statusImage) - 5, $white, "segoeui.ttf", $data[2]);

imagepng($statusImage);
imagedestroy($statusImage);
?>