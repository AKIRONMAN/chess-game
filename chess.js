
	var count=0;/*counter*/
	var trun;/*turn*/
	var setColor;/*set color of player*/
	var name;/*set a name */
	var Wone;
	var start=0;
	var CodeName;
	var Colmnno;/*For pawn*/
	var Rowno;/*For pawn*/
	var rcolm;/*Total no of colmn*/
	var cno;/*at time col no.*/
	var rno;/*at time rno.*/
	var checkp;/*For pawn*/
	var cot;
	var PicesB=["B"];
	var PicesBN=["Bn"];
	var PicesW=["W"];
	var Arpw;
	var Arpb;
	var PicesWN=["Wn"];
	var checktrun;
	var movetrun;
	var namep2;
	var tdc=document.getElementsByTagName("td");/*all no of td in the game*/
	var tr=document.getElementsByTagName("tr");/*total no of tr in the game*/
	var list;
	var checkR=setInterval(checkR,700);
	var msgS=setInterval(msgS,700);
	var checkA=setInterval(checkA,1000);
	var cop=0;
	window.onload =function(){
		trun="W";
		load();
		refresh();
		list=setInterval(load,500);
		
	}
	function wins(){
		var xml=new XMLHttpRequest();
		xml.onreadystatechange=function(){
			
			
		}
		xml.open("GET","win.php?checkwin=1",true);
		xml.send();
	}
	function msg(){
		if(start==1){
			var a=document.getElementById("ms");
			var b=document.getElementById("msg");
			msg.innerHTML=a.value;
			var xml=new XMLHttpRequest();
			xml.open("GET","msg.php?message=1&msg="+a.value+"&name="+namep2,true);
			xml.send();
		}
	}
	function msgS(){
		var b=document.getElementById("msg");
		if(start==1){
			var xml=new XMLHttpRequest();
			xml.onreadystatechange=function(){
				if(xml.responseText=="" || xml.responseText==" " || xml.responseText=="undefined"){
					b.style.transition="60s";
					b.style.opacity="0";
				}
				else{
					display();
					b.innerHTML=xml.responseText;
				}
			}
			xml.open("GET","msg.php?mesg=1&ms="+b.innerHTML,true);
			xml.send();
		}
	}
	function display(){
		var b=document.getElementById("msg");
		b.style.transition="1s";
		b.style.opacity="1";
	}
	function fun(row,colm,nam,col,check,cname,W){
		Recolor();
		var color;
		name=nam;
		console.log(name);
		cno=colm-1;
		Wone=W;
		if(name=="pawn"){
			Colmnno=colm;
			Rowno=row;
		}
		checkp=check;
		rno=row-1;
		setColor=col;
		CodeName=cname;
		console.log(Wone);
		if(col==trun){
			if(count%2==0){
				color="red";
			}
			else{/*starting Recoloring*/ 
				color="";
				Recolor();
			}/*Finishing of Recoloring*/
			if(row>1){
				val=(row-1)*8;
			}
			if(colm>8){
				colm=colm-val;
			}
			rcolm=colm-1;
			if(name=="rook"){
				Rook(color);/*For rook*/
			}
			else if(name=="king"){
				King();/*For rook*/
			}
			else if(name=="bishop"){
				Bishop(color);/*For rook*/
			}
			else if(name=="queen"){
				Queen(color);/*For rook*/
			}
			else if(name=="knight"){
				Knight(color);/*For rook*/
			}
			else{
				Pawn(color);/*For rook*/
			}
			count++;
		}
	}
	function load(){
		var xml= new XMLHttpRequest();
		var no=document.getElementsByClassName("l");
		xml.onreadystatechange=function(){
			if(xml.responseText=="" || xml.responseText=="undefined" || xml.responseText==" "){}
			else{
				
				document.getElementById("mlist").innerHTML=xml.responseText;
			}
		}
		xml.open("GET","load.php?load=1&n="+no.length,true);
		xml.send();
	}
		function refresh(){
			var xml= new XMLHttpRequest();
			var no=document.getElementById("mlist");
			var n=no.getElementsByClassName("l");
			xml.onreadystatechange=function(){
				if(xml.responseText=="" || xml.responseText==" " || xml.responseText=="undefined"){}
				else{
					var moves=xml.responseText.split("|");
					var p1=moves[2].split("-");
					var p2=moves[3].split("-");
					var se=moves[4].split("-");
					var se1=moves[5].split("-");
					var j=0;
					if(se!=""){
						while(j<se.length){
							var g;
							if(se[j]!=""){
								g=eval(se[j]);
							}
							tdc[g].innerHTML="";
							j++;
						}
					}
					if(se1!=""){
						var j=0;
						while(j<se1.length){
							var g;
							if(se1[j]!=""){
								g=eval(se1[j]);
							}
							tdc[g].innerHTML="";
							j++;
						}
					}
					console.log(p1);
					console.log(p2);
						kq("king",p1[0],p2[0],moves[0],moves[1]);
						kq("queen",p1[1],p2[1],moves[0],moves[1]);
						pawn("pawn",p1[5],p2[5],moves[0],moves[1]);
						brk("bishop",p1[2],p2[2],moves[0],moves[1]);
						brk("rook",p1[3],p2[3],moves[0],moves[1]);
						brk("knight",p1[4],p2[4],moves[0],moves[1]);
				}
			}
			xml.open("GET","refresh.php?refresh=1",true);
			xml.send();
		}
		function kq(namev,p1,p2,colorp1,colorp2){
			var n=0,ch=0;
			var p1c,p2c;
			if(colorp1=="W"){
				p1c="white";
				p2c="black";
			}else{
				p2c="white";
				p1c="black";
			}
			while(n<2){
				var c,s=0,d,Vking;
				if(n==0){
					if(p1!="" && p1!="x"){	
						Vking=p1.split(":");
						c=p1c;
						d=colorp1;
						s=1;
					}else{}
				}else{
					if(p1!="" && p1!="x"){	
						Vking=p2.split(":");
						c=p2c;
						d=colorp2;
						s=1;
					}else{}
				}
				if(s!=0){
					var a=eval(Vking[2]);
					console.log(a);
					tdc[a].innerHTML="";
					m="<font color='"+c+"' id='"+Vking[4]+"' style="+"'position:absolute;'"+ "onclick="+"fun("+eval(Vking[1])+","+(eval(Vking[0]))+",'"+namev+"','"+d+"','"+ch+"',"+eval(Vking[3])+",'"+Vking[4]+"');>&#"+eval(Vking[3])+";</font>";
					var c=eval(Vking[0])-1;
					tdc[c].innerHTML=m;
				}else{}
				n++;
			}
		}
		function brk(namev,p1,p2,colorp1,colorp2){
			var n=0,ch=0;
			var p1c,p2c;
			if(colorp1=="W"){
				p1c="white";
				p2c="black";
			}else{
				p2c="white";
				p1c="black";
			}
			while(n<2){
				var Vking,Valk;
				var c,d,v=0;
				if(n==0){
					if(p1!=""){
						Valk=p1.split(",");
						while(v<2){ 
							Vking=Valk[v].split(":"); 
							 c=p1c;
							 d=colorp1;
							if(Valk[v]!=""  && Valk[v]!="x"){
								var a=eval(Vking[2]);
								console.log(a);
								tdc[a].innerHTML="";
								m="<font color='"+c+"' id='"+Vking[4]+"' style="+"'position:absolute;'"+ "onclick="+"fun("+eval(Vking[1])+","+(eval(Vking[0]))+",'"+namev+"','"+d+"','"+ch+"',"+eval(Vking[3])+",'"+Vking[4]+"');>&#"+eval(Vking[3])+";</font>";
								var c=eval(Vking[0])-1;
								tdc[c].innerHTML=m;
							}else{}
							v++;
						}
					}
				}else{	
					if(p2!=""){
						Valk=p2.split(",");
						while(v<2){ 
							Vking=Valk[v].split(":"); 
							 c=p2c;
							 d=colorp2;
							if(Valk[v]!="" && Valk[v]!="x"){
								var a=eval(Vking[2]);
								console.log(a);
								tdc[a].innerHTML="";
								m="<font color='"+c+"' id='"+Vking[4]+"' style="+"'position:absolute;'"+ "onclick="+"fun("+eval(Vking[1])+","+(eval(Vking[0]))+",'"+namev+"','"+d+"','"+ch+"',"+eval(Vking[3])+",'"+Vking[4]+"');>&#"+eval(Vking[3])+";</font>";
								var c=eval(Vking[0])-1;
								tdc[c].innerHTML=m;
							}else{}
							v++;
						}
					}
				}
				n++;
			}
		}
		function pawn(namev,p1,p2,colorp1,colorp2){
			var n=0,ch=0;
			var p1c,p2c;
			if(colorp1=="W"){
				p1c="white";
				p2c="black";
			}else{
				p2c="white";
				p1c="black";
			}
			while(n<2){
				var Vking,Valk,setval;
				var c,d,v=0;
				if(n==0){
					 if(p1!=""){
						Valk=p1.split(",");
						while(v<8){ 
							if(Valk[v]!="" && Valk[v]!="x"){
								Vking=Valk[v].split(":");  
								 c=p1c;
								 d=colorp1;
								var a=eval(Vking[2]);
								console.log(a);
								tdc[a].innerHTML="";
								m="<font color='"+c+"' id='"+Vking[4]+"' style="+"'position:absolute;'"+ "onclick="+"fun("+eval(Vking[1])+","+(eval(Vking[0]))+",'"+namev+"','"+d+"','"+ch+"',"+eval(Vking[3])+",'"+Vking[4]+"');>&#"+eval(Vking[3])+";</font>";
								var c=eval(Vking[0])-1;
								tdc[c].innerHTML=m;
							}else{}
							v++;
						}
					}
				}else{
					if(p2!=""){
						Valk=p2.split(",");
						while(v<8){ 
							if(Valk[v]!="" && Valk[v]!="x"){
								Vking=Valk[v].split(":"); 
								c=p2c;
								d=colorp2;
								var a=eval(Vking[2]);
								console.log(a);
								tdc[a].innerHTML="";
								m="<font color='"+c+"' id='"+Vking[4]+"' style="+"'position:absolute;'"+ "onclick="+"fun("+eval(Vking[1])+","+(eval(Vking[0]))+",'"+namev+"','"+d+"','"+ch+"',"+eval(Vking[3])+",'"+Vking[4]+"');>&#"+eval(Vking[3])+";</font>";
								var c=eval(Vking[0])-1;
								tdc[c].innerHTML=m;
							}else{}
							v++
						}
					}
				}
				n++;
			}
		}
		function request(name){
			namep2=name;
			var xml= new XMLHttpRequest();
			xml.onreadystatechange=function(){
				console.log(xml.responseText);
				
			}
			xml.open("GET","load.php?request=1&name="+namep2,true);
			xml.send();
		}
		function checkR(){
			var xml= new XMLHttpRequest();
			xml.onreadystatechange=function(){
			
				if(xml.responseText=="no"){
				}else if(xml.responseText!=""){
					var b=xml.responseText.split("-");
					var dis=document.getElementById("request");
					var dis1=document.getElementById("req");	
						dis1.innerHTML="Do you want play with "+b[0]+"?";
						dis.style.zIndex="2";
						dis.style.transition="1s";
						dis.style.opacity="1";
						namep2=b[0];
						ttrun=b[1];
				}
				else{}
			}
			xml.open("GET","load.php?checkR=1",true);
			xml.send();
		}
		function RA(){
			var xml=new XMLHttpRequest();
			xml.onreadystatechange=function(){
			trun="a";
			start=1;
			cot=2;
			var dis=document.getElementById("request");
				dis.style.zIndex="-2";
				dis.style.transition="1s";
				dis.style.opacity="0";
				
				checktrun = setInterval(checktrun,1000);
				clearInterval(checkA);
				clearInterval(checkR);
			}
			xml.open("GET","load.php?Accepted=1",true);
			xml.send();
			
		}
		function RU(){
			var xml=new XMLHttpRequest();
			xml.onreadystatechange=function(){
				var dis=document.getElementById("request");
					dis.style.zIndex="-2";
					dis.style.transition="1s";
					dis.style.opacity="0";
				namep2="";
				ttrun="";
			}
			xml.open("GET","load.php?Unaccepted=1",true);
			xml.send();
		}
		function checkA(){
			var xml= new XMLHttpRequest();
			var no=document.getElementById("mlist");
			xml.onreadystatechange=function(){
				if(xml.responseText=="no"){
				}else if(xml.responseText!=""){
					if(xml.responseText=="deniend"){
					var dis=document.getElementById("acce");
						dis.style.zIndex="2";
						dis.style.transition="1s";
						dis.style.opacity="1";
					var dis1=document.getElementById("accepted");
						dis1.innerHTML="HE/SHE "+xml.responseText+"Your Request";
					}else{
						
					var dis=document.getElementById("acce");
						dis.style.zIndex="2";
						dis.style.transition="1s";
						dis.style.opacity="1";
						var dis1=document.getElementById("accepted");
						dis1.innerHTML=xml.responseText+"Is Ready To Play With You!";
						namep2=xml.responseText;
						ttrun=trun;
						start=1;
						cot=0;
						movetrun = setInterval(movetrun,1000);
						clearInterval(checkR);
						clearInterval(checkA);
						
					}
				}else{}
			}
			xml.open("GET","load.php?checkA=1",true);
			xml.send();
		}
		function Accet(){
			var dis=document.getElementById("acce");
				dis.style.zIndex="-2";
				dis.style.transition="1s";
				dis.style.opacity="0";
		}
	/*function of King*/
	function King(Color){
	var v1;
		if(Color!=''){
			for(var i=rno-1;i<=rno+1;i++){
				if(i==rno || (i==(rno-1) && rno!=0) || i==(rno+1)){
					var td=tr[i].getElementsByTagName("td");
				
					if(i==rno){
						v1=1;	
					}else{
						v1=2;
					}
					for(var j=rcolm-1;j<=rcolm+1;j++){
						if((v1==2 && j==rcolm) || j==rcolm-1 || j==rcolm+1){
							if(td[j].innerHTML==""){
								td[j].style.background="red";
								td[j].style.opacity="0.5";	
								
							}
							else{
								var ColorFont=td[j].getElementsByTagName("font");
								if((setColor=="W" && ColorFont[0].color=="white") || (setColor=="B" && ColorFont[0].color=="black")){
								}
								else{
									td[j].style.background="red";
									td[j].style.opacity="0.5";	
									
								}
							}
						}
					}
				}	
			}
		}
	}
	/*function of pawn*/
	function Pawn(Color){
		var i=9;
		var p=10;
		var set=1;
		if(setColor=="B"){
			p=rno+1;
			i=p+1;
			if(p>=8){
				set=2;
				come("black");
			}else{
				td=tr[p].getElementsByTagName("td");
			}
		}else{
			 i=rno-1;
			 p=i-1;
			 if(i==-1){
				set=2;
				come("white");
			 }else{
				td=tr[i].getElementsByTagName("td");
			 }
			 
		}
		var b=i;
		console.log(i);
		if(i!=-1 || p!=8 || i!=9 || p!=10){
		if(Color!=''){
			if(set==1){
			if(checkp==1){
				for(var a=p;a<=i;a++){
					if(setColor=="W"){
						var td1=tr[b].getElementsByTagName("td");
						b--;
					}
					else{
						var td1=tr[a].getElementsByTagName("td");
					}
					if(a==rno){
					}
					else{
						if(td1[rcolm].innerHTML==""){
							td1[rcolm].style.background="red";
							td1[rcolm].style.opacity="0.5";
						}else{
							if(td1[rcolm].innerHTML!=""){
								var ColorFont=td1[rcolm].getElementsByTagName("font");
								if((setColor=="W" && ColorFont[0].color=="white") || (setColor=="B" && ColorFont[0].color=="black")){
									break;
								}
								else{
									break;
								}
							}

						}
					}
				}
				for(var j=rcolm-1;j<=rcolm+1;j++){
					if(j!=rcolm){
						if(td[j].innerHTML=="" || td[j].innerHTML=="undefined"){}
						else{
							var ColorFont=td[j].getElementsByTagName("font");
							if((setColor=="W" && ColorFont[0].color=="white") || (setColor=="B" && ColorFont[0].color=="black")){
							}
							else{
								td[j].style.background="red";
								td[j].style.opacity="0.5";
							}
						}
					}
				}
					
			}else{		
				if(td[rcolm].innerHTML==""){
					td[rcolm].style.background="red";
					td[rcolm].style.opacity="0.5";
				
				}else{
				}
				for(var j=rcolm-1;j<=rcolm+1;j++){
					if(j!=rcolm){
						if(td[j].innerHTML!=""){
							var ColorFont=td[j].getElementsByTagName("font");
							if((setColor=="W" && ColorFont[0].color=="white") || (setColor=="B" && ColorFont[0].color=="black")){
							}
							else{
								td[j].style.background="red";
								td[j].style.opacity="0.5";	
							}
						}
					}
				}
			}
			}
		}
		}
	}
	/* function of Knight */
	function Knight(Color){
			var setr,setl,setv,setv1,setv12,setv13,atCol,atRow; 
		if(Color!=''){
			for(var i=0;i<tr.length;i++){
				var td=tr[i].getElementsByTagName("td");
				if(i==rno){
				}
				else{
					if(i==rno+1 || i==rno+2 || i==rno-1 || i==rno-2){
						for(var j=0;j<td.length;j++){
							var ColorFont=td[j].getElementsByTagName("font");
							if(i==rno+1 || i==rno-1){
								if(j==(rcolm-2) || j==(rcolm+2)){
									if(td[j].innerHTML==""){											
										td[j].style.background="red";
										td[j].style.opacity="0.5";
									}else{
										if((setColor=="W" && ColorFont[0].color=="white") || (setColor=="B" && ColorFont[0].color=="black")){
										
										}
										else{
											td[j].style.background="red";
											td[j].style.opacity="0.5";	
											
										}
										
									}
								}
							}
							if(i==rno-2 || i==rno+2){
								if(j==(rcolm-1) || j==(rcolm+1)){
									if(td[j].innerHTML==""){										
										td[j].style.background="red";
										td[j].style.opacity="0.5";
									}else{
										if((setColor=="W" && ColorFont[0].color=="white") || (setColor=="B" && ColorFont[0].color=="black")){
										}
										else{
											td[j].style.background="red";
											td[j].style.opacity="0.5";
											
										}
									}
								}
							}
						}
					}
					
				}
			}
		}
	}
	/*function of Queen*/
	function Queen(Color){
		Rook(Color);
		Bishop(Color);
	}
	/*function of Bishop*/
	function Bishop(Color){
	var sett=1,setv=1,go,gov;
	var v=1;
	var setr=1,setl=1,gor,gol;
	var lr=1;	
		if(Color!=''){
			for(var i=rno+1;i<tr.length;i++){
				var td=tr[i].getElementsByTagName("td");
				for(var j=0;j<td.length;j++){
					if(j==rcolm-lr || j==rcolm+lr){
						if(j>rcolm){
							if(setl==1){
								gor=1;
								gol=2;
							}else{
								gor=2;
								gol=2;
							}
						}
						else{
							if(setr==1){
								gol=1;
								gor=2;
							}else{
								gol=2;
								gor=2;
							}
						}
						console.log(gor,gol,td[j].innerHTML,i,j);
						if(gor==1 || gol==1){
						if(td[j].innerHTML==''){
							td[j].style.background="red";
							td[j].style.opacity="0.5";
							
						}else{
							var ColorFont=td[j].getElementsByTagName("font");
							if((setColor=="W" && ColorFont[0].color=="white") || (setColor=="B" && ColorFont[0].color=="black")){
								
							}
							else{
								td[j].style.background="red";
								td[j].style.opacity="0.5";
								
							}
							if(gor==1){
								setl=2;
							}else{
								setr=2;
							}
						}		
					}
				}
					
				}
				lr++;
				
			}
			
			for(var i=rno-1;i>=0;i--){
				var td=tr[i].getElementsByTagName("td");
				for(var j=0;j<td.length;j++){
					if(j==rcolm-v || j==rcolm+v){
						if(j>rcolm){
							if(setv==1){
								go=1;
								gov=2;
							}else{
								go=2;
								gov=2;
							}
						}
						else{
							if(sett==1){
								gov=1;
								go=2;
							}else{
								gov=2;
								go=2;
							}
						}
						console.log(go,gov,td[j].innerHTML,i,j);
						if(go==1 || gov==1){
						if(td[j].innerHTML==''){
							td[j].style.background="red";
							td[j].style.opacity="0.5";
						}else{
							var ColorFont=td[j].getElementsByTagName("font");
							if((setColor=="W" && ColorFont[0].color=="white") || (setColor=="B" && ColorFont[0].color=="black")){
								
							}
							else{
								td[j].style.background="red";
								td[j].style.opacity="0.5";
								
							}
							if(go==1){
								setv=2;
							}else{
								sett=2;
							}
						}		
					}
				}
					
				}
				v++;
			}
		}
		
	}
	/*function for rook*/
	function Rook(Color){
	var atRow,atCol,setc,setv,atColv,setr,setr1;
	var set;
	var check1=0,check2=0;
	var rset=0;
		if(Color!=''){
			for(var i=0;i<tr.length;i++){
				var td=tr[i].getElementsByTagName("td");
				if(i==rno){
					for(var j=0;j<td.length;j++){
						if(j!=rcolm){
							if(j>rcolm){
								if(td[j].innerHTML==''){
									td[j].style.background="red";
									td[j].style.opacity="0.5";
									
								}else{
									var ColorFont=td[j].getElementsByTagName("font");
									if((setColor=="W" && ColorFont[0].color=="white") || (setColor=="B" && ColorFont[0].color=="black")){
										break;
									}
									else{
										
										td[j].style.background="red";
										td[j].style.opacity="0.5";
										
										break;
									}
								}
							}
							else{ 
							
								if(td[j].innerHTML!=''){
									var ColorFont=td[j].getElementsByTagName("font");
									if((setColor=="W" && ColorFont[0].color=="white") || (setColor=="B" && ColorFont[0].color=="black")){
										atRow=j;
										set=3;
									}
									else{																	
										atRow=j;
										set=1;
									}
								}else{	
									rset++;
									if(rset==rcolm){
										set=2;
									}
									
								}
							}
						}
					}
					if(set==2){
						for(var k=0;k<rset;k++){
							td[k].style.background="red";
							td[k].style.opacity="0.5";
						}
					}
					if(set==1 || set==3){
						var v=atRow;
						if(set==3){
							v+=1;
						}else{
						}
						
						for(var k=v;k<rcolm;k++){
							td[k].style.background="red";
							td[k].style.opacity="0.5";
						}
						
					}		
				}
				if(i!=rno){
				var ColorFont=td[rcolm].getElementsByTagName("font");
				
					if(i<rno){
						if(td[rcolm].innerHTML==""){
							var a=rno;
							check1++;
							if(check1==a){
								setr1=2;
							}
						}
						else{
							if((setColor=="W" && ColorFont[0].color=="white") || (setColor=="B" && ColorFont[0].color=="black")){
								atCol=i;
								setc=4;
							}else{
								atCol=i;
								setc=5;
							}	
						}						
					}
					else{
						if(td[rcolm].innerHTML==""){
							var a=(tr.length-1)-rno;
							check2++;
							if(check2==a){
								setr=1;
							}
							
						}
						else{
							if((setColor=="W" && ColorFont[0].color=="white") || (setColor=="B" && ColorFont[0].color=="black")){
								atColv=i;
								setv=1;
								break;
							}else{
								atColv=i;
								setv=2;
								break;
							}
						}
					}
				}
			}
			
		}
		if(true){
			 var val;
			 var valv;
			if(setc==4){
				val=atCol+1;
			}
			else{
				val=atCol;
			}
			if(setv==1){
				valv=atColv-1;	
			}
			else{
				valv=atColv;
			}
			for(var i=val;i<rno;i++){
				if(i!=rno){
					var td=tr[i].getElementsByTagName("td");
					td[rcolm].style.background="red";
					td[rcolm].style.opacity="0.5";
					
				}
			}
			for(var i=rno+1;i<=valv;i++){
				var td=tr[i].getElementsByTagName("td");
				td[rcolm].style.background="red";
				td[rcolm].style.opacity="0.5";
				
			}
			if(setr==1){
				for(var i=rno+1;i<tr.length;i++){
					var td=tr[i].getElementsByTagName("td");
					td[rcolm].style.background="red";
					td[rcolm].style.opacity="0.5";
					
				}
			}
			if(setr1==2){
				for(var i=0;i<rno;i++){
					var td=tr[i].getElementsByTagName("td");
					td[rcolm].style.background="red";
					td[rcolm].style.opacity="0.5";
					
				}
			}
		}
	}
	/*function of Recolor*/
	function Recolor(){
		var tr=document.getElementsByTagName("tr");
			for(var i=0;i<tr.length;i++){
				var td=tr[i].getElementsByTagName("td");
				if(i%2==0){
					for(var j=0;j<td.length;j++){
						if(j%2==0){
							td[j].style.background="#e67e22";
						}
						else{
							td[j].style.background="#d35400";
						}
						td[j].style.opacity="1";
						
					}
				}
				else{
					for(var k=0;k<td.length;k++){
						if(k%2==0){
							td[k].style.background="#d35400";
						}
						else{
							td[k].style.background="#e67e22";
						}
						td[k].style.opacity="1";
						
					}
				}
			}	
				
		
	}
	
	/*moving function*/
	function move(row,colm){
		var dom=document.getElementById("list");
		dom.style.transition="1s";
		dom.style.marginLeft="-200%";
		var Gcolor;
		var s=1;
		var change=document.getElementById("change");
		var a=colm-1;
		var td=document.getElementsByTagName("td");
		if(setColor=="B"){
			Gcolor="black";
		}else{
			Gcolor="white";
		}
		if(checkp==1){
			checkp-=1;
		}
		if(td[a].style.background=="red" || td[a].style.background=="red none repeat scroll 0% 0%"){
			if(td[a].innerHTML!=""){
					var font=td[a].getElementsByTagName("font");
					var B=document.getElementById("B");
					var W=document.getElementById("W");
					var refer=document.getElementsByClassName("refer");
					if(font[0].innerHTML==refer[8].innerHTML || font[0].innerHTML==refer[9].innerHTML){
						var xml=new XMLHttpRequest();
						xml.onreadystatechange=function(){
							s=2;
							if(font[0].color=="black"){
								alert("winner is White");
							}else{
								alert("winner is Black");
							}
							
						}
						xml.open("GET","win.php?win=1&nam="+namep2,true);
						xml.send();
						
					}else{
						if(font[0].color=="black"){
							if(start==0){
								PicesBN.push(font[0].innerHTML+":"+font[0].id);
								PicesB.push(font[0].innerHTML);
							}else{
								var Name;
								if(font[0].innerHTML==refer[4].innerHTML){
									Name="queen";
									cname=9819;
								}else if(font[0].innerHTML==refer[5].innerHTML){
									Name="rook";
									cname=9820;
								}else if(font[0].innerHTML==refer[6].innerHTML){
									Name="bishop";
									cname=9821;
								}else if(font[0].innerHTML==refer[7].innerHTML){
									Name="knight";
									cname=9822;
								}else{
									Name='pawn';
									cname=9823;
								}
								console.log(font[0].innerHTML);
								var xml=new XMLHttpRequest();
								xml.open("GET","store.php?store=1&name="+namep2+"&val="+cname+"&no="+font[0].id+"&peice="+Name,true);
								xml.send();
							}
							
						}else{
							if(start==0){
								PicesWN.push(font[0].innerHTML+":"+font[0].id);
								PicesW.push(font[0].innerHTML);
							}else{
								var Name;
								if(font[0].innerHTML==refer[0].innerHTML){
									Name="queen";
									cname=9813;
								}else if(font[0].innerHTML==refer[1].innerHTML){
									Name="rook";
									cname=9814;
								}else if(font[0].innerHTML==refer[2].innerHTML){
									Name="bishop";
									cname=9815;
								}else if(font[0].innerHTML==refer[3].innerHTML){
									Name="knight";
									cname=9816;
								}else{
									Name='pawn';
									cname=9817;
								}
								console.log(font[0].innerHTML);
								var xml=new XMLHttpRequest();
								xml.open("GET","store.php?store=1&name="+namep2+"&val="+cname+"&no="+font[0].id+"&peice="+Name,true);
								xml.send();
							}
							console.log(namep2);
						}
						var bl=PicesB;
						var wl=PicesW;
						var b="";
						var w="";
						for(var i=1;i<bl.length;i++){
							b+=bl[i];
						}
						for(var i=1;i<wl.length;i++){
							w+=wl[i];
						}
						W.innerHTML="White"+w;
						B.innerHTML="Black"+b;
					}
			}
			if(s==1){	
				td[cno].innerHTML="";
				m="<font color='"+Gcolor+"' id='"+Wone+"' style="+"'position:absolute;'"+ "onclick="+"fun("+row+","+colm+",'"+name+"','"+setColor+"','"+checkp+"','"+CodeName+"','"+Wone+"');>&#"+CodeName+";</font>";
				td[a].innerHTML=m;
				console.log(m);
				Recolor();
				if(trun=="W"){
					if(start==0){
						trun="B";
					}else{
						trun="a";
						checktrun = setInterval(checktrun,1000);
						var xml=new XMLHttpRequest();
						xml.onreadystatechange=function(){
							trun="a";
							checktrun = setInterval(checktrun,1000);
						}
						xml.open("GET","move.php?move=1&peice="+name+"&name="+namep2+"&value="+colm+"&vcol="+cno+"&vrow="+row+"&cname="+CodeName+"&Wone="+Wone,true);
						xml.send();
					}
					change.classList.remove("white");
					change.classList.add("black");
					change.innerHTML="Black Turn";
				}else{
					if(start==0){
						trun="W";
					}else{
						trun="a";
						checktrun = setInterval(checktrun,1000);
						var xml=new XMLHttpRequest();
						xml.onreadystatechange=function(){
							trun="a";
							checktrun = setInterval(checktrun,1000);
						}
						xml.open("GET","move.php?move=1&peice="+name+"&name="+namep2+"&value="+colm+"&vcol="+cno+"&vrow="+row+"&cname="+CodeName+"&Wone="+Wone,true);
						xml.send();
					}
					change.classList.remove("black");
					change.classList.add("white");
					change.innerHTML="White Turn";
				}
			}else{
				var a=confirm("DO you Want paly again!");
				if(a==true){
					window.location=window.location.href;
				}else{}
			}
		}
		
	}
	function checktrun(){
		console.log(trun+"sknd"+cot);
		if(trun=="a"){
			var xml=new XMLHttpRequest();
			xml.onreadystatechange=function(){
				if(xml.responseText=="" || xml.responseText==" " || xml.responseText=="undefined"){}
				else{
					if(xml.responseText==ttrun){
						setInterval(movetrun,1000);
						wins();
						trun=ttrun;
						cot=0;
						console.log(cot);
					}else{}
				}
			}
			if(cot!=0 || cot!=2){
				xml.open("GET","turn.php?nottrun=1",true);
				xml.send();
			}
		}else{}
	}
	function movetrun(){
		var colorT,t,checkp1=0;
		if(ttrun=="W"){
			colorT="black";
			t="B";
		}else{
			colorT="white";
			t="W";
		}
		if(trun!="a"){
			var xml=new XMLHttpRequest();
			xml.onreadystatechange=function(){
				if(xml.responseText=="" || xml.responseText==" " || xml.responseText=="undefined"){}
				else{
					if(cot==2){
					}else{
						var b=xml.responseText.split("-");
						wins();
						tdc[eval(b[3])].innerHTML="";
						tdc[eval(b[1]-1)].innerHTML="<font color='"+colorT+"' id='"+b[5]+"' style="+"'position:absolute;'"+ "onclick="+"fun("+eval(b[2])+","+eval(b[1])+",'"+b[0]+"','"+t+"','"+checkp1+"',"+b[4]+",'"+b[5]+"');>&#"+b[4]+";</font>";
						Recolor();
						cot++;
					}
				}
			}
			if(cot!=2){
				xml.open("GET","turn.php?trun=1&nam="+namep2,true);
				xml.send();
			}
		}else{}
	}
	function come(id){
		var main,set=0;
		var refer=document.getElementsByClassName("refer");
		if(id=="black"){
			var bl,cl,b,a=0,bw=" ",cw=" ";
			if(start==0){
				 b=PicesBN;
				 setB(b,set,id);
				if(b[1]==""){
					set=1;
					a=1;
				}
			}else{
				var xml=new XMLHttpRequest();
				xml.onreadystatechange=function(){
					if(xml.responseText=="" || xml.responseText==" " || xml.responseText=="undefinde"){}
					else if(xml.responseText=="no"){
						set=1;
					}
					else{
						Arpb=["B"];
						var c=xml.responseText.split(",");
						b=Arpb.concat(c);
						b.splice(b.length-1,1);
						setB(b,set,id);
					}
				}
				xml.open("GET","store.php?fetch=1",true);
				xml.send();
			}
		}
		else{
			var wl,cl,w,a=0,cw=" ",wb=" ";
			if(start==0){
				 w=PicesWN;
				setW(w,set,id);
				console.log(w);
				if(w[1]==""){
					set=1;
					a=1;
				}
			}else{
				var xml=new XMLHttpRequest();
				xml.onreadystatechange=function(){
					if(xml.responseText=="" || xml.responseText==" " || xml.responseText=="undefinde"){}
					else if(xml.responseText=="no"){
						set=1;
					}
					else{
						Arpw=["W"];
						var c=xml.responseText.split(",");
						w=Arpw.concat(c);
						w.splice(w.length-1,1);
						setW(w,set,id);
					}
				}
				xml.open("GET","store.php?fetch=1",true);
				xml.send();
			}
		}
	}
	function setW(w,set,id){
		var refer=document.getElementsByClassName("refer");
		var wl,cl,a=0,cw=" ",wb=" ";
			if(set==0){
				console.log(w);
				while(a<w.length){
					var c=w[a].split(":");
					wb+=c[0]+"-";
					cw+=c[1]+"-";
					a++;
				}
				wl=wb.split("-");
				cl=cw.split("-");
				main=document.getElementById("mainw");
				var card=main.getElementsByClassName("card");
				var Name,k=0;
				var cname='';
				for(var i=0;i<wl.length;i++){
					if(wl[i]==refer[0].innerHTML || wl[i]=="9813"){
						Name="queen";
						cname=9813;
					}else if(wl[i]==refer[1].innerHTML || wl[i]=="9814"){
						Name="rook";
						cname=9814;
					}else if(wl[i]==refer[2].innerHTML || wl[i]=="9815"){
						Name="bishop";
						cname=9815;
					}else if(wl[i]==refer[3].innerHTML || wl[i]=="9816"){
						Name="knight";
						cname=9816;
					}
					else{
						cname='';
					}
					if(cname!=""){
						card[i].innerHTML="<font color='"+id+"' onclick="+"create('"+Name+"','"+setColor+"','"+cname+"','"+cl[i]+"','"+i+"',"+b+");>&#"+cname+";</font>";
						//k++;
					}else{	
						if(i<7){
							card[i].innerHTML="";
						}
					}
				}
			}
			
		if(set==0){
			main=document.getElementById("mainw");
			main.style.transition="1s";
			main.style.marginTop="0%";
		}else{}
	}
	function setB(b,set,id){
		var bl,cl,a=0,bw=" ",cw=" ";
		var refer=document.getElementsByClassName("refer");
			console.log(b);
			if(set==0){
				while(a<b.length){
					var c=b[a].split(":");
					bw+=c[0]+"-";
					cw+=c[1]+"-";
					a++;
				}
				bl=bw.split("-");
				cl=cw.split("-");
				main=document.getElementById("mainb");
				var card=main.getElementsByClassName("card");
				var Name;
				var cname='';
				for(var i=0;i<bl.length;i++){
					if(bl[i]==refer[4].innerHTML || bl[i]=="9819"){
						Name="queen";
						cname=9819;
					}else if(bl[i]==refer[5].innerHTML || bl[i]=="9820"){
						Name="rook";
						cname=9820;
					}else if(bl[i]==refer[6].innerHTML || bl[i]=="9821"){
						Name="bishop";
						cname=9821;	
					}else if(bl[i]==refer[7].innerHTML || bl[i]=="9822"){
						Name="knight";
						cname=9822;
					}else{
						cname='';
					}
					if(cname!=""){
						card[i].innerHTML="<font color='"+id+"' id='"+cl[i]+"' onclick="+"create('"+Name+"','"+setColor+"','"+cname+"','"+cl[i]+"','"+i+"',"+b+");>&#"+cname+";</font>";
						console.log(cname);
					}else{
						if(i<7){
							card[i].innerHTML="";
						}
					}
				}
			}
			
		if(set==0){
			main=document.getElementById("mainb");
			main.style.transition="1s";
			main.style.marginTop="0%";
		}else{}
	}
	function create(Name,color,cName,id,i,b){
		var main,c,d,B;
		var k=eval(i);
		var xml=new XMLHttpRequest();
		if(setColor=="B"){
			if(start==0){
				trun="W";
			}else{
				trun="a";
				xml.open("GET","store.php?trun=1&name="+namep2,true);
				xml.send();
			}
			c="black";
			d="Black";
			change.classList.remove("black");
			change.classList.add("white");
			change.innerHTML="Black turn";
			B=document.getElementById("B");
					
		}else{
			if(start==0){
				trun="B";
			}else{
				trun="a";
				xml.open("GET","store.php?trun=1&name="+namep2,true);
				xml.send();
			}
			c="white";
			d="White";
			change.classList.remove("white");
			change.classList.add("black");
			change.innerHTML="White turn";
			B=document.getElementById("W");
		}
		tdc[cno].innerHTML="<font color='"+c+"' id='"+id+"' style="+"'position:absolute;'"+ "onclick="+"fun("+Rowno+","+Colmnno+",'"+Name+"','"+setColor+"','"+checkp+"','"+cName+"','"+id+"');>&#"+cName+";</font>";
		if(start==1){
			
				xml.open("GET","move.php?move=1&peice="+Name+"&name="+namep2+"&value="+Colmnno+"&vcol="+cno+"&vrow="+Rowno+"&cname="+cName+"&Wone="+id,true);	
				xml.send();
		}else{}
		if(color=="B"){
			main=document.getElementById("mainb");
			main.style.transition="1s";
			main.style.marginTop="-200%";
		}
		else{
			main=document.getElementById("mainw");
			main.style.transition="1s";
			main.style.marginTop="-200%";
			
		}
		var l,r="";
		if(start==0){	
			if(setColor=="B"){
				PicesBN.splice(k,1);
				PicesB.splice(k,1);
				l=PicesB;
			}else{
				PicesWN.splice(k,1);
				PicesW.splice(k,1);
				l=PicesW;
			}
			for(var i=1;i<l.length;i++){
				r+=l[i];
				console.log(l[i]);
			}	
			B.innerHTML=d+": "+r;
		}else{
			if(start==1){
				if(setColor=="B"){
					b.splice(k,1);
					b.splice(0,1);
					xml.open("GET","store.php?empty=1&msg="+w,true);
				}else{
					w.splice(k,1);
					w.splice(0,1);
					console.log(w);
					xml.open("GET","store.php?empty=1&msg="+w,true);
				}
				
				xml.open("GET","move.php?move=1&peice="+Name+"&name="+namep2+"&value="+Colmnno+"&vcol="+cno+"&vrow="+Rowno+"&cname="+cname+"&Wone="+id,true);	
				xml.send();
			}
		}
	}