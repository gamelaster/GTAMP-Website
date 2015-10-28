<?php
$googleMapsApiKey = "AIzaSyCBN7BIbUe7-rsYLtF3uNn9bYIKetHOHAY";
?>
<!DOCTYPE html>
<html>
  <head>
    <style type="text/css">
      html, body { height: 100%; margin: 0; padding: 0; }
      #map { height: 100%; }
			#players {
				-webkit-border-bottom-left-radius: 5px;
				-moz-border-radius-bottomleft: 5px;
				border-bottom-left-radius: 5px;
				background-color: white;
				width: 15%;
				height: 50%;
				display: none;
			}
			
			#players select {
				width: 100%;
				height: 100%;
				-webkit-border-bottom-left-radius: 5px;
				-moz-border-radius-bottomleft: 5px;
				border-bottom-left-radius: 5px;
			}
			
			#players h1 {
				margin: 0;
			}
    </style>
  </head>
  <body>
		<div id="players">
			<h1>Players</h1>
			<select onchange="focusIt(this);" size=2 id="playersSelect">
				
			</select>
		</div>
    <div id="map"></div>
		<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="./js/map.js"></script>
    <script async defer
      src="https://maps.googleapis.com/maps/api/js?key=<?php echo $googleMapsApiKey; ?>&callback=initMap">
    </script>
  </body>
</html>