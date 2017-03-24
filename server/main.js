import express from 'express'
import path from 'path'
import webpack from 'webpack'
import webpackDev from 'webpack-dev-middleware'
import webpackHot from 'webpack-hot-middleware'
import webpackConfig from '../webpack/client/development'
import { env, root_path, dir_client, dir_public, dir_dist } from '../config'

const app = express()

// Apply gzip compression, hand over to nginx in production// import compress from('compression')
// import compress from('compression')
// app.use(compress())

// Apply Webpack HMR Middleware
if (env === 'development') {
  const compiler = webpack(webpackConfig)

  console.log('Enabling webpack dev and HMR middleware')
  app.use(webpackDev(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: path.resolve(root_path, dir_client),
    hot: true,
    quiet: false,
    noInfo: false,
    lazy: false,
    stats: {
      chunks: false,
      chunkModules: false,
      colors: true
    }
  }))
  app.use(webpackHot(compiler, {
    path: '/__webpack_hmr'
  }))

  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(dir_public))

  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // rendering, you'll want to remove this middleware.
  app.use('*', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
} else {
  log(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(dir_dist))
}
app.listen(3000, () => {
  console.log(`Server is now running at http://localhost:3000`)
})
