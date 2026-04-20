$( document ).ready(function() {

    //this script says, if the height of the viewport is greater than 800px, then insert sticky-top class
    var h = $(window).height();
    if (h > 700) {
        $( "#mysidebar" ).addClass("sticky-top").css("top", "20px");
    }
    // activate tooltips.
    $('[data-bs-toggle="tooltip"]').tooltip({
        placement : 'top'
    });

    /**
     * AnchorJS
     */
    anchors.add('main h2:not(.no-anchor),main h3:not(.no-anchor),main h4:not(.no-anchor),main h5:not(.no-anchor)');

    /**
     * Sidebar accordion for leaf items
     */
    $('.sidebar-nav a.nav-link:not([data-bs-toggle="collapse"])').on('click', function() {
        var $parentUl = $(this).closest('ul');
        $parentUl.find('.collapse.show').collapse('hide');
    });

});

// needed for nav tabs on pages.
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
        return $("#" + containerId + " a[href=\"" + href + "\"]").tab('show');
    });

    $("ul.nav.nav-pills, ul.nav.nav-tabs").each(function() {
        var $this = $(this);
        if (!json[$this.attr("id")]) {
            return $this.find("a[data-bs-toggle=tab]:first, a[data-bs-toggle=pill]:first").tab("show");
        }
    });
});
