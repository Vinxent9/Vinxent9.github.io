$("#calculate").on('click',function(){
    var s_count = parseInt($('#sonic_count').val()) || 0;
    var cs_count = parseInt($('#c_sonic_count').val()) || 0;
    var sc_ticket = parseInt($('#super_scout_ticket').val()) || 0;
    var lc_ticket = parseInt($('#legend_scout_ticket').val()) || 0;
    var chanceMultiplier = document.getElementById("doubleChance").checked ? 2 : 1;
    var free_cast = 0;
    var pickup_cast = 0;
    var free_cast_txt = "";
    var pickup_cast_txt = "";
    var legend_cast_txt = "";

    //pull rates
    const pickup_5 = 0.015;
    //const pickup_4 = 0.1;
    //const pickup_3 = 0.885;

    const pickup_5x2 = 0.03;
    //const pickup_4x2 = 0.15;
    //const pickup_3x2 = 0.82;

    const free_5 = 0.005;
    //const free_4 = 0.085;
    //const free_3 = 0.91;

    const legend_5 = 0.06;
    //const legend_4 = 0.94;

    //div text
    var overall_cast_txt = '<br><h4 class=font-weight-bold style=color:#FFE082>Overall Cast</h4>';


    //get # of pulls from sonics
    if((s_count > 0 && Number.isInteger(s_count)) || (sc_ticket > 0 && Number.isInteger(sc_ticket))){
        temp_s_count = s_count;
        while(temp_s_count >= 810){
            free_cast = free_cast + 10;
            temp_s_count = temp_s_count - 810;
        }
        free_cast_left = Math.floor(temp_s_count / 90);
        free_cast = free_cast + free_cast_left;
        temp_s_count = temp_s_count % 90;
    
        free_cast_txt = "Free Cast From Sonic: <strong>" + free_cast + "</strong><br>Free Cast from Tickets: <strong>" + sc_ticket + "</strong><br>Total Free Cast: <b>";
        free_cast = free_cast + sc_ticket;
        free_cast_txt += free_cast + "</b><br/>";
    }
    
    
    //get # of pulls from charged sonics
    if(cs_count > 0 && Number.isInteger(cs_count)){
        temp_cs_count = cs_count;
        while(temp_cs_count >= 810){
            pickup_cast = pickup_cast + 10;
            temp_cs_count = temp_cs_count - 810;
        }
        pickup_cast_left = Math.floor(temp_cs_count / 90);
        pickup_cast = pickup_cast + pickup_cast_left;
        temp_cs_count = temp_cs_count % 90;



        pickup_cast_txt = "Pickup Cast From Sonic: <b>" + pickup_cast + "</b><br />";
    }

    if(lc_ticket > 0 && Number.isInteger(lc_ticket)){
        legend_cast_txt = "<br>Legend Cast from Tickets: <b>" + lc_ticket + "</b><br />";
    }


    //chance of not getting 5
    non_free_poss = Math.pow(1-free_5 , free_cast);
    non_pickup_poss = Math.pow(1-(pickup_5*chanceMultiplier) , pickup_cast);
    non_legend_poss = Math.pow(1-legend_5 , lc_ticket);
    console.log(non_free_poss);
    console.log(non_pickup_poss);
    console.log(non_legend_poss);

    //chance of getting at least 1 sr
    sr_rate = ((1-(non_free_poss*non_pickup_poss*non_legend_poss))*100).toFixed(2);


    overall_cast_txt += free_cast_txt + pickup_cast_txt + legend_cast_txt;
    overall_cast_txt += "<br>Rate of getting an 5★ SR: <span class=font-weight-bold style=color:#FFE082>" + sr_rate + "%</span>";
    $("#overall_cast_result").html(overall_cast_txt);

    


});