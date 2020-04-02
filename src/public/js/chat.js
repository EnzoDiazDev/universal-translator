class Message {
    constructor(){

    }
}

class Client {
    /**
     * Build a client using Discord oauth2 data. 
     * @param {Object} client User data from Discord
     * @param {string} client.username
     * @param {string} client.locale
     * @param {boolean} client.mfa_enabled
     * @param {number} client.flags
     * @param {string} client.avatar
     * @param {string} client.discriminator
     * @param {string} client.id
     */
    constructor(client){
        this.username = client.username || ""
        this.locale = client.locale || ""
        this.mfa_enabled = client.mfa_enabled || false
        this.flags = client.flags || 0
        this.avatar = client.avatar || ""
        this.discriminator = client.discriminator || ""
        this.id = client.id || ""
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

//dev constant
const lang = "es"

/**
 * Indicates if the shift key has been pressed in the textarea in the last 500ms.
 * @type {boolean}
 */
let shiftActived = false

/**
 * Timeout that changes shiftActived to false.
 * @type {null | NodeJS.Timeout}
 */
let shiftTimeOut = null

/**
 * The ul element that contains all messages, as global var. 
 * @type {HTMLUListElement}
 */
var $messages_container

/**
 * This function checks every time the client types.
 * Here the user typing experience is improved.
 * (emojis, tags, colors, autocomplete, etc)
 * @this {HTMLTextAreaElement} HTMLTextAreaElement
 * @param {KeyboardEvent} e KeyboardEvent
 */
function typingHandler(e){
    //add scrollbar
    if(this.clientHeight >= 150) this.style.overflowY = "auto"
    else this.style.overflowY = "hidden"

}

document.addEventListener('DOMContentLoaded', function() {
    /* build the textarea */
    /* NOTE: Collapse the lines with addEventListener() */
    const $textarea = document.getElementById("textarea")
    if($textarea){
        $textarea.value = ""
        $textarea.style.height = "49px"
        $textarea.setAttribute("placeholder", localisation[lang]["textarea.placeholder"])
        
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
                shiftTimeOut = setTimeout(() => shiftActived = false, 500)
            }
            
            //return if there is no content in the input.
            if(key === 13 && (!e.target.value || !e.target.value.trim())) return
            if(key === 13 && e.shiftKey) return
        
            /* prepare the message */
            if(key === 13) {
                e.preventDefault()
                if((!e.target.value || !e.target.value.trim()) || !shiftActived){
                    let message = new Message(USER, e.target.value.trim())
                    e.target.value = "";
                    return;
                }
            }
        })
    }

    /* messages */
    $messages_container = document.getElementById("messages")
    if($messages_container){

    }


});