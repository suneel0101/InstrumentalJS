# instrumental.js

Every time a user takes an action on your webpage, use instrumental.js to easily send back that event data in JSON to your event logging system.

# Usage
The way to instrument your HTML elements is simple. Just add `data-instrumental-*` attributes to them. Then at the end of the body, instantiate the Instrumental object with the parameters discussed below and call activate().

### Set the event trigger

`data-instrumental-trigger` should equal the jQuery event to listen to, e.g. "click", "mouseover", etc, e.g.

```html
<a
  id="example-link"
  data-instrumental-trigger="click"
  data-instrumental-thingy="blah">Blah
</a>
```

### Send back any key-value data you want
Just add the html attribute `data-instrumental-X` where X can be anything. X and its value will be send back in the event data, e.g. when the link from the pervious section is clicked, this is sent to the server:

```json
{
    "Trigger": "click",
    "Thingy": "blah"
}
```

### Specify where to send the data
Set `Instrumental.endpoint` to the URL you want the event JSON to be sent. If you want data from different events to be sent to different endpoints, on the element in question, specify where to send it via the attribute `data-instrumental-endpoint`.

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
    endpoint: '/myloggingendpoint',
    baseData: {
        "UserID": "298345"
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
