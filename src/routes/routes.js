import { Router }   from "express"
import delay        from 'delay'
import { wrap as safeHandler } from 'async-middleware'
import translate    from '../utils/translate.js'

const router = Router()
const messages = []

router.post('/chat', async function (req, res) {
	let { srcLanguage, text, uname } = req.body

	text = text.trim()
	uname = uname.trim()
	srcLanguage = srcLanguage.trim()

	if (text.length > 256 || text.length < 2)
		return res.status(400).json({ e: 'too short' })

	if (srcLanguage !== 'en' && srcLanguage !== 'fr' && srcLanguage !== 'es')
		return res.status(400).json({ e: 'invalid src lang' })

	if (uname.length > 24)
		uname = uname.substring(0, 24)

	const texts = {
		en: '',
		es: '',
		fr: ''
	}

	const languageTargets = Object.keys(texts)

	const toTranslate = Object.keys(texts).filter((lang) => lang !== srcLanguage)
	
	let results

	try {
		results = await Promise.all(toTranslate.map((targetLang) => translate({ text, srcLang: srcLanguage, targetLang })))
		//console.log('b')
		//console.log('results:', results)
	} catch (er) {
		console.log('error translating:', er)
		res.status(400).json({ e: 'translation failed' })
	}

	results.forEach(function (r, idx) {
		const L = toTranslate[idx]
		texts[L] = r.translatedText
	})

	texts[srcLanguage] = text

	messages.push({
		originalText: text,
		detectedSourceLanguage: results[0].detectedSourceLanguage || srcLanguage,
		texts,
		t: Date.now(),
		uname
	})

	res.status(200).send('OK')
})

router.get('/poll', safeHandler(async function (req, res) {

  req.socket.setTimeout(0);
  req.socket.setNoDelay(true);
  req.socket.setKeepAlive(true);

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'X-Accel-Buffering': 'no'
  });

  let lastHash
  let connectionOpen = true, lasthash = req.headers['last-event-id']
  let sentMessageCount = 0

  req.on('close', () => { connectionOpen = false })

  const writeSSE = function ({ id, event, data }) {
    if (typeof id !== 'undefined')
      res.write(`id: ${id}\n`)

    res.write(`event: ${event}\n`)

    res.write(`data: ${JSON.stringify(data)}\n\n`)

    // support running within the compression middleware
    if (res.flush)
      res.flush()
  }

  while (connectionOpen) {
    await delay(100)  // poll every 100ms for game state and chat updates

    const newMessageCount = messages.length - sentMessageCount

    if (newMessageCount > 0) {
    	// there are new messages to receive :)
    	const msg = messages.slice(sentMessageCount, messages.length)
    	writeSSE({ id: Math.random(), event: 'chat', data: msg })

    	sentMessageCount = messages.length
    }
  }

  res.end()
}))

export default router
