<?php include("config.php"); ?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Your GTA:MP Server</title>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" integrity="sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ==" crossorigin="anonymous">


    <link href="./css/style.css" rel="stylesheet">
  </head>

  <body>

    <div class="container">
			<h1 class="title">Your GTAMP Server</h1>
			<div class="row">
				<div class="col-md-12">
					<center><img src="./status.php"/></center>
				</div>
			</div>
			<div class="row">
				<div class="col-md-9" style="padding: 0 0;" >
					<iframe style="width: 100%; height: 500px;" src="map.php"></iframe>
				</div>
				<div class="col-md-3" style="padding: 0 0;">
					<div id="items" style="overflow-y: scroll; background-color: white; width: 100%; height: 500px">
					</div>
				</div>
			</div>
			<hr>
			<center>&copy; ~GAMiEE#^</center>
		</div>
		<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js" integrity="sha512-K1qjQ+NcF2TYO/eI3M6v8EiNYZfA95pQumfvcVrTHtwQVDG+aHRqLi/ETn2uB+1JqwYqVG3LIvdm9lj6imS/pQ==" crossorigin="anonymous"></script>
		<script>
			$(document).ready(function(){
				refreshNotifies();
				setInterval(refreshNotifies, <?php echo $notifyUpdate * 1000; ?>);
			});
			
			var last_id = 0;
			
			function refreshNotifies()
			{
				$.getJSON("lastNotifyData.json", function(data)
				{
					//alert(data);
					for(var i = data.notifies.length - 1; i >= 0; i--)
					{
						if(data.notifies[i].id <= last_id) continue;
						//console.log(i);
						var item = $("#items").prepend('<div style="display: none;" class="panel panel-default">' +
							'<div class="panel-body">' +
							data.notifies[i].text +
							'</div>' +
						'</div>');
						if(last_id == 0) $("#items > div").first().css("display","block");
						else $("#items > div").first().slideDown("slow");
					}
					last_id = data.last_id;
				});
			}
		</script>
	</body>
</html>
