import ollama from 'ollama/dist/index.cjs'

const submitChat = async (prompt) => {
  const content = prompt
  const response = await ollama.chat({
    model: 'llama3.1',
    messages: [{ role: 'user', content }]
  })
  console.log(response.message.content)
  return response.message.content
}

export default submitChat
