import { Ollama } from 'ollama'

const llmLoading = new Event('llmLoading')
const llmLoaded = new Event('llmLoaded')

const IP = '40.124.104.197'
const PORT = 80
const MODEL = 'nomic-embed-text:latest'

const ollama = new Ollama({ host: 'http://' + IP + ':' + PORT })

const getDistances = async (sentences) => {
  // fire an event to tell everyone that
  // we are starting to chat with the model
  window.dispatchEvent(llmLoading)
  const response = await ollama.embed({
    model: MODEL,
    input:  sentences,
    stream: false
  })
  window.dispatchEvent(llmLoaded)
  const embeddings = response.embeddings

  const distances_ = []
  // Calculate cosine similarity subsequnt pairs of sentences
  for (let i = 0; i < embeddings.length - 1; i++) {
    const distance = cosinesim(embeddings[i], embeddings[i + 1])
    distances_.push(distance)
  }

  // convert into this json format {distances: [sentences: [sentence1, sentence2], distances: [distance1]]}
  const distances = []
  for (let i = 0; i < distances_.length; i++) {
    distances[i] = {
      sentences: [sentences[i], sentences[i + 1]],
      distance: distances_[i]
    }
  }
  return distances
}


function cosinesim(A, B) {
  var dotproduct = 0;
  var mA = 0;
  var mB = 0;

  for(var i = 0; i < A.length; i++) {
      dotproduct += A[i] * B[i];
      mA += A[i] * A[i];
      mB += B[i] * B[i];
  }

  mA = Math.sqrt(mA);
  mB = Math.sqrt(mB);
  var similarity = dotproduct / (mA * mB);

  return similarity;
}

export default getDistances
