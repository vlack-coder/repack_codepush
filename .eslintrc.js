module.exports = {
  root: true,
  extends: '@react-native',
  // rules: {
  //   'prettier/prettier': 0,
  // },
  plugins: ['react', 'react-hooks','prettier'],
  rules: {
    'react-native/no-inline-styles': 0,
    'prettier/prettier': [
      'error',
      {
        'no-inline-styles': false,
      },
    ],
  },
};
