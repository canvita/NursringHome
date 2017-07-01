//企业管理
 $(function() {
       $("#enterprise").click(function() {
            $('input[name="checkall"]').prop("checked",this.checked); 
            $('input[name="subBox1"]').prop("checked",this.checked); 
            $('input[name="subBox2"]').prop("checked",this.checked); 
            $('input[name="subBox3"]').prop("checked",this.checked); 
            $('input[name="subBox4"]').prop("checked",this.checked); 
            $('input[name="subBox5"]').prop("checked",this.checked); 
        });
        var $checkall = $("input[name='checkall']");
        var $subBox1 = $("input[name='subBox1']");
        var $subBox2 = $("input[name='subBox2']");
        var $subBox3 = $("input[name='subBox3']");
        var $subBox4 = $("input[name='subBox4']");
        var $subBox5 = $("input[name='subBox5']");

        $checkall.click(function(){
            $("#enterprise").prop("checked",$checkall.length == $("input[name='checkall']:checked").length ? true : false);
        });
        $subBox1.click(function(){
            $("#enterprise").prop("checked",$subBox1.length == $("input[name='subBox1']:checked").length ? true : false);
        });
        $subBox2.click(function(){
            $("#enterprise").prop("checked",$subBox2.length == $("input[name='subBox2']:checked").length ? true : false);
        });
        $subBox3.click(function(){
            $("#enterprise").prop("checked",$subBox3.length == $("input[name='subBox3']:checked").length ? true : false);
        });
        $subBox4.click(function(){
            $("#enterprise").prop("checked",$subBox4.length == $("input[name='subBox4']:checked").length ? true : false);
        });
        $subBox5.click(function(){
            $("#enterprise").prop("checked",$subBox5.length == $("input[name='subBox5']:checked").length ? true : false);
        });

    });

    $(function() {
       $("#employee").click(function() {
            $('input[name="subBox1"]').prop("checked",this.checked); 
        });
        var $subBox1 = $("input[name='subBox1']");
        $subBox1.click(function(){
            $("#employee").prop("checked",$subBox1.length == $("input[name='subBox1']:checked").length ? true : false);
        });
    } );

     $(function() {
       $("#role").click(function() {
            $('input[name="subBox2"]').prop("checked",this.checked); 
        });
        var $subBox2 = $("input[name='subBox2']");
        $subBox2.click(function(){
            $("#role").prop("checked",$subBox2.length == $("input[name='subBox2']:checked").length ? true : false);
        });
    });

   $(function() {
	   $("#bed").click(function() {
	        $('input[name="subBox3"]').prop("checked",this.checked); 
	    });
	    var $subBox3 = $("input[name='subBox3']");
	    $subBox3.click(function(){
	        $("#bed").prop("checked",$subBox3.length == $("input[name='subBox3']:checked").length ? true : false);
	    });
    });

    $(function() {
	   $("#equipment").click(function() {
	        $('input[name="subBox4"]').prop("checked",this.checked); 
	    });
	    var $subBox4 = $("input[name='subBox4']");
	    $subBox4.click(function(){
	        $("#equipment").prop("checked",$subBox4.length == $("input[name='subBox4']:checked").length ? true : false);
	    });
    });

    $(function() {
	   $("#personal").click(function() {
	        $('input[name="subBox5"]').prop("checked",this.checked); 
	    });
	   
    });
//会员服务
 $(function() {
       $("#vip").click(function() {
            $('input[name="checkall1"]').prop("checked",this.checked); 
            $('input[name="subBox6"]').prop("checked",this.checked); 
            $('input[name="subBox7"]').prop("checked",this.checked); 
        });
        var $checkall1 = $("input[name='checkall1']");
        var $subBox6 = $("input[name='subBox6']");
        var $subBox7 = $("input[name='subBox7']");

        $checkall1.click(function(){
            $("#vip").prop("checked",$checkall1.length == $("input[name='checkall1']:checked").length ? true : false);
        });
        $subBox6.click(function(){
            $("#vip").prop("checked",$subBox6.length == $("input[name='subBox6']:checked").length ? true : false);
        });
        $subBox7.click(function(){
            $("#vip").prop("checked",$subBox7.length == $("input[name='subBox7']:checked").length ? true : false);
        });

    });

 $(function() {
       $("#member").click(function() {
            $('input[name="subBox6"]').attr("checked",this.checked); 
        });
        var $subBox6 = $("input[name='subBox6']");
        $subBox6.click(function(){
            $("#member").attr("checked",$subBox6.length == $("input[name='subBox6']:checked").length ? true : false);
        });
    });
 $(function() {
       $("#nurse").click(function() {
            $('input[name="subBox7"]').attr("checked",this.checked); 
        });
        var $subBox7 = $("input[name='subBox7']");
        $subBox7.click(function(){
            $("#nurse").attr("checked",$subBox7.length == $("input[name='subBox7']:checked").length ? true : false);
        });
    });