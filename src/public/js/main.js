class Message {
  constructor(){

  }
  
}

document.addEventListener('DOMContentLoaded', function() {

});

// const textarea = document.querySelector('textarea')

// async function submit (text, srcLanguage, uname) {
//   return fetch('/chat', {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     mode: 'cors', // no-cors, cors, *same-origin
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, same-origin, *omit
//     headers: {
//       'Content-Type': 'application/json; charset=UTF-8'
//     },
//     redirect: 'follow', // manual, *follow, error
//     referrer: 'no-referrer', // no-referrer, *client
//     body: JSON.stringify({
//       text,
//       srcLanguage,
//       uname
//     }) // body data type must match "Content-Type" header
//   })
// }


// function renderMessages (messages, lang) {
//   const msgContainer = document.querySelector('#messages')
//   const msgEls = msgContainer.querySelectorAll('div')

//   messages.forEach((d, idx) => {
//     const m = msgEls[idx] || document.createElement('div')
//     m.classList.add('message')
//     m.textContent = `${d.uname} [${d.detectedSourceLanguage}]: ${d.texts[lang]}`
//     m.setAttribute('title', `Original Text: ${d.originalText}`)
//     if (!msgEls[idx])
//       msgContainer.appendChild(m)
//   })
// }


// async function main () {
//   // check that we're logged in
//   let uname = localStorage.getItem('uname')
//   while (!uname) {
//     uname = prompt('please choose a username:')
//     localStorage.setItem('uname', uname)
//   }

//   let lang = localStorage.getItem('lang')
//   while (lang !== 'en' && lang !== 'fr' && lang !== 'es') {
//     lang = prompt('please choose a language. (type en or es or fr):')
//     if (lang)
//       lang = lang.toLowerCase()
//   }
//   localStorage.setItem('lang', lang)

//   const select = document.querySelector('select')
//   select.value = lang
//   select.onchange = function (ev) {
//     lang = select.value
//     localStorage.setItem('lang', lang)
//     renderMessages(messages, lang)
//   }

//   const messages = [ ]

//   textarea.onkeypress = function (ev) {
//     if (ev.key === 'Enter') {
//       const text = textarea.value.trim()

//       if (text.length > 256) {
//         alert('please be kind, send less text for now.')
//         return
//       }
  
//       submit(text, lang, uname)
//       setTimeout(() => textarea.value = '')
//     }
//   }

//   const msgContainer = document.querySelector('#messages')

//   const connection = new EventSource(`/poll`, { withCredentials: true })
//   connection.addEventListener('chat', function (e) {
//     const data = JSON.parse(e.data)
//     let last

//     for (const d of data) {
//       messages.push(d)
//       const m = document.createElement('div')
//       m.classList.add('message')
//       m.textContent = `${d.uname} [${d.detectedSourceLanguage}]: ${d.texts[lang]}`
//       m.setAttribute('title', `Original Text: ${d.originalText}`)
//       msgContainer.appendChild(m)
//       last = m
//     }

//     if (last)
//       last.scrollIntoView()
//   })
// }


// main()