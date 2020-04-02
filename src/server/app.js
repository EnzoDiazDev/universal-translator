import bodyParser   from 'body-parser'
import compression  from 'compression'
import cookieParser from 'cookie-parser'
import express      from 'express'
import helmet       from 'helmet'
import path         from "path"

import routes from "../routes/routes"

const app = express()

/* --Configuration-- */
app.disable('x-powered-by')    // don't broadcast server info
app.set("port", process.env.PORT || 5000)
const NINETY_DAYS_IN_MILLISECONDS = 7776000000
const SECURE_COOKIE = (process.env.SECURE_COOKIE || '').trim().toLowerCase() === 'true'
if (SECURE_COOKIE) {
  // set to true when running node behind a reverse proxy or load balancer
  // http://expressjs.com/en/4x/api.html#trust.proxy.options.table
  app.set('trust proxy', 1) // trust first proxy
}

/* --Middlewares-- */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(compression())
app.use(helmet())
app.set("views", path.resolve("src/public/views"))
app.set("view engine", "ejs")
app.use(express.static(path.resolve("src/public")))

// all routes below this line are API calls and should never cache.
app.use(function (req, res, next) {
  const val = 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'
  res.set('Cache-Control', val)
  res.set('Pragma', 'no-cache')
  return next()
})

app.use(routes)
//404 prevent
app.use((req, res) => res.status(404).json({error: 'URL not found', message: `The requested url '${req.url}' was not found.`}))

export default app
