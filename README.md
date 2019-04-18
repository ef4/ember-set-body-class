# ember-set-body-class

This addon lets you set classes on the body like:

```hbs
{{set-body-class "hello"}}
```

Whenever the above template is rendered, the `<body>` tag will have class `hello` added to it. When it's destroyed, the class is removed.

This works in both in-browser and in Fastboot. Fastboot support requires at least Fastboot 1.1.1 (which incorporated the work done in https://github.com/ember-fastboot/fastboot/pull/171).


## Install

```sh
ember install ember-set-body-class
```
