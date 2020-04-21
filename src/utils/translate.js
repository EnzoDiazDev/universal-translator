const options = { }
const googleTranslate = require('google-translate')(process.env.GOOGLE_TRANSLATE_API_KEY, options)


export default async function translate ({ text, srcLang, targetLang }) {
	return new Promise(function (resolve, reject) {
		googleTranslate.translate(text, srcLang, targetLang, function(err, translation) {
			if (err)
				return reject(err)

		  resolve(translation)
		})
	})
}

// DEV NOTE: commented to prevent api error. 

// export default async function translate (){
// 	return new Promise((res, rej) => res({translatedText: "traducido"}))
// }