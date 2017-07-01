// 二级菜单展开合拢动作
var menuLinks=$('.sidebar-nav-menu');
menuLinks.on('click', function(e){
    var link = $(this);
    if(link.hasClass("open")){
        var ifa=link.find("i");
        var iul=link.next();
        link.removeClass("open");
        link.addClass("close");
        ifa.css('transform','rotate(-90deg)');
        ifa.css('transition','transform 0.2s ease 0s');
        iul.removeClass("open");
        iul.addClass("close");
    }
    else{
        var ifa=link.find("i");
        var iul=link.next();
        link.removeClass("close");
        link.addClass("open");
        ifa.css('transform','rotate(0deg)');
        ifa.css('transition','transform 0.2s ease 0s');
        iul.removeClass("close");
        iul.addClass("open");
    }
});

// 菜单点击效果
var sidebar=$('.left-sidebar');
var allLinks=$('.sidebar-nav a');
allLinks.on('click', function(e){
    var link = $(this), ripple, d, x, y;

    // Remove .animate class from all ripple elements
    sidebar.find('.sidebar-nav-ripple').removeClass('animate');

    // If the ripple element doesn't exist in this link, add it
    if(link.children('.sidebar-nav-ripple').length === 0) {
        link.prepend('<span class="sidebar-nav-ripple"></span>');
    }

    // Get the ripple element
    var ripple = link.children('.sidebar-nav-ripple');

    // If the ripple element doesn't have dimensions set them accordingly
    if(!ripple.height() && !ripple.width()) {
        d = Math.max(link.outerWidth(), link.outerHeight());
        ripple.css({height: d, width: d});
    }

    // Get coordinates for our ripple element
    x = e.pageX - link.offset().left - ripple.width()/2;
    y = e.pageY - link.offset().top - ripple.height()/2;

    // Position the ripple element and add the class .animate to it
    ripple.css({top: y + 'px', left: x + 'px'}).addClass('animate');
});

// 列表项点击
var childLink=$('.child-nav').children().children();
childLink.on('click',function(e){
    var link = $(this);
    var frame = $("#main-content");
    var href = link.data('href')+'?new='+Math.random();
    if(link.hasClass('active')){
        frame.attr('src', href);
    }
    else{
        sidebar.find('.active').removeClass('active');
        link.addClass('active');
        frame.attr('src', href);
    }
});
window.onload=function(){
    // 页面iframe初始加载防缓存操作
    var href = $("#main-content").attr('href')+'?new='+Math.random();
    $("#main-content").attr('src', href);
}
