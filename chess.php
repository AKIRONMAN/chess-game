<?php
	include("connect.inc.php");
?>

<!DOCTYPE html>
<html>
	</head>
	<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet"/>
		<link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet"/>
		<link href="chess2.css" rel="stylesheet" type="text/css"/>
		<style>
			#msg{
				color:black;
				background:white;
				padding:10px 10px 10px 10px;
				border-radius:20px;
				font-weight:bold;
				font-family:Lato;
			}
			table{
				
			}
			body{
				!animation:main 15s infinite linear;
				height:700px;
			}
			@keyframes main{
				0%{transition:1s;opacity:0.7;background:linear-gradient(to right ,#8e44ad,#2ecc71,#e74c3c);}
				20%{transition:1s;opacity:1;background:linear-gradient(to right ,#2ecc71,#8e44ad,#e74c3c);}
				50%{transition:1s;opacity:0.7;background:linear-gradient(to right ,#2ecc71,#e74c3c,#8e44ad);}
				80%{transition:1s;opacity:1;background:linear-gradient(to right ,#e74c3c,#2ecc71,#8e44ad);}
				100%{transition:1s;opacity:0.4;background:linear-gradient(to right ,#8e44ad,#e74c3c,#2ecc71);}
				
			}
			#logout{
				margin-top:-10px;
			}
			a,h2{
				text-decoration:none;
				color:black;
				transition:1s;
				font-size:20px;
				font-family:Montserrat;
				font-weight:bold;
				padding:5px 160px 5px 100px;
				cursor:pointer;
			}
			a:hover,h2:hover{
				transition:1s;
				background:rgba(0,0,0,0.3);
				color:#ecf0f1;
			}
			#h2{
				width:300px;
				padding:0px 0px 5px 20px;
				border-bottom:2px solid rgba(0,0,0,0.6);
			}
			#h2:hover{
				background:white;
				color:black;
			
			}
			button{
				transition:1s;
				font-size:25px;
				border:none;
				cursor:pointer;
				background:#e74c3c;
				padding:10px 10px 10px 10px;
				border:3px solid transparent;
			}
			button:hover{
				transition:1s;
				border:3px solid #e74c3c;
				color:#e74c3c;
				background:white;
			}
			input{
				padding:10px 5px 5px 10px;
			}
			.mainlist{
				position:absolute;
				margin-top:-2%;
				margin-left:-200%;
				z-index:2;
				color:black;
				background:white;
				box-shadow:0px 0px 10px rgba(0,0,0,0.7);
				height:auto;
			}
			.button div{
				width:20px;
				margin:3px;
				border:2px solid black;
			}
			.button{
				position:absolute;
				cursor:pointer;
				padding:5px 5px 5px 5px;
				border-radius:5px;
				border:2px solid #2c3e50;
			}
			h1{
				
				font-weight:bold;
				font-family:Lato;
			}
			#profile,#request,#acce{
				background:white;
				position:fixed;
				margin:10% 10% 0% 15%;
				border-radius:20px;
				padding:0px 30px 20px 30px;
				width:30%;
				box-shadow:5px 5px 5px  rgba(0,0,0,0.7);
			}
			#profile p{
					border-bottom:2px solid rgba(0,0,0,0.7);
					width:100%;
					margin-top:-5%;
			}
			#profile button{
				margin-left:65%;
				margin-top:-20%;
				position:absolute;
				margin-bottom:20px;
			}
			#profile pre{
				font-size:20px;
				font-family:Montserrat;
				line-height:40px;
			}
		</style>
	</head>
	<body>
		<h1 class="white" id="change"> White turn</h1>
		<h1 class="white B" id="B" style="">Black :</h1>
		<h1 class="white" id="W"> White :</h1>
		<div class="main" id="mainw" style="margin-top:-200%;">
			<h1>CHOSE any one with play again</h1>
		<div class="card">
		</div>
		<div class="card">
		</div>
		<div class="card">
		</div>
		<div class="card">
		</div>
		<div class="card">
		</div>
		<div class="card">
		</div>
		<div class="card">
		</div>
		</div>
		<div class="button" onmouseover="MyPList(1);">
			<div></div>
			<div></div>
			<div></div>
		</div>
		<div class="mainlist" id="list" style="position:absolute;" onclick="myplist();">
			<h1 style="color:black;font-weight:bold;font-family:Lato;"> &nbsp;&nbsp;Chose Any Player</h1>
				<h2 onclick="myplist();" id="h2"> Hello <?php echo $_SESSION['name'];?></h2>
				<h2 onclick="displayP();"> Profile </h2>
				<h3 id="logout"><a href="logout.php">Logout</a></h3>
				<div id="mlist" onclick="myplist();">
				</div>
			
		</div>	
		<div class="main" id="mainb" style="margin-top:-200%;">
			<div class="card">
			</div>
			<div class="card">
			</div>
			<div class="card">
			</div>
			<div class="card">
			</div>
			<div class="card">
			</div>
			<div class="card">
			</div>
			<div class="card">
			</div>
		</div>
		</div>
		<div id="profile" style="opacity:0;position:absolute;z-index:-2;">
				<pre>
				<?php
					echo "<p>Hi ".$_SESSION['name']."<br/></p>";
					echo "<i>Name              ".$_SESSION['name'];
					echo "<br/>Password        ".$_SESSION['pass'];
					$Q="SELECT `wins` FROM `chess` WHERE  `name`='".$_SESSION['name']."' AND '".$_SESSION['pass']."'";
					$ri=mysql_query($Q);
					$res=mysql_fetch_array($ri);
					echo "<br/>Game Wins    ".$res['wins']."<br/></i>";
				?>
					</pre>
				<button onclick="displayp();">OK</button>
			
		</div>
		<div id="request" style="opacity:0;position:absolute;z-index:-2;">
			<br/><br/>
			<div id="req">
			</div>
			<br/>
			<button onclick="" style="opacity:0;">OK    </button>	
			<button onclick="RA();" style="position:absolute;">OK    </button>
			<button onclick="RU();" style="position:absolute;margin-left:15%;">Cancel</button>
			<br/><br/><br/>
		</div>
		<div id="acce" style="opacity:0;position:absolute;z-index:-2;">
			<br/><br/>
			<div id="accepted">
			
			</div><br/>
			
			<button onclick="Accet();" style="position:absolute;margin-left:10%;">OK</button>
			<br/><br/><br/>
		</div>
		<table  onload="mytrun();" border="1px" cellpadding="px" cellspacing="0px">
			<tr>
				<td onclick="move(1,1);"><font color="black" id="a" style="position:absolute;" onclick="fun(1,1,'rook','B',0,9820,'a');">&#9820;</font></td>
				<td onclick="move(1,2);"><font color="black" id="a" style="position:absolute;" onclick="fun(1,2,'knight','B',0,9822,'a');">&#9822;</font></td>
				<td onclick="move(1,3);"><font color="black" id="a" style="position:absolute;" onclick="fun(1,3,'bishop','B',0,9821,'a');">&#9821;</font></td>
				<td onclick="move(1,4);"><font color="black" id="a" style="position:absolute;" onclick="fun(1,4,'king','B',0,9818,'a');">&#9818;</font></td>
				<td onclick="move(1,5);"><font color="black" id="a" style="position:absolute;" onclick="fun(1,5,'queen','B',0,9819,'a');">&#9819;</font></td>
				<td onclick="move(1,6);"><font color="black" id="b" style="position:absolute;" onclick="fun(1,6,'bishop','B',0,9821,'b');">&#9821;</font></td>
				<td onclick="move(1,7);"><font color="black" id="b"style="position:absolute;" onclick="fun(1,7,'knight','B',0,9822,'b');">&#9822;</font></td>
				<td onclick="move(1,8);"><font color="black" id="b" style="position:absolute;" onclick="fun(1,8,'rook','B',0,9820,'b');">&#9820;</font></td>
			</tr>
			<tr>
				<td onclick="move(2,9);"><font color="black" id="a"style="position:absolute;" onclick="fun(2,9,'pawn','B',1,9823,'a');">&#9823;</font></td>
				<td onclick="move(2,10);"><font color="black" id="b" style="position:absolute;" onclick="fun(2,10,'pawn','B',1,9823,'b');">&#9823;</font></td>
				<td onclick="move(2,11);"><font color="black" id="c" style="position:absolute;" onclick="fun(2,11,'pawn','B',1,9823,'c');">&#9823;</font></td>
				<td onclick="move(2,12);"><font color="black" id="d" style="position:absolute;" onclick="fun(2,12,'pawn','B',1,9823,'d');">&#9823;</font></td>
				<td onclick="move(2,13);"><font color="black" id="e" style="position:absolute;" onclick="fun(2,13,'pawn','B',1,9823,'e');">&#9823;</font></td>
				<td onclick="move(2,14);"><font color="black" id="f" style="position:absolute;" onclick="fun(2,14,'pawn','B',1,9823,'f');">&#9823;</font></td>
				<td onclick="move(2,15);"><font color="black" id="g" style="position:absolute;" onclick="fun(2,15,'pawn','B',1,9823,'g');">&#9823;</font></td>
				<td onclick="move(2,16);"><font color="black" id="h" style="position:absolute;" onclick="fun(2,16,'pawn','B',1,9823,'h');">&#9823;</font></td>
			</tr>
			<tr>
				<td onclick="move(3,17);"></td>
				<td onclick="move(3,18);"></td>
				<td onclick="move(3,19);"></td>
				<td onclick="move(3,20);"></td>
				<td onclick="move(3,21);"></td>
				<td onclick="move(3,22);"></td>
				<td onclick="move(3,23);"></td>
				<td onclick="move(3,24);"></td>
			</tr>
			<tr>
				<td onclick="move(4,25);"></td>
				<td onclick="move(4,26);"></td>
				<td onclick="move(4,27);"></td>
				<td onclick="move(4,28);"></td>
				<td onclick="move(4,29);"></td>
				<td onclick="move(4,30);"></td>
				<td onclick="move(4,31);"></td>
				<td onclick="move(4,32);"></td>
			</tr>
			<tr>
				<td onclick="move(5,33);"></td>
				<td onclick="move(5,34);"></td>
				<td onclick="move(5,35);"></td>
				<td onclick="move(5,36);"></td>
				<td onclick="move(5,37);"></td>
				<td onclick="move(5,38);"></td>
				<td onclick="move(5,39);"></td>
				<td onclick="move(5,40);"></td>
			</tr>
			<tr>
				<td onclick="move(6,41);"></td>
				<td onclick="move(6,42);"></td>
				<td onclick="move(6,43);"></td>
				<td onclick="move(6,44);"></td>
				<td onclick="move(6,45);"></td>
				<td onclick="move(6,46);"></td>
				<td onclick="move(6,47);"></td>
				<td onclick="move(6,48);"></td>
			</tr>
			<tr>
				<td onclick="move(7,49);"><font color="white" id="a" style="position:absolute;" onclick="fun(7,49,'pawn','W',1,9817,'a');">&#9817;</font></td>
				<td onclick="move(7,50);"><font color="white" id="b" style="position:absolute;" onclick="fun(7,50,'pawn','W',1,9817,'b');">&#9817;</font></td>
				<td onclick="move(7,51);"><font color="white" id="c" style="position:absolute;" onclick="fun(7,51,'pawn','W',1,9817,'c');">&#9817;</font></td>
				<td onclick="move(7,52);"><font color="white" id="d" style="position:absolute;" onclick="fun(7,52,'pawn','W',1,9817,'d');">&#9817;</font></td>
				<td onclick="move(7,53);"><font color="white" id="e" style="position:absolute;" onclick="fun(7,53,'pawn','W',1,9817,'e');">&#9817;</font></td>
				<td onclick="move(7,54);"><font color="white" id="f" style="position:absolute;" onclick="fun(7,54,'pawn','W',1,9817,'f');">&#9817;</font></td>
				<td onclick="move(7,55);"><font color="white" id="g" style="position:absolute;" onclick="fun(7,55,'pawn','W',1,9817,'g');">&#9817;</font></td>
				<td onclick="move(7,56);"><font color="white" id="h" style="position:absolute;" onclick="fun(7,56,'pawn','W',1,9817,'h');">&#9817;</font></td>
			</tr>
			<tr>
				<td onclick="move(8,57);"><font color="white" id="a" style="position:absolute;" onclick="fun(8,57,'rook','W',0,9814,'a');">&#9814;</font></td>
				<td onclick="move(8,58);"><font color="white" id="a" style="position:absolute;" onclick="fun(8,58,'knight','W',0,9816,'a');">&#9816;</font></td>
				<td onclick="move(8,59);"><font color="white" id="a" style="position:absolute;" onclick="fun(8,59,'bishop','W',0,9815,'a');">&#9815;</font></td>
				<td onclick="move(8,60);"><font color="white" id="a" style="position:absolute;" onclick="fun(8,60,'king','W',0,9812,'a');">&#9812;</font></td>
				<td onclick="move(8,61);"><font color="white" id="a" style="position:absolute;" onclick="fun(8,61,'queen','W',0,9813,'a');">&#9813;</font></td>
				<td onclick="move(8,62);"><font color="white" id="b" style="position:absolute;" onclick="fun(8,62,'bishop','W',0,9815,'b');">&#9815;</font></td>
				<td onclick="move(8,63);"><font color="white" id="b" style="position:absolute;" onclick="fun(8,63,'knight','W',0,9816,'b');">&#9816;</font></td>
				<td onclick="move(8,64);"><font color="white" id="b" style="position:absolute;" onclick="fun(8,64,'rook','W',0,9814,'b');">&#9814;</font></td>
			</tr>
		</table>
		<font class="refer">&#9813;</font>
		<font class="refer">&#9814;</font>
		<font class="refer">&#9815;</font>
		<font class="refer">&#9816;</font>
		<font class="refer">&#9819;</font>
		<font class="refer">&#9820;</font>
		<font class="refer">&#9821;</font>
		<font class="refer">&#9822;</font>
		<font class="refer">&#9812;</font>
		<font class="refer">&#9818;</font>
		<font class="refer">&#9817;</font>
		<font class="refer">&#9823;</font>

		<div id="msg" class="msg" style="float:right;margin-top:600px; border:2px solid red;opacity:0;">
			hcvnchcncncngcgnc
		</div>
		<div id="onlinechat" style="float:right;margin-right:0%;clear:both;">
			<input type="text" id="ms" style="margin-top:10%;font-weight:bold;font-size:20px;outline:none;border-radius:10px;box-shadow:inset 1px 2px 5px black;"/>
			<button onclick="msg();" >Send</button>
		</div>
		<script type="text/javascript" >
			function MyPList(id){
				var dom=document.getElementById("list");
				var d=document.getElementsByClassName("button");
				var c=d[0].getElementsByTagName("div");
				dom.style.transition="1s";
				dom.style.marginLeft="-1%";
				if(id==1){
					d[0].style.transition="1s";
					d[0].style.background="black";
					c[0].style.border="2px solid white";
					c[1].style.border="2px solid white";
					c[2].style.border="2px solid white";
				}else{
					d[0].style.transition="1s";
					d[0].style.background="white";
					c[0].style.border="2px solid black";
					c[1].style.border="2px solid black";
					c[2].style.border="2px solid black";
				}
			}
			function myplist(){
				MyPList(2);
				var dom=document.getElementById("list");
				dom.style.transition="1s";
				dom.style.marginLeft="-200%";
			}
			function displayP(){
				var dis=document.getElementById("profile");
				dis.style.zIndex="2";
				dis.style.transition="2s"
				dis.style.opacity="1";
				
			}
			function displayp(){
				var dis=document.getElementById("profile");
				dis.style.zIndex="-2";
				dis.style.transition="2s"
				dis.style.opacity="0";
				
			}
		</script>
		<script type="text/javascript" src="chess.js"></script>
	</body>
</html>