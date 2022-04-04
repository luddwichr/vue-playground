module.exports = {
    "env": {
        "vue/setup-compiler-macros": true,
        "node": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "parser": "vue-eslint-parser",
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    "rules": {
    }
}
