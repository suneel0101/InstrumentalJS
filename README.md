# instrumental.js

Everytime a user takes an action on your webpage, use instrumental.js to easily send back that event data in JSON to your event logging system.

# Example
```html
// In <head>
    <script src="/jquery.js"></script>
    <script src="/instrumental.js"></script>

// In body
<button
    data-instrumental-action="clickedPurchase"
    data-instrumental-trigger="click"
    data-instrumental-item-number="ud2983">Purchase
</button>

<script>
Instrumental({
    defaultEndpoint: '/myloggingendpoint',
    baseData: {
        "userID": "298345"
    }}).activate();
</script>
```

When a user clicks on the "Purchase" button, an ajax POST will be sent to the defaultEndpoint, "/myloggingendpoint" with the following data:

```
{
    "Action": "clickedPurchase",
    "UserID": "298345",
    "ItemNumber": "ud2983",
    "Trigger": "click"
 }
```

# API
Specify the following attributes on the elements on which you want to measure the user interaction.


* `data-instrumental-event`: name of the event, e.g. "clickedPurchase"
* `data-instrumental-trigger`: jQuery event to listen for, e.g. "mousedown"
* `baseData`: a base dictionary of JSON data to be sent for every event; e.g. user_id
* `defaultEndpoint`: URL where event JSON data should be send. If you want to send data for different events to different URLs, just add an data-instrumental-defaultEndpoint to the element, with the value being the URL you want to send it to.

The system for including information to be sent back is very flexible.
### You can send back any key-value data you want
Just add to the DOM element the attribute `data-instrumental-X` where X can be anything and then X and its value will be send back in the JSON data for the event.

# Dependencies
You only need jQuery.
