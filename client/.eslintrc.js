module.exports = {
  extends: ['react-app', 'airbnb-standard'],
  rules: {
    'no-extra-semi': 2,
    'semi': [2, 'never'],
    'comma-dangle': ['error', 'never'],
    'react/jsx-curly-spacing': [2, {'when': 'always', 'spacing': {
      'objectLiterals': 'never'
    }}]
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'config/webpack.config.dev.js'
      }
    }
  }
}
