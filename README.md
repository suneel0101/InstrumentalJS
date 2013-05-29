# instrumental.js

Everytime a user takes an action on your webpage, use instrumental.js to easily send back that event data in JSON to your event logging system.

# Example
```html
<head>
    <script src="/jquery.js"></script>
    <script src="/instrumental.js"></script>
</head>
<body>
<button
    data-instrumental-action="clickedPurchase"
    data-instrumental-trigger="click"
    data-instrumental-item-number="ud2983">Purchase
</button>

// At the end of <body>
<script>
Instrumental({
    defaultEndpoint: '/myloggingendpoint',
    baseData: {
        "userID": "298345"
    }}).activate();
</script>
</body>
```

When a user clicks on the "Purchase" button, an ajax POST will be sent to the defaultEndpoint, "/myloggingendpoint" with the following data:

```
{
    "action": "clickedPurchase",
    "userID": "298345",
    "itemNumber": "ud2983",
    "trigger": "click"
 }
```

# API
Specify the following attributes on the elements on which you want to measure the user interaction.

### 1. `data-instrumental-action`
This is the action name that will be sent back in the JSON as "action"

### 2. `data-instrumental-trigger`
This is the jQuery event to listen for on the element. For example "click", "mousedown", "ready".

### 3. `defaultEndpoint`: URL where this event JSON data should be sent
When instantiating an Instrumental object, you can set `defaultEndpoint` to some URL for the event data to be sent to.
If you want to send different events to different URL endpoints, just specify `data-instrumental-defaultEndpoint` on the element.

### 4. `baseData`: a base dictionary of JSON data to be sent for every event
If you want the userID or anything else to be sent for every event, just add it to this dictionary.

### 5. Any key-value data you want
To send back any data related to the event, just specify `data-instrumental-X` where X can be anything and then X and its value will be send back in the JSON data for the event.

# Dependencies
You only need jQuery.
