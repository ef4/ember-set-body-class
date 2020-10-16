ember-set-body-class
==============================================================================

This addon lets you set classes on the body like:

```hbs
{{set-body-class "hello"}}
```

Whenever the above template is rendered, the `<body>` tag will have class
`hello` added to it. When it's destroyed, the class is removed.


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.10 or above
* Ember CLI v2.13 or above
* Node.js v10 or above

This works in both browser and Fastboot. Fastboot support requires at least 
Fastboot 1.1.1 (which incorporated the work done in https://github.com/ember-fastboot/fastboot/pull/171).


Installation
------------------------------------------------------------------------------

```
ember install ember-set-body-class
```


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
