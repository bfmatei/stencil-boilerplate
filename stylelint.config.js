module.exports = {
  rules: {
    // Possible Errors
    // Color
    // 'color-no-invalid-hex': true,

    // Font Family
    'font-family-no-duplicate-names': true,
    'font-family-no-missing-generic-family-keyword': true,

    // Function
    'function-calc-no-unspaced-operator': true,
    'function-linear-gradient-no-nonstandard-direction': true,

    // String
    'string-no-newline': true,

    // Unit
    'unit-no-unknown': true,

    // Property
    'property-no-unknown': true,

    // Keyframe Declaration
    'keyframe-declaration-no-important': true,

    // Declaration Block
    'declaration-block-no-duplicate-properties': true,
    'declaration-block-no-shorthand-property-overrides': true,

    // Block
    'block-no-empty': true,

    // Selector
    'selector-pseudo-class-no-unknown': true,
    'selector-pseudo-element-no-unknown': true,
    // 'selector-type-no-unknown': true,

    // Media Feature
    'media-feature-name-no-unknown': true,

    // At-rule
    'at-rule-no-unknown': true,

    // Comment
    'comment-no-empty': true,

    // General / Sheet
    'no-descending-specificity': true,
    'no-duplicate-at-import-rules': true,
    'no-duplicate-selectors': true,
    'no-empty-source': true,
    'no-extra-semicolons': true,
    'no-invalid-double-slash-comments': true,

    // Limit language features
    // Color
    'color-named': 'never',
    'color-no-hex': true,

    // Function
    // 'function-blacklist': [],
    // 'function-url-no-scheme-relative': true,
    // 'function-url-scheme-blacklist': [],
    // 'function-url-scheme-whitelist': [],
    // 'function-whitelist': [],

    // Number
    'number-max-precision': 3,

    // Time
    // 'time-min-milliseconds': 0,

    // Unit
    // 'unit-blacklist': [],
    // 'unit-whitelist': [],

    // Shorthand property
    'shorthand-property-no-redundant-values': true,

    // Value
    'value-no-vendor-prefix': true,

    // Custom property
    // 'custom-property-pattern': '',

    // Property
    // 'property-blacklist': [],
    'property-no-vendor-prefix': true,
    // 'property-whitelist': [],

    // Declaration
    'declaration-block-no-redundant-longhand-properties': true,
    'declaration-no-important': true,
    // 'declaration-property-unit-blacklist': {},
    // 'declaration-property-unit-whitelist': {},
    // 'declaration-property-value-blacklist': {},
    // 'declaration-property-value-whitelist': {},

    // Declaration block
    'declaration-block-single-line-max-declarations': 1,

    // Selector
    // 'selector-attribute-operator-blacklist': [],
    // 'selector-attribute-operator-whitelist': [],
    // 'selector-class-pattern': '',
    // 'selector-id-pattern': '',
    // 'selector-max-attribute': 0,
    // 'selector-max-class': 0,
    // 'selector-max-combinators': 0,
    // 'selector-max-compound-selectors': 0,
    'selector-max-empty-lines': 0,
    'selector-max-id': 0,
    // 'selector-max-specificity': '0,0,0',
    // 'selector-max-type': 0,
    'selector-max-universal': 0,
    // 'selector-nested-pattern': '',
    // 'selector-no-qualifying-type': true,
    'selector-no-vendor-prefix': true,
    // 'selector-pseudo-class-blacklist': [],
    // 'selector-pseudo-class-whitelist': [],

    // Media Feature
    // 'media-feature-name-blacklist': [],
    'media-feature-name-no-vendor-prefix': true,
    // 'media-feature-name-whitelist': [],

    // Custom Media
    // 'custom-media-pattern': '',

    // At-rule
    // 'at-rule-blacklist': [],
    'at-rule-no-vendor-prefix': true,
    // 'at-rule-whitelist': [],

    // Comment
    'comment-word-blacklist': '/^TODO:/',

    // General / Sheet
    // 'max-nesting-depth': 0,
    'no-unknown-animations': true,

    // Stylistic issues
    // Color
    // 'color-hex-case': 'lower',
    // 'color-hex-length': 'long',

    // Font Family
    'font-family-name-quotes': 'always-unless-keyword',

    // Font Weight
    'font-weight-notation': 'numeric',

    // Function
    'function-comma-newline-after': 'always-multi-line',
    'function-comma-newline-before': 'never-multi-line',
    'function-comma-space-after': 'always-single-line',
    'function-comma-space-before': 'never',
    'function-max-empty-lines': 0,
    'function-name-case': 'lower',
    'function-parentheses-newline-inside': 'always-multi-line',
    'function-parentheses-space-inside': 'never',
    'function-url-quotes': 'always',
    'function-whitespace-after': 'always',

    // Number
    'number-leading-zero': 'always',
    'number-no-trailing-zeros': true,

    // String
    'string-quotes': 'single',

    // Length
    'length-zero-no-unit': true,

    // Unit
    'unit-case': 'lower',

    // Value
    'value-keyword-case': 'lower',

    // Value List
    'value-list-comma-newline-after': 'always-multi-line',
    'value-list-comma-newline-before': 'never-multi-line',
    'value-list-comma-space-after': 'always-single-line',
    'value-list-comma-space-before': 'never',
    'value-list-max-empty-lines': 0,

    // Custom Property
    'custom-property-empty-line-before': 'never',

    // Property
    'property-case': 'lower',

    // Declaration
    // 'declaration-bang-space-after': 'always',
    // 'declaration-bang-space-before': 'never',
    'declaration-colon-newline-after': 'always-multi-line',
    'declaration-colon-space-after': 'always-single-line',
    'declaration-colon-space-before': 'never',
    'declaration-empty-line-before': 'never',

    // Declaration Block
    'declaration-block-semicolon-newline-after': 'always',
    'declaration-block-semicolon-newline-before': 'never-multi-line',
    'declaration-block-semicolon-space-after': 'always-single-line',
    'declaration-block-semicolon-space-before': 'never',
    'declaration-block-trailing-semicolon': 'always',

    // Block
    'block-closing-brace-empty-line-before': 'never',
    'block-closing-brace-newline-after': 'always',
    'block-closing-brace-newline-before': 'always',
    // 'block-closing-brace-space-after': '',
    'block-closing-brace-space-before': 'always-single-line',
    'block-opening-brace-newline-after': 'always',
    // 'block-opening-brace-newline-before': '',
    'block-opening-brace-space-after': 'always-single-line',
    'block-opening-brace-space-before': 'always',

    // Selector
    'selector-attribute-brackets-space-inside': 'never',
    'selector-attribute-operator-space-after': 'never',
    'selector-attribute-operator-space-before': 'never',
    'selector-attribute-quotes': 'always',
    'selector-combinator-space-after': 'always',
    'selector-combinator-space-before': 'always',
    'selector-descendant-combinator-no-non-space': true,
    'selector-pseudo-class-case': 'lower',
    'selector-pseudo-class-parentheses-space-inside': 'never',
    'selector-pseudo-element-case': 'lower',
    'selector-pseudo-element-colon-notation': 'single',
    'selector-type-case': 'lower',

    // Selector List
    'selector-list-comma-newline-after': 'always',
    'selector-list-comma-newline-before': 'never-multi-line',
    'selector-list-comma-space-after': 'always-single-line',
    'selector-list-comma-space-before': 'never',

    // Rule
    'rule-empty-line-before': [
      'always-multi-line',
      {
        except: [
          'first-nested'
        ],
        ignore: [
          'after-comment'
        ]
      }
    ],

    // Media Feature
    'media-feature-colon-space-after': 'always',
    'media-feature-colon-space-before': 'never',
    'media-feature-name-case': 'lower',
    'media-feature-parentheses-space-inside': 'never',
    'media-feature-range-operator-space-after': 'always',
    'media-feature-range-operator-space-before': 'always',

    // Media Query List
    'media-query-list-comma-newline-after': 'always-multi-line',
    'media-query-list-comma-newline-before': 'never-multi-line',
    'media-query-list-comma-space-after': 'always-single-line',
    'media-query-list-comma-space-before': 'never',

    // At-rule
    'at-rule-empty-line-before': [
      'always',
      {
        except: [
          'blockless-after-same-name-blockless',
          'first-nested'
        ],
        ignore: [
          'after-comment'
        ]
      }
    ],
    'at-rule-name-case': 'lower',
    'at-rule-name-newline-after': 'always-multi-line',
    'at-rule-name-space-after': 'always-single-line',
    'at-rule-semicolon-newline-after': 'always',
    'at-rule-semicolon-space-before': 'never',

    // Comment
    'comment-empty-line-before': [
      'always',
      {
        'except': [
          'first-nested'
        ],
        'ignore': [
          'after-comment',
          'stylelint-commands'
        ]
      }
    ],
    'comment-whitespace-inside': 'always',

    // General / Sheet
    'indentation': 2,
    'max-empty-lines': 1,
    'max-line-length': 160,
    'no-eol-whitespace': true,
    'no-missing-end-of-source-newline': true
  }
};
