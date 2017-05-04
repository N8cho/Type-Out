<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<title>Type-Out</title>
	<script src="lib/jquery-3.2.0.min.js"></script>
	<script src="lib/jquery-ui-1.12.1.min.js"></script>
	<script src="js/type-out.js"></script>
	<link rel="stylesheet" href="css/type-out.css">
</head>
<body>
	<div id="header">
		<div id="lives">
			<img class="life" width="46px" src="img/heart_full.png">
			<img class="life" width="46px" src="img/heart_full.png">
			<img class="life" width="46px" src="img/heart_full.png">
		</div>
	<!--
		<div class="logo">
			<img class="logo" width="190px" src="img/Type-Out.png" alt="Type-Out">
		</div>
	-->
		<div id="score">0</div> 
	</div>
	<div id="title-screen">
		<div id="content-holder">
			<img class="logo" src="img/Type-Out.png" alt="Type-Out">
			<div id="buttons-holder">
				<div id="start" class="button">START</div>
				<div id="git-hub" class="button"><img src="img/github-logo.png"><span>View on Git-Hub<span></div>
			</div>
		</div>
	</div>
	<div id="main">
	</div>
	<div id="footer">
	</div>
</body>