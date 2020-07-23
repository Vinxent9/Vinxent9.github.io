var ave_per = new Array(100);
var combo_time = new Array(100);
for (var i = 0; i < combo_time.length; i++) {
  combo_time[i] = new Array(7);
}
var combo_time_per = new Array(100);
for (var i = 0; i < combo_time_per.length; i++) {
  combo_time_per[i] = new Array(7);
}

	//new 07/11/2020
	$('body').on('change', '#star_name1,#star_name2', function(event) {  //change event for the 2 select boxes, use this when dealing with dynamic html elements for jQuery Events
		ele_id = event.target.id; //get id of element e.g. star_name1
		id_num = ele_id.substr(-1); //get last character of id 
		index = $(this).val(); //get value of the changed element e.g. index in data array
		
		if(index == -1){  //blank name  
			$("#star_image" + id_num).attr("src","asset/star_none.png");  //set src of corresponding img element with place holder pic
			$("#star_image" + id_num).prop("alt", "");  //set text of image when image not loading
		}
		else{ //star name
			star_name = star_data[index][0];
			$("#star_image" + id_num).attr("src","asset/x2/" + star_name + ".png");  //set src of corresponding img element with corresponding name picture
			$("#star_image" + id_num).prop("alt", star_name);  //set text of image when image not loading
		}
		
		
	});
	//end of new

	function genTable(){
		table_h = "<table class='table table-striped table-borderless table-sm table-dark' id='sktable' style='width:100%;''> <tr> <th colspan='3'>Star 1</th> <th colspan='3'>Star 2</th> </tr> <tr> <th>LV</th> <th>Cool Down</th> <th>Skill Time</th>  <th>LV</th> <th>Cool Down</th> <th>Skill Time</th> </tr>";
		table_b = "";
		table_f = "</table>";

		//loop for body
		for (i = 1; i <= 10; i++) {
		  table_b += "<tr><td><span class='badge badge-warning'>LV" + i + "</span></td><td><input class = 'form-control form-control-sm' type='text' min='1' step='1' id='star1cd" + i + "' readonly></td><td ><input class = 'form-control form-control-sm' type='text' min='1' step='1' id='star1st" + i + "' readonly></td>" +
		  			"<td><span class='badge badge-warning'>LV" + i + "</td><td><input class = 'form-control form-control-sm' type='text' min='1' step='1' id='star2cd" + i + "' readonly></td><td><input class = 'form-control form-control-sm' type='text' min='1' step='1' id='star2st" + i + "' readonly></td></tr>";
		}
		
		var skilltable = document.getElementById('skilltable');
		skilltable.innerHTML += table_h + table_b + table_f;
		genList();
	}

	function genList(){
		var slist1 = document.getElementById('starlist1');
		var slist2 = document.getElementById('starlist2');
		var options = "<option value = -1></option>";

		for(l = 0; l < star_data.length; l++){
			options += "<option value='" + l + "'>" + star_data[l][0] + "</option>";
		}

		slist1.innerHTML += "<select type='button' class='btn btn-outline-warning'  id='star_name1' onchange='editTable1() '>" + options + "</select>";
		slist2.innerHTML += "<select type='button' class='btn btn-outline-warning'  id='star_name2' onchange='editTable2()'>" + options + "</select>";
	}

	function editTable1(){	
		var slist1detail = document.getElementById('starlist1detail');
		slist1detail.innerHTML="";
		if(document.getElementById('star_name1').value == -1){
			for(e = 1; e <= 10; e++){
				document.getElementById('star1cd'+e).value = "";
				document.getElementById('star1st'+e).value = "";
			}
		}
		else{
			for(e = 1; e <= 10; e++){
				document.getElementById('star1cd'+e).value = star_data[document.getElementById('star_name1').value][e*2];
				document.getElementById('star1st'+e).value = star_data[document.getElementById('star_name1').value][(e*2)-1];
			}

			type = star_data[document.getElementById('star_name1').value][21];
			if(type == "Dancer"){
				color = "#EF9A9A";
			}
			else if(type == "Session"){
				color = "#A5D6A7";
			}
			else if(type == "Vocal"){
				color = "#9DBFF9";
			}

			// slist1detail.innerHTML += star_data[document.getElementById('star_name1').value][22] + " Note <font color ='" + color + "'>" + type + "</font> Star"; 
		}

		if(document.getElementById('star_name2').value != -1 && document.getElementById('star_name1').value != -1){
			document.getElementById("calculate_btn").disabled = false; 
		}
		else{
			document.getElementById("calculate_btn").disabled = true; 
		}

	}

	function editTable2(){
		var slist2detail = document.getElementById('starlist2detail');
		slist2detail.innerHTML="";
		if(document.getElementById('star_name2').value == -1){
			for(e = 1; e <= 10; e++){
				document.getElementById('star2cd'+e).value = "";
				document.getElementById('star2st'+e).value = "";
			}
			slist2detail.innerHTML="";
		}
		else{
			for(e = 1; e <= 10; e++){
				document.getElementById('star2cd'+e).value = star_data[document.getElementById('star_name2').value][e*2];
				document.getElementById('star2st'+e).value = star_data[document.getElementById('star_name2').value][(e*2)-1];
			}

			type = star_data[document.getElementById('star_name2').value][21];
			if(type == "Dancer"){
				color = "#EF9A9A";
			}
			else if(type == "Session"){
				color = "#A5D6A7";
			}
			else if(type == "Vocal"){
				color = "#9DBFF9";
			}

			// slist2detail.innerHTML += star_data[document.getElementById('star_name2').value][22] + " Note <font color ='" + color + "'>" + type + "</font> Star"; 

		}
		if(document.getElementById('star_name2').value != -1 && document.getElementById('star_name1').value != -1){
			document.getElementById("calculate_btn").disabled = false; 
		}
		else{
			document.getElementById("calculate_btn").disabled = true; 
		} 
	}



	function calculate(){
		//new 04/20/2020
		if(parseInt(document.getElementById('customTime').value) < 0 || parseInt(document.getElementById('customTime').value) > 180){
			alert("Please enter a custom time within 0-180 seconds");
			return;
		}
		else{
			custom_time = parseInt(document.getElementById('customTime').value);
		}
		//end of new		

		var combo_time_pointer = 0;
		
		//new 06/14/2020
		var ele = document.getElementsByName('perType'); 
        var perType = 0;
		for(i = 0; i < ele.length; i++) { 
			if(ele[i].checked){
				perType = ele[i].value;
			} 
		} 
		//end of new

		
		for(x = 1; x <= 10; x++){
			s1time = new Array(180);
			cd = parseInt(document.getElementById('star1cd'+x).value);
			st = parseInt(document.getElementById('star1st'+x).value);

			pointer = 0;
			while(pointer < 180){
				if(! ((pointer + cd) < 180)){
					cd = 180 - pointer;
				}

				for(c = 0; c < cd; c++){
					s1time[pointer+c] = false;
				}

				pointer =  pointer + cd;

				if(! ((pointer + st) < 180)){
					st = 180 - pointer;
				}

				for(s = 0; s < st; s++){
					s1time[pointer+s] = true;
					
				}

				pointer =  pointer + st;

			}


			for(y = 1; y <=10; y++){

				s2time = new Array(180);
				cd = parseInt(document.getElementById('star2cd'+y).value);
				st = parseInt(document.getElementById('star2st'+y).value);

				pointer = 0;
				while(pointer < 180){
					if(! ((pointer + cd) < 180)){
						cd = 180 - pointer;
					}

					for(c = 0; c < cd; c++){
						s2time[pointer+c] = false;
					}

					pointer =  pointer + cd;

					if(! ((pointer + st) < 180)){
						st = 180 - pointer;
					}

					for(s = 0; s < st; s++){
						s2time[pointer+s] = true;
						
					}

					pointer =  pointer + st;

				}


				combo_s = 0;
				for(var ind = 0; ind < 180; ind++){
					if(s1time[ind] == true || s2time[ind] == true){
						combo_s++;
					}
					if(ind == 29){
						combo_time[combo_time_pointer][0] = combo_s;
						combo_time_per[combo_time_pointer][0] = combo_s/30;
					}
					if(ind == 59){
						combo_time[combo_time_pointer][1] = combo_s;
						if(perType == 0){
							combo_time_per[combo_time_pointer][1] = combo_s/60;
						}
						else{
							combo_time_per[combo_time_pointer][1] = (combo_s - combo_time[combo_time_pointer][0])/30;
						}
					}
					if(ind == 89){
						combo_time[combo_time_pointer][2] = combo_s;
						if(perType == 0){
							combo_time_per[combo_time_pointer][2] = combo_s/90;
						}
						else{
							combo_time_per[combo_time_pointer][2] = (combo_s - combo_time[combo_time_pointer][1])/30;
						}
					}
					if(ind == 119){
						combo_time[combo_time_pointer][3] = combo_s;
						if(perType == 0){
							combo_time_per[combo_time_pointer][3] = combo_s/120;
						}
						else{
							combo_time_per[combo_time_pointer][3] = (combo_s - combo_time[combo_time_pointer][2])/30;
						}
					}
					if(ind == 149){
						combo_time[combo_time_pointer][4] = combo_s;
						if(perType == 0){
							combo_time_per[combo_time_pointer][4] = combo_s/150;
						}
						else{
							combo_time_per[combo_time_pointer][4] = (combo_s - combo_time[combo_time_pointer][3])/30;
						}
					}
					if(ind == 179){
						combo_time[combo_time_pointer][5] = combo_s;
						if(perType == 0){
							combo_time_per[combo_time_pointer][5] = combo_s/180;
						}
						else{
							combo_time_per[combo_time_pointer][5] = (combo_s - combo_time[combo_time_pointer][4])/30;
						}
					}
					if(ind == (custom_time - 1)){
						combo_time[combo_time_pointer][6] = combo_s;
						combo_time_per[combo_time_pointer][6] = combo_s/custom_time;
					}
				}

				ave_per[combo_time_pointer] = ((combo_time_per[combo_time_pointer][0]+ combo_time_per[combo_time_pointer][1] +combo_time_per[combo_time_pointer][2] + combo_time_per[combo_time_pointer][3] + combo_time_per[combo_time_pointer][4] + combo_time_per[combo_time_pointer][5]) /6);
				combo_time_pointer ++;
			}
		}
		
		printResults();
		 
	}


	function printResults(){
		var results = "";
		var highest = 0;
		var index = 0;
		var star1_level = 0;
		var star2_level = 0;
		var star1_name = star_data[document.getElementById('star_name1').value][0];
		var star2_name = star_data[document.getElementById('star_name2').value][0];
		var type1 = star_data[document.getElementById('star_name1').value][21];
		var type2 = star_data[document.getElementById('star_name2').value][21];
		var color1 = "";
		var color2 = "";
		var custom_time = parseInt(document.getElementById('customTime').value);

		if(type1 == "Dancer"){
				color1 = "#EF9A9A";
			}
			else if(type1 == "Session"){
				color1 = "#A5D6A7";
			}
			else if(type1 == "Vocal"){
				color1 = "#9DBFF9";
		}

		if(type2 == "Dancer"){
				color2 = "#EF9A9A";
			}
			else if(type2 == "Session"){
				color2 = "#A5D6A7";
			}
			else if(type2 == "Vocal"){
				color2 = "#9DBFF9";
		}

		//overall
		for(r=0;r < 100; r++){
			per_temp = ave_per[r];
			if(per_temp >= highest){
				highest = per_temp;
				index = r;
			}
		}

		highest = (highest*100).toFixed(2);
		star1_level = (Math.floor(index / 10) ) + 1 ;
		star2_level = (index % 10) + 1;
		//print results
		results = "<br><div class='card text-white bg-dark'> <img src='asset/taptoptoolbg_result.jpg' class='card-img-top'><div class='card-body'><p class='h6'>The best possible combination is <b><font color='" + color1 +"'>" + star1_name +  "</font></b> Skill Level <b>" + star1_level + "</b> and <b><font color='" + color2 + "'>" + star2_name + "</font></b> Skill Level <b>" + star2_level + "</b> with an average percentage of <b style=color:#FFE082><i>" + highest + "%</b></i></p><br /></div></div><br>";	
		results += "<table class = 'table'><tr><th scope='col' class='bg-warning'>30 Seconds</th><th scope='col' class='bg-warning'>60 Seconds</th><th scope='col' class='bg-warning'>90 Seconds</th><th scope='col' class='bg-warning'>120 Seconds</th><th scope='col' class='bg-warning'>150 Seconds</th><th scope='col' class='bg-warning'>180 Seconds</th></tr>" +
		"<tr class='table-secondary'><td>" + combo_time[index][0] + " Seconds</td><td>" + combo_time[index][1] + " Seconds</td><td>" + combo_time[index][2] + " Seconds</td><td>" + combo_time[index][3] + " Seconds</td><td>" + combo_time[index][4] + " Seconds</td><td>" + combo_time[index][5] + " Seconds</td></tr>"+
		"<tr class='table-secondary'><td>" + (combo_time_per[index][0]*100).toFixed(2) + "%</td><td>" + (combo_time_per[index][1]*100).toFixed(2) + "%</td><td>" + (combo_time_per[index][2]*100).toFixed(2) + "%</td><td>" + (combo_time_per[index][3]*100).toFixed(2) + " %</td><td>" + (combo_time_per[index][4]*100).toFixed(2) + " %</td><td>" + (combo_time_per[index][5]*100).toFixed(2) + " %</td> </tr>" +
		"</table>";


		//new 04/20/2020
		//overall(custom)
		if(custom_time > 0 && custom_time <= 180){
			highest = 0;
			for(r=0;r < 100; r++){
				per_temp = combo_time_per[r][6];
				if(per_temp >= highest){
					highest = per_temp;
					index = r;
				}
			}

			highest = (highest*100).toFixed(2);
			star1_level = (Math.floor(index / 10) ) + 1 ;
			star2_level = (index % 10) + 1;
			results += "<div class='card text-white bg-dark'> <img src='asset/taptoptoolbg_result_cost.jpg' class='card-img-top'><div class='card-body'><p class='h6'>The best possible combination (in <b>" + custom_time + "</b> seconds) is <b><font color='" + color1 +"'>" + star1_name +  "</font></b> Skill Level <b>" + star1_level + "</b> and <b><font color='" + color2 + "'>" + star2_name + "</font></b> Skill Level <b>" + star2_level + "</b> with an average percentage of <b style=color:#FFE082><i>" + highest + "%</b></i></p></div></div><br />";	
			results += "<table class = 'table table-sm' style=text-align:center><tr><th class='bg-warning' >" + custom_time + " Seconds</th></tr>" +
			"<tr class='table-secondary'><td>" + combo_time[index][6] + " Seconds</td></tr>"+
			"<tr class='table-secondary'><td>" + (combo_time_per[index][6]*100).toFixed(2) + "%</td></tr>" +
			"</table>";
		}
		//end of new 


		//for star 1 each level
		s1 = 0;
		s1_table = "<div class='card bg-light'><div class='card-header bg-warning'> <center><i class='fas fa-table'></i> <strong> Star 1 Pair Details </strong> </center></div><div class='card-body bg-dark'><table class = 'table table-striped  table-sm table-dark' id='tablepair' ><tr><th><font color = '" + color1 + "'>" + star1_name + "</font></th><th><font color = '" + color2 + "'>" + star2_name + "</font></th><th>30 Seconds</th><th>60 Seconds</th><th>90 Seconds</th><th>120 Seconds</th><th>150 Seconds</th><th>180 Seconds</th><th>AVE%</th></tr>";
		while(s1 < 100){
			s1_highest = 0;
			s1_index = 0;
			for(s = 0; s < 10; s++){
				per_temp = ave_per[s+s1];
				if(per_temp >= s1_highest){
					s1_highest = per_temp;
					s1_index = s+s1;
				}
			}
			//alert(s1 + "/" + s1_index);

			s1_level = (Math.floor(s1 / 10) ) + 1;
			s12_level = (s1_index % 10) + 1;

			s1_table += "<tr><td rowspan='2' style=padding-top:1em><b>LV"+ s1_level +"</b></td><td rowspan='2' style=padding-top:1em><b>LV" + s12_level + "</b></td><td>" + combo_time[s1_index][0] + " Seconds</td><td>" + combo_time[s1_index][1] + " Seconds</td><td>" + combo_time[s1_index][2] + " Seconds</td><td>" + combo_time[s1_index][3] + " Seconds</td><td>" + combo_time[s1_index][4] + " Seconds</td><td>" + combo_time[s1_index][5] + " Seconds</td><td rowspan='2' style=color:#FFE082;padding-top:1em><b><i>" + (ave_per[s1_index]*100).toFixed(2) + "%</b></i></td></tr>";

			s1_table += "<tr><td>" + (combo_time_per[s1_index][0]*100).toFixed(2) + "%</td><td>" + (combo_time_per[s1_index][1]*100).toFixed(2) + "%</td><td>" + (combo_time_per[s1_index][2]*100).toFixed(2) + "%</td><td>" + (combo_time_per[s1_index][3]*100).toFixed(2) + " %</td><td>" + (combo_time_per[s1_index][4]*100).toFixed(2) + " %</td><td>" + (combo_time_per[s1_index][5]*100).toFixed(2) + " %</td></tr>";

			s1 = s1 + 10;

		}

		s1_table += "</table></div></div>";

		//for star 2 each level
		s2 = 0;
		s2_table = "<div class='card bg-light'><div class='card-header bg-warning'> <center><i class='fas fa-table'></i><strong> Star 2 Pair Details </strong></center> </div><div class='card-body bg-dark'><table class = 'table table-striped  table-sm table-dark' id='tablepair'><tr><th><font color = '" + color2 + "'>" + star2_name + "</font></th><th><font color = '" + color1 + "'>" + star1_name + "</font></th><th>30 Seconds</th><th>60 Seconds</th><th>90 Seconds</th><th>120 Seconds</th><th>150 Seconds</th><th>180 Seconds</th><th>AVE%</th></tr>";
		
		while(s2 < 10){
			s2_highest = 0;
			s2_index = 0;
			for(s = 0; s < 100; s++){
				per_temp = ave_per[s+s2];
				if(per_temp >= s2_highest){
					s2_highest = per_temp;
					s2_index = s + s2;
				}
				s = s + 9;
			}
			//alert(s1 + "/" + s1_index);

			s21_level = (Math.floor(s2_index / 10) ) + 1;
			s2_level = s2 + 1;

			s2_table += "<tr><td rowspan='2' style=padding-top:1em><b>LV"+ s2_level +"</b></td><td rowspan='2' style=padding-top:1em><b>LV" + s21_level + "</b></td><td>" + combo_time[s2_index][0] + " Seconds</td><td>" + combo_time[s2_index][1] + " Seconds</td><td>" + combo_time[s2_index][2] + " Seconds</td><td>" + combo_time[s2_index][3] + " Seconds</td><td>" + combo_time[s2_index][4] + " Seconds</td><td>" + combo_time[s2_index][5] + " Seconds</td><td rowspan='2' style=color:#FFE082;padding-top:1em><b><i>" + (ave_per[s2_index]*100).toFixed(2) + "%</b></i></td></tr>";

			s2_table += "<tr><td>" + (combo_time_per[s2_index][0]*100).toFixed(2) + "%</td><td>" + (combo_time_per[s2_index][1]*100).toFixed(2) + "%</td><td>" + (combo_time_per[s2_index][2]*100).toFixed(2) + "%</td><td>" + (combo_time_per[s2_index][3]*100).toFixed(2) + " %</td><td>" + (combo_time_per[s2_index][4]*100).toFixed(2) + " %</td><td>" + (combo_time_per[s2_index][5]*100).toFixed(2) + " %</td></tr>";

			s2 = s2 + 1;

		}

		s2_table += "</table></div></div>";




	

		var result_div = document.getElementById('bestResult');
		result_div.innerHTML = "";
		result_div.innerHTML += results;

		result_div.innerHTML += "<br><br><center><h3 style=color:#ffffff>Best Pair per Each Level</h3><table width='100%'><tr><td>" + s1_table + "<br></td><tr><td>" + s2_table + "</td></tr></center></table>";
	


		//new 04/20/2020 custom
		//for star 1 each level (custom)
		if(custom_time > 0 && custom_time <= 180){
			s1 = 0;
			s1_table = "<div class='card'><div class='card-header bg-warning'> <center><i class='fas fa-table'></i><strong> Star 1 Pair Details </strong></center> </div><div class='card-body bg-dark'><table class = 'table table-striped  table-sm table-dark' id='tablepair'><tr><th><font color = '" + color1 + "'>" + star1_name + "</font></th><th><font color = '" + color2 + "'>" + star2_name + "</font></th><th>" + custom_time + " Seconds</th><th>AVE%</th></tr>";
			while(s1 < 100){
				s1_highest = 0;
				s1_index = 0;
				for(s = 0; s < 10; s++){
					per_temp = combo_time_per[s+s1][6];
					if(per_temp >= s1_highest){
						s1_highest = per_temp;
						s1_index = s+s1;
					}
				}
				//alert(s1 + "/" + s1_index);

				s1_level = (Math.floor(s1 / 10) ) + 1;
				s12_level = (s1_index % 10) + 1;

				s1_table += "<tr><td rowspan='2' style=padding-top:1em><b>LV"+ s1_level +"</b></td><td rowspan='2' style=padding-top:1em><b>LV" + s12_level + "</b></td><td>" + combo_time[s1_index][6] + " Seconds</td><td rowspan='2' style=padding-top:1em;color:#FFE082><b><i>" + (combo_time_per[s1_index][6]*100).toFixed(2) + "%</b></i></td></tr>";

				s1_table += "<tr><td>" + (combo_time_per[s1_index][6]*100).toFixed(2) + "%</td></tr>";

				s1 = s1 + 10;

			}

			s1_table += "</table></div></div>";

			//for star 2 each level (custom)
			s2 = 0;
			s2_table = "<div class='card'><div class='card-header bg-warning'> <center><i class='fas fa-table'></i><strong> Star 2 Pair Details </strong></center> </div><div class='card-body bg-dark'><table table class = 'table table-striped  table-sm table-dark' id='tablepair'><tr><th><font color = '" + color2 + "'>" + star2_name + "</font></th><th><font color = '" + color1 + "'>" + star1_name + "</font></th><th>" + custom_time + " Seconds</th><th>AVE%</th></tr>";
			
			while(s2 < 10){
				s2_highest = 0;
				s2_index = 0;
				for(s = 0; s < 100; s++){
					per_temp = combo_time_per[s+s2][6];
					if(per_temp >= s2_highest){
						s2_highest = per_temp;
						s2_index = s + s2;
					}
					s = s + 9;
				}
				//alert(s1 + "/" + s1_index);

				s21_level = (Math.floor(s2_index / 10) ) + 1;
				s2_level = s2 + 1;

				s2_table += "<tr><td rowspan='2' style=padding-top:1em><b>LV"+ s2_level +"</b></td><td rowspan='2' style=padding-top:1em><b>LV" + s21_level + "</b></td><td>" + combo_time[s2_index][6] + " Seconds</td><td rowspan='2' style=padding-top:1em;color:#FFE082><b><i>" + (combo_time_per[s2_index][6]*100).toFixed(2) + "%</b></i></td></tr>";

				s2_table += "<tr><td>" + (combo_time_per[s2_index][6]*100).toFixed(2) + "%</td></tr>";

				s2 = s2 + 1;

			}

			s2_table += "</table></div></div>";


			result_div.innerHTML += "<br><br><center><h3 style=color:#ffffff >Best Pair per Each Level (" + custom_time + " seconds)</h3></center><table width='100%'><tr><td>" + s1_table + "</td><td>" + s2_table + "</td></table>";
	

		}
		//end of new




		//all results
		//for star 1 each level
		s1 = 0;
		s1_table = "<div class='card'><div class='card-header bg-warning'> <center><i class='fas fa-poll'></i><strong> All Results </strong></center> </div><div class='card-body bg-dark'><table class = 'table table-striped  table-sm table-dark' id='all_results' style=text-align:center><tr><th onclick='sortTable2(0);'><font color = '" + color1 + "'>" + star1_name + "</font></th><th onclick='sortTable2(1);'><font color = '" + color2 + "'>" + star2_name + "</font></th><th onclick='sortTable(2);'>30 Seconds</th><th onclick='sortTable(3);'>60 Seconds</th><th onclick='sortTable(4);'>90 Seconds</th><th onclick='sortTable(5)'>120 Seconds</th><th onclick='sortTable(6)'>150 Seconds</th><th onclick='sortTable(7)'>180 Seconds</th><th onclick='sortTable2(6);'>AVE%</th></tr>";
		while(s1 < 100){
			for(s = 0; s < 10; s++){	
				s1_level = (Math.floor(s1 / 10) ) + 1;
				s12_level = s + 1;

				s1_table += "<tr><td rowspan='2' style=padding-top:1em><b>LV"+ s1_level +"</b></td><td rowspan='2' style=padding-top:1em><b>LV" + s12_level + "</b></td><td>" + combo_time[s+s1][0] + " Seconds</td><td>" + combo_time[s+s1][1] + " Seconds</td><td>" + combo_time[s+s1][2] + " Seconds</td><td>" + combo_time[s+s1][3] + " Seconds</td><td>" + combo_time[s+s1][4] + " Seconds</td><td>" + combo_time[s+s1][5] + " Seconds</td><td rowspan='2' style=padding-top:1em;color:#FFE082><b><i>" + (ave_per[s+s1]*100).toFixed(2) + "%</b></i></td></tr>";

				s1_table += "<tr><td>" + (combo_time_per[s+s1][0]*100).toFixed(2) + "%</td><td>" + (combo_time_per[s+s1][1]*100).toFixed(2) + "%</td><td>" + (combo_time_per[s+s1][2]*100).toFixed(2) + "%</td><td>" + (combo_time_per[s+s1][3]*100).toFixed(2) + "%</td><td>" + (combo_time_per[s+s1][4]*100).toFixed(2) + "%</td><td>" + (combo_time_per[s+s1][5]*100).toFixed(2) + "%</td></tr>";
			}


			s1 = s1 + 10;

		}

		s1_table += "</table></div></div>";



		result_div.innerHTML += "<br><br><h3></h3>" + s1_table;
	}



	function sortTable(n) {
		var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
		table = document.getElementById("all_results");
		switching = true;
		//Set the sorting direction to ascending:
		dir = "asc"; 
		/*Make a loop that will continue until
		no switching has been done:*/
		while (switching) {
			//start by saying: no switching is done:
			switching = false;
			rows = table.rows;
			/*Loop through all table rows (except the
			first, which contains table headers):*/
			for (i = 2; i < (rows.length - 1); i+=2) {
			//start by saying there should be no switching:
			shouldSwitch = false;
			/*Get the two elements you want to compare,
			one from current row and one from the next:*/
			x = rows[i].getElementsByTagName("td")[n-2];
			y = rows[i + 2].getElementsByTagName("td")[n-2];
			/*check if the two rows should switch place,
			based on the direction, asc or desc:*/
			if (dir == "asc") {
				if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
				//if so, mark as a switch and break the loop:
				shouldSwitch= true;
				break;
				}
			} else if (dir == "desc") {
				if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
				//if so, mark as a switch and break the loop:
				shouldSwitch = true;
				break;
				}
			}
			}
			if (shouldSwitch) {
			/*If a switch has been marked, make the switch
			and mark that a switch has been done:*/
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i-1]);
			rows[i].parentNode.insertBefore(rows[i + 2], rows[i]);
			switching = true;
			//Each time a switch is done, increase this count by 1:
			switchcount ++;      
			} else {
			/*If no switching has been done AND the direction is "asc",
			set the direction to "desc" and run the while loop again.*/
			if (switchcount == 0 && dir == "asc") {
				dir = "desc";
				switching = true;
			}
			}
		}
	}

	// function sortTable2(n) {
	// 	var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	// 	table = document.getElementById("all_results");
	// 	switching = true;
	// 	//Set the sorting direction to ascending:
	// 	dir = "asc"; 
	// 	/*Make a loop that will continue until
	// 	no switching has been done:*/
	// 	while (switching) {
	// 		//start by saying: no switching is done:
	// 		switching = false;
	// 		rows = table.rows;
	// 		/*Loop through all table rows (except the
	// 		first, which contains table headers):*/
	// 		for (i = 1; i < (rows.length-30 ); i+=2) {
	// 		//start by saying there should be no switching:
	// 		shouldSwitch = false;
	// 		console.log(i);
	// 		/*Get the two elements you want to compare,
	// 		one from current row and one from the next:*/
	// 		x = rows[i].getElementsByTagName("td")[n];
			
	// 		y = rows[i + 2].getElementsByTagName("td")[n];
	// 		/*check if the two rows should switch place,
	// 		based on the direction, asc or desc:*/

	// 		if(n==0 || n==1){
	// 			x = x.innerHTML.replace("LV","");
	// 			x = x.replace("<b>","");
	// 			x = x.replace("</b>","");
	// 			y = y.innerHTML.replace("LV","");
	// 			y = y.replace("<b>","");
	// 			y = y.replace("</b>","");
	// 		}
	// 		else if(n==6){
	// 			x = x.innerHTML.replace("%","");
	// 			x = x.replace("<b>","");
	// 			x = x.replace("</b>","");
	// 			x = x.replace("<i>","");
	// 			x = x.replace("</i>","");
	// 			y = y.innerHTML.replace("%","");
	// 			y = y.replace("<b>","");
	// 			y = y.replace("</b>","");
	// 			y = y.replace("<i>","");
	// 			y = y.replace("</i>","");
	// 		}

			
	// 		if (dir == "asc") {
	// 			if (x.toLowerCase() > y.toLowerCase()) {
	// 			//if(parseInt(x) > parseInt(y)){
	// 			//if so, mark as a switch and break the loop:
				
	// 			shouldSwitch= true;
	// 			break;
	// 			}
	// 		} else if (dir == "desc") {
	// 			if (x.toLowerCase() < y.toLowerCase()) {
	// 			//if(parseInt(x) < parseInt(y)){
	// 			//if so, mark as a switch and break the loop:
	// 			console.log(x + "//" + y);
	// 			shouldSwitch = true;
	// 			break;
	// 			}
	// 		}
	// 		}
	// 		if (shouldSwitch) {
	// 		/*If a switch has been marked, make the switch
	// 		and mark that a switch has been done:*/
	// 		rows[i].parentNode.insertBefore(rows[i + 2], rows[i]);
	// 		rows[i].parentNode.insertBefore(rows[i + 3], rows[i+1]);
	// 		switching = true;
	// 		//Each time a switch is done, increase this count by 1:
	// 		switchcount ++;      
	// 		} else {
	// 		/*If no switching has been done AND the direction is "asc",
	// 		set the direction to "desc" and run the while loop again.*/
	// 		if (switchcount == 0 && dir == "asc") {
	// 			dir = "desc";
	// 			switching = true;
	// 		}
	// 		}
	// 	}
	// }