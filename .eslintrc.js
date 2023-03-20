module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/prop-types": "off"
    },
    "settings": {
        "react": {
            "pragma": "React",
            "version": "18.2.0",
        },
    },
    "globals": {
        "process": "writable",
        "module": "writable"
    }
}
