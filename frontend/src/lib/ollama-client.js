import { Ollama } from 'ollama'

const llmLoading = new Event('llmLoading')
const llmLoaded = new Event('llmLoaded')

const IP = '40.124.104.197'
const PORT = 80
const MODEL = 'llama3.1'

const ollama = new Ollama({ host: 'http://' + IP + ':' + PORT })

const submitChat = async (prompt, system, context) => {
  // fire an event to tell everyone that
  // we are starting to chat with the model
  window.dispatchEvent(llmLoading)
  const response = await ollama.generate({
    model: MODEL,
    prompt:  system + prompt,
    system: 'given the following context: ```' + context + '``` ',
    stream: false
  })
  window.dispatchEvent(llmLoaded)
  return response.response
}

export default submitChat
