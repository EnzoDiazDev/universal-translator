//THIS CODE HAS NOT BEEN WRITTEN WITH ANY STYLE.
//IS ONLY TO TEST FUNCTIONALITIES AND DEFINE IDEAS.
//Much of this file must be rewritten and redocumented.

const cookies = document.cookie.split("; ")
const cookieToken = cookies.find(cookie => cookie.startsWith("jwt="))

const jwt = cookieToken ? cookieToken.trim().replace("jwt=", "") : ""

/**
 * @typedef kuser
 * @property {string} username
 * @property {string} lang
 * @property {string} avatar
 */

/**
 * @typedef kdiscordUserData
 * @property {string} username
 * @property {string} lang
 * @property {string} avatar
 * @property {string} token
 * @property {string} discriminator
 * @property {string} id
 */

/**
 * @typedef kmessage
 * @property {string} content
 * @property {user} author
 * @property {Date} timestamp
 */

/**
 * in dev...
 * @typedef {{
 *  content: {
 *      original: string
 *      translated: {["lang"]:string}
 *  }
 *  timestamp: Date
 * user: {
 *      username: string
 *      lang: string
 *      id: string
 *      discriminator: string
 *      avatar: string
 *  }
 *}[]} chatMessage
*/

/**
 * Represents each message
 */
class Message {
    /**
     * Build a Message
     * @param {{original: string, translated: {["lang"]:string}}} content
     * @param {discordUserData} user 
     * @param {Date} timestamp
     */
    constructor(content, user, timestamp){
        this.author = user.username
        this.timestamp = timestamp /* TODO: calculate the Date */
        this.sourceLang = user.lang
        this.translated = content.translated
        this.originalContent = content.original

        /** List element to render */
        this.$message = document.createElement("li")
        this.$message.classList.add("message")

        let $avatar = document.createElement("div")
        $avatar.classList.add("message-avatar")

        let $avatar_image
        if(user.avatar.length === 1) {
            $avatar_image = document.createElement("i")
            $avatar_image.innerText = user.avatar
        } else {
            $avatar_image = document.createElement("img")
            $avatar_image.setAttribute("src", user.avatar)
            $avatar_image.classList.add("noclickable")
        }

        let $container = document.createElement("div")
        $container.classList.add("message-container")

        let flag = this.sourceLang /* TODO: get flag from lang */

        let $info = document.createElement("div")        
        $info.innerHTML = `
            <span class="message-author">${this.author}</span>
            <span class="dot noselect">·</span>
            <span class="message-timestamp">${this.timestamp}</span>
            <span class="message-flag">${flag}</span>
        `

        /**
         * Element that contains the message.
         * @type {HTMLDivElement}
         */
        this.$content = document.createElement("div")
        this.$content.classList.add("message-content")

        /* write lines */
        this.writeLines(this.originalContent)

        /* appends */
        $avatar.appendChild($avatar_image)
        
        $container.appendChild($info)
        $container.appendChild(this.$content)
        
        this.$message.appendChild($avatar)
        this.$message.appendChild($container)   
    }

    /**
     * Append <p> elements to the chat
     * and update content propertie
     * @param {string} content 
     */
    writeLines(content){
        if(this.content !== content) this.content += `\n${content}`
        content.split("\n").forEach(line => {
            let p = document.createElement("p")
            p.innerText = line

            this.$content.appendChild(p)
        })
    }
}

class Messenger {
    /**
     * @param {HTMLElement} container 
     */
    constructor(container){
        this.container = container
        
        /**
         * List of client-side messages
         * @type {Message[]} 
         */
        this.messages = []
    }

    /**
     * send a message
     * @param {string} content message content
     * @param {DiscordUser} user message author 
     */
    send(content, user){
        //original function
        return fetch('/chat', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, same-origin, *omit
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({
                content: content,
                user: user
            })
        })
    }

    /**
     * Render messages
     * @param {Message} message message to render
     * @param {string} lang user language
     * 
     */
    render(message, lang){
        let lastMessage = this.messages[this.messages.length - 1]

        if(lastMessage && (message.author === lastMessage.author)) lastMessage.writeLines(message.translated[lang])
        else {
            this.messages.push(message)
            this.container.appendChild(message.$message)
        }
    }
}

/**
 * ...  
 */
class User {
    /**
     * ...
     * @param {user} user 
     */
    constructor(user){
        if(!user) user = {}
        this.username = user.username || "John Doe"
        this.lang = user.lang || "en"
        this.avatar = user.avatar || this.username.charAt(0)
    }

    /**
     * ...
     * @public
     * @returns {user}
     */
    public_data(){
        return {
            username: this.username,
            lang: this.lang,
            avatar: this.avatar
        }
    }

    /**
     * Change user lang 
     * @public
     */
    changeLang(lang){
        if(lang) this.lang = lang
    }
}

///**
// * 
// * @extends User
// */
//class GithubUser extends User {
//
//}

/**
 * 
 * @extends User
 */
class DiscordUser extends User {
    /**
     * Build a Discord User using json web token
     * @param {string} token json web token
     */
    constructor(token){
        let client = jwt_decode(token)
        super({
            username: client.username,
            lang: client.locale ? client.locale.split("-")[0] : "en",
            avatar: client.avatar ? `https://cdn.discordapp.com/avatars/${client.id}/${client.avatar}.png?size=128` : ""
        })

        /** @type {string} */
        this.token = token
        
        /** @type {string} */
        this.discriminator = client.discriminator

        /** @type {string} */
        this.id = client.id
    }

    /**
     * Get all user data
     * @public
     * @returns {discordUserData}
     */
    data(){
        return {
            username: this.username,
            lang: this.lang,
            avatar: this.avatar,
            token: this.token,
            discriminator: this.discriminator,
            id: this.id 
        }
    }
}


const localisation = {
    en: {
        "textarea.placeholder": "Write a message..."
    },

    es: {
        "textarea.placeholder": "Escribe un mensaje..."
    },

    fr: {
        "textarea.placeholder": "Écrivez un message ici..."
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const $messages_container = document.getElementById("messages")
    
    if(!jwt || !$messages_container) return window.location.replace("/")
    
    const messenger = new Messenger($messages_container)
    const user = new DiscordUser(jwt)
    const connection = new EventSource(`/poll`, { withCredentials: true })

    /**
     * Indicates if the shift key has been pressed in the textarea in the last 250ms.
     * @type {boolean}
     */
    let shiftActived = false

    /**
     * Timeout that changes shiftActived to false.
     * @type {null | NodeJS.Timeout}
     */
    let shiftTimeOut = null

    /**
     * This function checks every time the client types.
     * Here the user typing experience is improved.
     * (emojis, tags, colors, autocomplete, etc)
     * @this {HTMLTextAreaElement} HTMLTextAreaElement
     * @param {KeyboardEvent} e KeyboardEvent
     */
    function typingHandler(e) {
        //add scrollbar. NOTE: ADD A STATUS VARIABLE FOR THIS :calim:
        if(this.clientHeight >= 150) this.style.overflowY = "auto"
        else this.style.overflowY = "hidden"
    }

    /**
     * handle chat events
     * @param {Event} e 
     */
    function chat(e) {
        /**@type {chatMessage} */
        const data = JSON.parse(e.data)

        let last
        for (const d of data) {
            let message = new Message(d.content, d.user, d.timestamp)
            // const m = document.createElement('div')
            // m.classList.add('message')
            // m.textContent = `${d.uname} [${d.detectedSourceLanguage}]: ${d.texts[user.lang]}`
            // m.setAttribute('title', `Original Text: ${d.originalText}`)
            // messenger.container.appendChild(m)
            // last = m
            messenger.render(message, user.lang)
        }
        messenger.container.scrollTo(0, messenger.container.scrollHeight)
    }
     
    connection.addEventListener('chat', chat)

    /* build the textarea */
    /* NOTE: Collapse (minimize) the lines with addEventListener() */
    const $textarea = document.getElementById("textarea")
    if($textarea){
        $textarea.value = ""
        $textarea.style.height = "49px"
        $textarea.setAttribute("placeholder", localisation[user.lang]["textarea.placeholder"])
        
        $textarea.addEventListener("input", typingHandler)
        
        $textarea.addEventListener("keypress", e => {
            let key = e.keyCode || e.code //prevent deprecated keycode
            // allows line breaks
            //disable linebreaks if there is no content in the input.
            if(key === 13 && e.shiftKey && (!e.target.value || !e.target.value.trim())) e.preventDefault();
            //allows linebreaks if the keys "shift + enter" are combined, then continue to the "keyup" event.
            if(key === 13 && e.shiftKey) return;
            //prevent if press enter and there is no content in the input.
            if(e.which === 13 && (!e.target.value || !e.target.value.trim())) e.preventDefault();
        })

        $textarea.addEventListener("keydown", e => {
            //prevents sending messages if shift key has been pressed.
            if(e.shiftKey) shiftActived = true
        })
        
        $textarea.addEventListener("keyup", e => {
            let key = e.keyCode || e.code //prevent deprecated keycode
            //prevents sending messages if shift key has been pressed.
            if(key === 16) {
                if(shiftTimeOut) clearTimeout(shiftTimeOut)
                shiftTimeOut = setTimeout(() => shiftActived = false, 250)
            }
            
            //return if there is no content in the input.
            if(key === 13 && (!e.target.value || !e.target.value.trim())) return
            if(key === 13 && e.shiftKey) return
        
            /* prepare the message */
            if(key === 13) {
                e.preventDefault()
                if((!e.target.value || !e.target.value.trim()) || !shiftActived){
                    let message = e.target.value.trim()
                    
                    messenger.send(message, user.data())
                    
                    e.target.value = "";
                    return;
                }
            }
        })
    }


});
