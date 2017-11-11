module.exports = {
    parser: "babel-eslint",
    extends: "airbnb-base",
    env: {
        es6: true,
        node: true,
        browser: true
    },
    "plugins": [
        "formatting"
    ],
    rules: {
        "linebreak-style": [1, "windows"],
        "semi": 0,
        "no-console": "off",
        "no-empty": "off",
        "padded-blocks": 0,
        "indent": ["error", 4],
        "import/no-extraneous-dependencies": 0
    }
};