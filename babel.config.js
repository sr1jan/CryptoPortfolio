module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel', 'transform-remove-console'],
    },
    test: {
      presets: [
        ['@babel/preset-env', {targets: {node: 'current'}}],
      ],
    }
  },
};
