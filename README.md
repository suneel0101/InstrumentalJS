# instrumental.js

Everytime a user takes an action on your webpage, use instrumental.js to easily send back that event data in JSON to your event logging system.

# Usage
Just add html attributes to the elements you want to measure the interaction on; at the end of the body, instantiate the Instrumental object with some parameters and call activate().

### Set the event trigger

* `data-instrumental-trigger`: should be set to the jQuery event to listen to, e.g. "click", "mouseover", etc

### Send back any key-value data you want
Just add to the DOM element the attribute `data-instrumental-X` where X can be anything and then X and its value will be send back in the JSON data for the event, e.g. the following link

```html
<a data-instrumental-trigger="click" data-instrumental-thingy="blah">Blah</a>
```

when clicked would send back

```json
{
    "Trigger": "click",
    "Thingy": "blah"
}
```

### Specify where to send the data
Set `defaultURLEndpoint`, URL the event JSON will be sent to, as an attribute of the `Instrumental` JS object and data from all events will be sent there. If you want data from different events to be sent to different endpoints, on the element in question, specify where with the html attribute `data-URLEndpoint`.

### Common data for all events
In case you have data that you want to be included in every event but don't want to repeat it on each element you're measuring, just add it to  `baseData`: a base dictionary of JSON data to be sent for every event; e.g. user_id


# Example
```html
// In <head>
    <script src="/jquery.js"></script>
    <script src="/instrumental.js"></script>

// In body
<button
    data-instrumental-event="clickedPurchase"
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
    "Event": "clickedPurchase",
    "UserID": "298345",
    "ItemNumber": "ud2983",
    "Trigger": "click"
 }
```

# Dependencies
You only need jQuery.
