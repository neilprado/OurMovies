module.exports = {
  plugins: [
    require('autoprefixer')({ browsers: ['last 3 versions', 'android >= 4.4', 'ie>7', 'safari >= 7'] }),
    require('cssnano')({discardComments: {removeAll: true}})
  ]
}