# Ferdinand

**Note:** currently just tested/works on Debian based Linux distributions with lots of work to make it production ready

## Configuration

* After installation:
  * Create services file at `~/.config/Ferdinand/services.json` (see below for details)
  * Open Ferdinand
  * Log in to accounts for each session (if 3 services use the same session/account then only logging in to one is sufficient)
  * Restart Ferdinand
  
## Configuring services.json

### API

The `services.json` file should contain an array of objects with each object describing the service to enable.

Each service is defined by an object which can have the following properties:
* `type` - the type of service (see Services section below for values to use)
* `session` (optional) - the session to use for this service. Multiple services can use the same session.
* `muted` (optional) - true to not show notifications for this service

### Example
```ts
[
  {
    "type": "gmail",
    "session": "work"
  },
  {
    "type": "calendar",
    "session": "work"
  },
  {
    "type": "hangoutschat",
    "session": "work"
  },
  {
    "type": "hangouts",
    "session": "work"
  },
  {
    "type": "whatsapp",
    "session": "personal"
  },
  {
    "type": "gmail",
    "session": "personal",
    "muted": true
  }
]
```
  
## Supported Services

* Gmail (gmail)
* Google Calendar (calendar)
* Hangouts Classic (hangouts)
* Hangouts Chat (hangoutschat)
* Whatsapp (whatsapp)
