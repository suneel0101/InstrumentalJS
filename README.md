# InstrumentalJS

Everytime a user takes an action on your webpage, easily send back that event data in JSON to your event logging system.


# When should I use this?
Suppose you want to measure when a user

1. clicks on a button or link
2. drags a bookmark to the toolbar
3. interacts in anyway with a DOM element

You want to capture these user interactions and send them, along with some user data, to the server.
InstrumentalJS makes this very simple.

# Example
Here is your HTML:

```html
<button
    data-instrumental-action="clickedPurchase"
    data-instrumental-trigger="click"
    data-instrumental-item-number="ud2983">Purchase
</button>

<a
    data-instrumental-action="draggedBookmark"
    data-instrumental-trigger="mousedown"
    data-instrumental-defaultEndpoint="bookmark/endpoint/">Drag me!
</a>

```

Here is your JS on that page:

```javascript
// In <head>
<script src="/instrumental.js"></script>

// At the end of <body>
<script>
Instrumental({
    defaultEndpoint: '/myloggingendpoint', // where the JSON event data will be sent
                                           // can be overriden by specifying
                                           // data-instrumental-defaultEndpoint on the
                                           // element
    baseData: {
        "userID": "298345"
    }
}).activate();
</script>
```

Now the page is instrumented to do the following:


1. When a user clicks on the "Purchase" button, an ajax POST will be sent to the defaultEndpoint, "/myloggingendpoint" with the following data:

```
{
    "action": "clickedPurchase",
    "userID": "298345",
    "itemNumber": "ud2983",
    "trigger": "click"
 }
```


2. When a user starts to drag the the bookmark and the "mousedown" event is triggered, an ajax POST will be sent to the non-default endpoint specified "bookmark/endpoint/" with the following data:

```
{
    "action": "draggedBookmark",
    "userID": "298345",
    "trigger": "mousedown"
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
