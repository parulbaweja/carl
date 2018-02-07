module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "camelcase": [2],
        "curly": ["error", "all"],
        "indent": [
            "error",
            2,
            {
              "SwitchCase": 1
            }
        ],
        "max-len": [
          "error",
          120
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "react/jsx-uses-vars": 2,
        "no-multiple-empty-lines": [
          "error",
          {"max": 1, "maxEOF": 0}
        ],
        "comma-dangle": ["error", "always-multiline"],
        "no-console": [1],
        "space-in-parens": [2, "never"],
        "template-curly-spacing": [2, "never"],
        "array-bracket-spacing": [2, "never"],
        "object-curly-spacing": [2, "never"],
        "computed-property-spacing": [2, "never"],
        "max-depth": ["error", 4],
        "max-nested-callbacks": ["error", 3],
        "prefer-const": 2,
        "func-style": ["error", "declaration", {"allowArrowFunctions": true}],
        "no-use-before-define": "error",
        "complexity": [1, 4],
        "react/prefer-stateless-function": [2, {"ignorePureComponents": false}],
        "react/prefer-es6-class": [2, "always"],
        "no-useless-constructor": "error",
        "react/no-deprecated": "error",
        "react/jsx-indent-props": [2, 2],
        "react/jsx-first-prop-new-line": [2, "multiline"],
        "react/jsx-filename-extension": [1, {"extensions": [".js"]}],
        "react/jsx-equals-spacing": [2, "never"],
        "react/jsx-curly-spacing": [2, "never"],
        "react/jsx-boolean-value": [2, "always"],
        "react/style-prop-object": 2,
        "react/sort-prop-types": [2, {"callbacksLast": false, "ignoreCase": false, "requiredFirst": false}],
        "react/require-default-props": 2,
        "react/react-in-jsx-scope": 2, // TEST!
        "react/prop-types": [2, {skipUndeclared: false}],
        "react/jsx-wrap-multilines": [2],
        "react/jsx-tag-spacing": [2, {"closingSlash": "never", "beforeSelfClosing": "never", "afterOpening": "never"}],
        "react/jsx-space-before-closing": [2, "never"],
        "react/jsx-sort-props": [2, {"callbacksLast": false, "shorthandFirst": false, "shorthandLast": false, "ignoreCase": false, "noSortAlphabetically": false}],
        "react/jsx-pascal-case": [2, {allowAllCaps: false}],
        "react/jsx-no-undef": [2],
        "react/jsx-no-target-blank": [2],
        "react/jsx-no-literals": [2],
        "react/jsx-no-duplicate-props": [2, {"ignoreCase": false}],
        "react/jsx-no-bind": [2],
    }
};

