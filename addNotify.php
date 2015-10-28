<?php
include("config.php");
$accessHash = isset($_POST["accessHash"]) ? $_POST["accessHash"] : "";
if($accessHash != $secretVerifyHash) exit();
$lastNotify = json_decode(file_get_contents("lastNotifyData.json"));
$newNotify = array();
$text = "";
switch($_POST["type"])
{
	case "connect":
		$text = "Player $_POST[name] connected to server!";
	break;
	case "disconnect":
		$text = "Player $_POST[name] disconnected from server!";
	break;
	case "kill":
		$text = "Player $_POST[name] has been killed by $_POST[killername]!";
	break;
}
if(empty($newNotify["notifies"])) $newNotify["notifies"] = array();
array_push($newNotify["notifies"], array("id" => $lastNotify->last_id + 1, "text" => $text));
for($i = 0; $i < 5; $i++)
{
	if(empty($lastNotify->notifies[$i])) continue;
	array_push($newNotify["notifies"], array("id" => $lastNotify->notifies[$i]->id, "text" => $lastNotify->notifies[$i]->text));
}
$newNotify["last_id"] = $lastNotify->last_id + 1;
file_put_contents("lastNotifyData.json",json_encode($newNotify));
?>