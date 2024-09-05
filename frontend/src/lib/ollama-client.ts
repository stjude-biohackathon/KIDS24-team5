import { Ollama } from 'ollama';

interface ChatMessage {
    role: 'user' | 'assistant';
  content: string;
}

interface OllamaResponse {
  message: string; // Replace with actual response structure if needed
}

class OllamaWrapper {
  private ollama: Ollama;
  private model: string;

  constructor(host: string, model: string) {
    this.ollama = new Ollama({ host });
    this.model = model;
  }

  // Method to send a chat message
  async sendMessage(content: string): Promise<OllamaResponse> {
    try {
      const response = await this.ollama.chat({
        model: this.model,
        messages: [{ role: 'user', content }],
      });
      return response as OllamaResponse;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  // Method to send an array of chat messages
  async sendMessages(messages: ChatMessage[]): Promise<OllamaResponse> {
    try {
      const response = await this.ollama.chat({
        model: this.model,
        messages,
      });
      return response as OllamaResponse;
    } catch (error) {
      console.error('Error sending messages:', error);
      throw error;
    }
  }

  // Optionally, allow changing the model dynamically
  setModel(newModel: string): void {
    this.model = newModel;
  }

  // Allow setting a new host
  setHost(newHost: string): void {
    this.ollama = new Ollama({ host: newHost });
  }
}
(async () => {
    const ollamaWrapper = new OllamaWrapper('http://127.0.0.1:11434', 'llama3.1');
    
    try {
      const response = await ollamaWrapper.sendMessage('Why is the sky blue?');
      console.log(response);
    } catch (error) {
      console.error('Failed to get response from Ollama:', error);
    }
  })();
  