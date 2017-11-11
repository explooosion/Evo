# Force space between class name and open bracket

When class is defined, space after class name and open bracket is not required. This
rule enforce it

## Rule Details

The following patterns are considered warnings:

```js
class Foo{
    // class body    
}

class Bar extends Foo{
    // class body    
}

class Jah extends Util.HelperClass{
    // class body    
}

```

The following patterns are not considered warnings:

```js
class Foo {
    // class body    
}

class Bar extends Foo {
    // class body    
}

class Jah extends Util.HelperClass {
    // class body    
}
```

## When Not To Use It

If you don't have particular opinion about space beween open bracket and class name
