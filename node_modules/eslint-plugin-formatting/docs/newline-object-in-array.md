# Force object literal to start in new line in multiline array

If object literal is element of multiline array, it open bracket has to start in new line. This rule
is created to work with "[comma-dangle](http://eslint.org/docs/rules/comma-dangle)": [2, "always-multiline"]
rule. When only comma-dangle rule is turned on, it allows ugly ending comma

## Rule Details

The following patterns are considered warnings:

```js
var multilineArray = [{
    value: 1
}];

var multilineArray = [{
    value: 1
}, {
    value: 2
}];

var multilineArray = [
    {
        value: 1
    }, {
        value: 2
    }
];

// when used with comma-dangle rule
var multilineArray = [{
    value: 1
}, {
    value: 2
}, ]; // <-- this dangle comma is so ugly
```

The following patterns are not considered warnings:

```js
var singleLineArray = [{}];
var singleLineArray = [{ value:1 }];

var multilineArray = [
    {
        value: 1
    }
];

var multilineArray = [
    {
        value: 1
    },
    {
        value: 2
    }
];

// when used with comma-dangle rule
var multilineArray = [
    {
        value: 1
    },
    {
        value: 2
    },
    ];
```

## When Not To Use It

If you are not using comma-dangle rule or prefere collapse brackets.
