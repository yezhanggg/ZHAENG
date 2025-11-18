// AI API Integration for Hybrid Chatbot
// Supports multiple free AI providers as fallback

class AIIntegration {
    constructor() {
        // Load API settings from localStorage
        this.enabled = localStorage.getItem('ai_enabled') === 'true';
        this.provider = localStorage.getItem('ai_provider') || 'gemini';
        this.apiKey = localStorage.getItem('ai_api_key') || '';

        // API endpoints
        this.endpoints = {
            gemini: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent',
            groq: 'https://api.groq.com/openai/v1/chat/completions',
            openrouter: 'https://openrouter.ai/api/v1/chat/completions'
        };

        // Model names
        this.models = {
            gemini: 'gemini-2.0-flash-exp',
            groq: 'llama-3.3-70b-versatile',
            openrouter: 'deepseek/deepseek-chat'
        };
    }

    // Check if AI is enabled and configured
    isConfigured() {
        return this.enabled && this.apiKey.length > 0;
    }

    // Enable/disable AI fallback
    setEnabled(enabled) {
        this.enabled = enabled;
        localStorage.setItem('ai_enabled', enabled.toString());
    }

    // Set API provider
    setProvider(provider) {
        this.provider = provider;
        localStorage.setItem('ai_provider', provider);
    }

    // Set API key
    setApiKey(key) {
        this.apiKey = key;
        localStorage.setItem('ai_api_key', key);
    }

    // Get response from AI API
    async getResponse(question) {
        if (!this.isConfigured()) {
            return null;
        }

        try {
            switch (this.provider) {
                case 'gemini':
                    return await this.queryGemini(question);
                case 'groq':
                    return await this.queryGroq(question);
                case 'openrouter':
                    return await this.queryOpenRouter(question);
                default:
                    return null;
            }
        } catch (error) {
            console.error('AI API Error:', error);
            return null;
        }
    }

    // Query Google Gemini API
    async queryGemini(question) {
        const url = `${this.endpoints.gemini}?key=${this.apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are a helpful chatbot. Keep answers short (1-2 sentences). Question: ${question}`
                    }]
                }],
                generationConfig: {
                    maxOutputTokens: 100,
                    temperature: 0.7
                }
            })
        });

        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.status}`);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }

    // Query Groq API
    async queryGroq(question) {
        const response = await fetch(this.endpoints.groq, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: this.models.groq,
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful chatbot. Keep answers short (1-2 sentences).'
                    },
                    {
                        role: 'user',
                        content: question
                    }
                ],
                max_tokens: 100,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`Groq API error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    // Query OpenRouter API
    async queryOpenRouter(question) {
        const response = await fetch(this.endpoints.openrouter, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`,
                'HTTP-Referer': window.location.href,
                'X-Title': 'ZHAENG Chatbot'
            },
            body: JSON.stringify({
                model: this.models.openrouter,
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful chatbot. Keep answers short (1-2 sentences).'
                    },
                    {
                        role: 'user',
                        content: question
                    }
                ],
                max_tokens: 100,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`OpenRouter API error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    // Clear all settings
    clearSettings() {
        localStorage.removeItem('ai_enabled');
        localStorage.removeItem('ai_provider');
        localStorage.removeItem('ai_api_key');
        this.enabled = false;
        this.provider = 'gemini';
        this.apiKey = '';
    }
}
