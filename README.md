# ember-set-body-class

This addon lets you set classes on the body like:

```hbs
{{set-body-class "hello}}
```

Whenever the above template is rendered, the `<body>` tag will have class `hello` added to it. When it's destroyed, the class is removed.

This works in both in-browser and in Fastboot. Fastboot support depends on https://github.com/ember-fastboot/fastboot/commit/20bbbc357b8183d0b2ca4463c5cb1dca5f7fdf8f).


## Install

```sh
ember install ember-set-body-class
```
