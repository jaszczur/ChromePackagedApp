
document.observe("dom:loaded", function() {
    $('button').observe("click", function(event) {
        $('welcomeMessage').toggle()
    });
});
