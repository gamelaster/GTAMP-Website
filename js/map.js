function focusIt(selectElement)
{
	map.panTo(blips[$(selectElement).val()].marker.getPosition());
}

var blips = [];
		
var playerBlipIcon;
var map;
		
function refreshBlips()
{
	$.getJSON( "getMapData.php", function( data ) {
		$("#playersSelect").html("");
		for(var i = 0; i < Object.keys(data).length; i++)
		{
			$("#playersSelect").append("<option value='"+i+"'>"+data[i][0]+" (ID: "+i+")</option>");
			var playerPosition = new google.maps.LatLng((data[i][1] / 100 * 1.7814538585299) - 52.9883372533954, (data[i][2] / 100 * 2.8564453125) - 14.8974609375);
			var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">'+data[i][0]+' (ID: ' + i + ')</h1>'+
      '<div id="bodyContent">'+
      '<p><ul>' +
			'<li><b>Health:</b> ' + data[i][4] + '%</li>'+
			'<li><b>Armor:</b> ' + data[i][5] + '%</li>'+
			'</ul></p>'+
      '</div>'+
      '</div>';
			if(blips[i] == undefined)
			{
				blips[i] = [];
				blips[i].marker = new google.maps.Marker({
					position: playerPosition,
					map: map,
					icon: playerBlipIcon,
				});
				blips[i].marker.icon.fillColor = '#' + data[i][3].toString(16);
				blips[i].marker.id = i;
				
				blips[i].infoWindow = new google.maps.InfoWindow({
					content: contentString
				});
				
				blips[i].marker.addListener('click', function(info) {
					console.log(info);
					blips[this.id].infoWindow.open(map, this);
				});
			}
			else
			{
				//blips[i].marker.setPosition(playerPosition);
				blips[i].marker.animateTo(playerPosition, {  easing: "linear",
                                 duration: 5000
                              });
				blips[i].infoWindow.setContent(contentString);
				blips[i].marker.icon.fillColor = '#' + data[i][3].toString(16);
			}
		}
	});
}


function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0},
		streetViewControl: false,
		mapTypeControlOptions: {
      mapTypeIds: ['gta5roadmap',"gta5atlasmap","gta5satellitemap"]
    },
    zoom: 1
  });
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(document.getElementById("players"));
	$("#players").css("display","block");
	jQuery.ajax({
		url: "./js/markerAnimate.js",
		dataType: 'script',
		async: true
	});
	
	playerBlipIcon = {
		path: google.maps.SymbolPath.CIRCLE,
		rotation: 45,
		scale: 6,
		strokeColor: '#000',
		fillColor: '#F00',
		fillOpacity: 1,
		strokeWeight: 2
	};
	
	refreshBlips();
	setInterval(refreshBlips, 5000);	
	
	//-52.9883372533954, -14.8974609375
	//-51.20688339486558,-12.041015625
	//-1.7814538585299, -2.8564453125
	
	var gta5roadMapType = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
        var normalizedCoord = getNormalizedCoord(coord, zoom);
        if (!normalizedCoord) {
          return null;
        }
        var bound = Math.pow(2, zoom);
        return './images/GTAV_ROADMAP_8192x8192' +
            '/' + zoom + '/' + normalizedCoord.x + '/' +
            (bound - normalizedCoord.y - 1) + '.jpg';
    },
    tileSize: new google.maps.Size(256, 256),
    maxZoom: 5,
    minZoom: 0,
    /*radius: 1738000,*/
    name: 'GTA5 Road Map'
  });
	
	var gta5atlasMapType = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
        var normalizedCoord = getNormalizedCoord(coord, zoom);
        if (!normalizedCoord) {
          return null;
        }
        var bound = Math.pow(2, zoom);
        return './images/GTAV_ATLUS_8192x8192' +
            '/' + zoom + '/' + normalizedCoord.x + '/' +
            (bound - normalizedCoord.y - 1) + '.jpg';
    },
    tileSize: new google.maps.Size(256, 256),
    maxZoom: 5,
    minZoom: 1,
    radius: 1738000,
    name: 'GTA5 Atlas Map'
  });
	
	var gta5SatelliteMapType = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
        var normalizedCoord = getNormalizedCoord(coord, zoom);
        if (!normalizedCoord) {
          return null;
        }
        var bound = Math.pow(2, zoom);
        return './images/GTAV_SATELLITE_8192x8192' +
            '/' + zoom + '/' + normalizedCoord.x + '/' +
            (bound - normalizedCoord.y - 1) + '.jpg';
    },
    tileSize: new google.maps.Size(256, 256),
    maxZoom: 5,
    minZoom: 0,
    radius: 1738000,
    name: 'GTA5 Satellite Map'
  });

  map.mapTypes.set('gta5roadmap', gta5roadMapType);
	map.mapTypes.set('gta5atlasmap', gta5atlasMapType);
	map.mapTypes.set('gta5satellitemap', gta5SatelliteMapType);
  map.setMapTypeId('gta5roadmap');
}

function getNormalizedCoord(coord, zoom) {
  var y = coord.y;
  var x = coord.x;

  // tile range in one direction range is dependent on zoom level
  // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
  var tileRange = 1 << zoom;

  // don't repeat across y-axis (vertically)
  if (y < 0 || y >= tileRange) {
    return null;
  }

  // repeat across x-axis
  if (x < 0 || x >= tileRange) {
    x = (x % tileRange + tileRange) % tileRange;
  }
  return {x: x, y: y};
}
