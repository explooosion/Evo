#ESLint-plugin-formatting

Linting rules for ESLint realted to code style formatting.

# Installation

Install [ESLint](https://www.github.com/eslint/eslint) either locally or globally.

    npm install eslint

If you installed `ESLint` globally, you have to install this plugin globally too. Otherwise, install it locally.

    $ npm install eslint-plugin-formatting

# Configuration

Add `plugins` section and specify ESLint-plugin-formatting as a plugin in `.eslintrc`.

```json
{
  "plugins": [
    "formatting"
  ]
}
```

Finally, enable rules that you would like to use.

```json
{
  "rules": {
    "formatting/newline-object-in-array": 2,
    "formatting/space-after-class-name": 2
  }
}
```

# List of supported rules

* [newline-object-in-array](docs/newline-object-in-array.md): If array is multiline, object has to start in new line
* [space-after-class-name](docs/space-after-class-name.md): Enforce one space between class name and block bracket
