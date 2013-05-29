(function(global, $){
    function Instrumental(){
        return {
            endpoint: options.endpoint,
            baseData: options.baseData || {},
            activate: function () {
                // for each element that has the data-instrumental-event
                // set, activate an event listener
                var elements = $("[data-instrumental-event]");
                for (var i=0; i < elements.length; i++) {
                    this.activateEventListener(elements[i]);
                }
            },
            activateEventListener: function(selector) {
                // get the element trigger
                var el = $(selector);
                var trigger = el.data("instrumental-trigger");
                // get the URL endpoint to which to POST the event data
                var url = el.data("instrumental-endpoint") || this.endpoint;
                // when the event is triggered, post the data
                var data = this.getElementData(el);
                el.on(trigger, function(){
                    $.post(
                        url,
                        data);
                });
            },
            getElementData: function(el) {
                var data = el.data();
                // instrumentalData starts off as a copy baseData
                // we copy baseData since we don't want to modify this.baseData
                var instrumentalData = $.extend({}, this.baseData);
                // Construct the data dictionary from the
                // $.data() values that starts with data-instrumental
                for (var key in data) {
                    if (key.match("instrumental")) {
                        var instrumentalKey = key.replace("instrumental", "");
                        instrumentalData[instrumentalKey] = data[key];
                    }
                }
                return instrumentalData;
            }
        };
    }

    global.Instrumental = Instrumental;
}(window, jQuery));
