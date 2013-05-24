(function(global, $){
    function Instrumental(){
        return {

            activate: function (options) {
                // Set the defaultEndpoint and baseData
                this.defaultEndpoint = options.defaultEndpoint;
                this.baseData = options.defaultEndpoint || {};

                // activate event listeners
                this.activateEventListeners();
            },

            activateEventListeners: function() {
                // for each element that has the data-instrumental-action
                // set, activate an event listener
                var elements = $("[data-instrumental-action]");
                elements.forEach(this.activateEventListener);
            },

            activateEventListener: function(el) {
                // get the element trigger
                var trigger = el.data("instrumental-trigger");

                // get the URL endpoint to which to POST the event data
                var url = el.data("defaultEndpoint") || this.defaultEndpoint;

                // when the event is triggered, post the data
                el.on(trigger, function(){
                    $.post(
                        url,
                        this.getElementData(el));
                });
            },

            getElementData: function(el) {
                var data = el.data();

                // The data dictionary starts off as baseData
                var instrumentalData = $.extend({}, this.baseData);

                // Construct the data dictionary from the
                // $.data() values that starts with data-instrumental
                for (var key in data) {
                    if ("instrumental" in key) {
                        var instrumentalKey = key.replace("instrumental", "");
                        instrumentalData[instrumentalKey] = data[key];
                    }
                }

                return instrumentalData;
            }

        };
    }

    window.Instrumental = Instrumental;
}(window, jQuery));
