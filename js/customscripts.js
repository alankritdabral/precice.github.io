$('#mysidebar').height($(".nav").height());


$( document ).ready(function() {

    //this script says, if the height of the viewport is greater than 800px, then insert affix class, which makes the nav bar float in a fixed
    // position as your scroll. if you have a lot of nav items, this height may not work for you.
    var h = $(window).height();
    //console.log (h);
    if (h > 700) {
        $( "#mysidebar" ).addClass("affix");
    }
    // activate tooltips.
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl, {
            placement : 'top'
        })
    })

    /**
     * AnchorJS
     */
    anchors.add('main h2:not(.no-anchor),main h3:not(.no-anchor),main h4:not(.no-anchor),main h5:not(.no-anchor)');

});

// needed for nav tabs on pages. See Formatting > Nav tabs for more details.
// script from http://stackoverflow.com/questions/10523433/how-do-i-keep-the-current-tab-active-with-twitter-bootstrap-after-a-page-reload
$(function() {
    var json, tabsState;
    $('a[data-bs-toggle="pill"], a[data-bs-toggle="tab"]').on('shown.bs.tab', function(e) {
        var href, json, parentId, tabsState;

        tabsState = localStorage.getItem("tabs-state");
        json = JSON.parse(tabsState || "{}");
        parentId = $(e.target).parents("ul.nav.nav-pills, ul.nav.nav-tabs").attr("id");
        href = $(e.target).attr('href');
        json[parentId] = href;

        return localStorage.setItem("tabs-state", JSON.stringify(json));
    });

    tabsState = localStorage.getItem("tabs-state");
    json = JSON.parse(tabsState || "{}");

    $.each(json, function(containerId, href) {
        var tabEl = $("#" + containerId + " a[href=" + href + "]")[0];
        if (tabEl) {
            var tab = new bootstrap.Tab(tabEl);
            tab.show();
        }
    });

    $("ul.nav.nav-pills, ul.nav.nav-tabs").each(function() {
        var $this = $(this);
        if (!json[$this.attr("id")]) {
            var firstTabEl = $this.find("a[data-bs-toggle=tab]:first, a[data-bs-toggle=pill]:first")[0];
            if (firstTabEl) {
                var tab = new bootstrap.Tab(firstTabEl);
                tab.show();
            }
        }
    });
});
