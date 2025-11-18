// Create background particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        const size = Math.random() * 8 + 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles
createParticles();

// Chat Application Logic

// Initialize all engines
const aiIntegration = new AIIntegration();
const generativeEngine = new GenerativeEngine();
const githubLogger = new GitHubLogger();
const advancedNLP = new AdvancedNLP(); // NEW: Advanced NLP with memory, intent, sentiment

// Initialize chatbot with all enhancements
const chatbot = new ChatbotEngine(knowledgeBase, aiIntegration, generativeEngine, githubLogger, advancedNLP);

// DOM elements
const startScreen = document.getElementById('start-screen');
const mainView = document.getElementById('main-view');
const startBtn = document.getElementById('start-btn');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendButton');

// Start button click
startBtn.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    mainView.classList.remove('hidden');
    chatInput.focus();
});

// Add message to chat
function addMessage(text, type = 'bot') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;

    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.id = 'typing-indicator';

    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.innerHTML = '<span></span><span></span><span></span>';

    typingDiv.appendChild(indicator);
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Handle sending message
async function sendMessage() {
    const question = chatInput.value.trim();

    if (!question) return;

    // Add user message
    addMessage(question, 'user');
    chatInput.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Simulate thinking delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

    // Get response from chatbot
    const response = await chatbot.getResponse(question);

    // Remove typing indicator
    removeTypingIndicator();

    // Add bot response
    addMessage(response.answer, 'bot');

    // If question was sent to email, show system message
    if (response.needsEmail) {
        setTimeout(() => {
            addMessage(
                "Your question will help me grow smarter!",
                'system'
            );
        }, 500);
    }
}

// Event listeners
sendButton.addEventListener('click', sendMessage);

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Add welcome suggestions after a delay (only if chat is started)
let welcomeSuggestionShown = false;

function showWelcomeSuggestion() {
    if (!welcomeSuggestionShown && !mainView.classList.contains('hidden')) {
        addMessage("Try asking: 'What features are available?' or 'Tell me a joke!'", 'system');
        welcomeSuggestionShown = true;
    }
}

// Show suggestion after main view is visible
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target === mainView && !mainView.classList.contains('hidden')) {
            setTimeout(showWelcomeSuggestion, 2000);
        }
    });
});

observer.observe(mainView, {
    attributes: true,
    attributeFilter: ['class']
});

// ==================== AI SETTINGS UI ====================

// DOM elements for settings
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const closeSettings = document.getElementById('close-settings');
const aiToggle = document.getElementById('ai-toggle');
const aiProvider = document.getElementById('ai-provider');
const apiKeyInput = document.getElementById('api-key');
const saveSettingsBtn = document.getElementById('save-settings');
const clearSettingsBtn = document.getElementById('clear-settings');
const aiStatus = document.getElementById('ai-status');
const getKeyLink = document.getElementById('get-key-link');

// API key links
const apiKeyLinks = {
    gemini: 'https://aistudio.google.com/app/apikey',
    groq: 'https://console.groq.com/keys',
    openrouter: 'https://openrouter.ai/keys'
};

// Load settings on startup
function loadSettings() {
    aiToggle.checked = aiIntegration.enabled;
    aiProvider.value = aiIntegration.provider;
    apiKeyInput.value = aiIntegration.apiKey;
    updateStatus();
    updateKeyLink();
}

// Update AI status display
function updateStatus() {
    if (aiIntegration.isConfigured()) {
        aiStatus.textContent = `Enabled (${aiIntegration.provider})`;
        aiStatus.style.color = '#10b981';
    } else if (aiIntegration.enabled && !aiIntegration.apiKey) {
        aiStatus.textContent = 'Enabled (No API key)';
        aiStatus.style.color = '#f59e0b';
    } else {
        aiStatus.textContent = 'Disabled';
        aiStatus.style.color = '#6b7280';
    }
}

// Update "Get API key" link
function updateKeyLink() {
    getKeyLink.href = apiKeyLinks[aiIntegration.provider];
}

// Open settings modal
settingsBtn.addEventListener('click', () => {
    settingsModal.classList.remove('hidden');
    loadSettings();
});

// Close settings modal
closeSettings.addEventListener('click', () => {
    settingsModal.classList.add('hidden');
});

// Close modal when clicking outside
settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) {
        settingsModal.classList.add('hidden');
    }
});

// Update key link when provider changes
aiProvider.addEventListener('change', () => {
    updateKeyLink();
});

// Save settings
saveSettingsBtn.addEventListener('click', () => {
    aiIntegration.setEnabled(aiToggle.checked);
    aiIntegration.setProvider(aiProvider.value);
    aiIntegration.setApiKey(apiKeyInput.value.trim());

    updateStatus();

    // Show confirmation
    const originalText = saveSettingsBtn.textContent;
    saveSettingsBtn.textContent = '✓ Saved!';
    saveSettingsBtn.style.background = '#10b981';

    setTimeout(() => {
        saveSettingsBtn.textContent = originalText;
        saveSettingsBtn.style.background = '';
    }, 2000);
});

// Clear all settings
clearSettingsBtn.addEventListener('click', () => {
    if (confirm('Clear all AI settings? This cannot be undone.')) {
        aiIntegration.clearSettings();
        loadSettings();

        // Show confirmation
        const originalText = clearSettingsBtn.textContent;
        clearSettingsBtn.textContent = '✓ Cleared!';

        setTimeout(() => {
            clearSettingsBtn.textContent = originalText;
        }, 2000);
    }
});

// Load settings on page load
loadSettings();

// ==================== GITHUB SETTINGS UI ====================

// DOM elements for GitHub settings
const githubToggle = document.getElementById('github-toggle');
const githubToken = document.getElementById('github-token');
const githubOwner = document.getElementById('github-owner');
const githubRepo = document.getElementById('github-repo');
const testGithubBtn = document.getElementById('test-github');
const githubTestStatus = document.getElementById('github-test-status');
const githubStatus = document.getElementById('github-status');

// Load GitHub settings
function loadGitHubSettings() {
    githubToggle.checked = githubLogger.enabled;
    githubToken.value = githubLogger.githubToken;
    githubOwner.value = githubLogger.repoOwner;
    githubRepo.value = githubLogger.repoName;
    updateGitHubStatus();
}

// Update GitHub status display
function updateGitHubStatus() {
    if (githubLogger.isConfigured()) {
        githubStatus.textContent = `Enabled (${githubLogger.repoOwner}/${githubLogger.repoName})`;
        githubStatus.style.color = '#10b981';
    } else if (githubLogger.enabled && !githubLogger.githubToken) {
        githubStatus.textContent = 'Enabled (Not configured)';
        githubStatus.style.color = '#f59e0b';
    } else {
        githubStatus.textContent = 'Disabled';
        githubStatus.style.color = '#6b7280';
    }
}

// Test GitHub connection
testGithubBtn.addEventListener('click', async () => {
    githubTestStatus.textContent = 'Testing...';
    githubTestStatus.className = 'test-status';

    try {
        // Temporarily set values for testing
        const tempToken = githubToken.value.trim();
        const tempOwner = githubOwner.value.trim();
        const tempRepo = githubRepo.value.trim();

        if (!tempToken || !tempOwner || !tempRepo) {
            throw new Error('Please fill in all GitHub fields');
        }

        // Set temporarily
        githubLogger.githubToken = tempToken;
        githubLogger.repoOwner = tempOwner;
        githubLogger.repoName = tempRepo;

        // Test connection
        const repoInfo = await githubLogger.testConnection();

        githubTestStatus.textContent = `✓ Connected to ${repoInfo.full_name}`;
        githubTestStatus.className = 'test-status success';

    } catch (error) {
        githubTestStatus.textContent = `✗ ${error.message}`;
        githubTestStatus.className = 'test-status error';
    }
});

// Update save settings to include GitHub
const originalSaveHandler = saveSettingsBtn.onclick;
saveSettingsBtn.onclick = null; // Remove original handler

saveSettingsBtn.addEventListener('click', () => {
    // Save AI settings
    aiIntegration.setEnabled(aiToggle.checked);
    aiIntegration.setProvider(aiProvider.value);
    aiIntegration.setApiKey(apiKeyInput.value.trim());

    // Save GitHub settings
    githubLogger.setEnabled(githubToggle.checked);
    githubLogger.setToken(githubToken.value.trim());
    githubLogger.setRepository(githubOwner.value.trim(), githubRepo.value.trim());

    updateStatus();
    updateGitHubStatus();

    // Show confirmation
    const originalText = saveSettingsBtn.textContent;
    saveSettingsBtn.textContent = '✓ Saved!';
    saveSettingsBtn.style.background = '#10b981';

    setTimeout(() => {
        saveSettingsBtn.textContent = originalText;
        saveSettingsBtn.style.background = '';
    }, 2000);
});

// Update clear settings to include GitHub
clearSettingsBtn.onclick = null; // Remove original handler

clearSettingsBtn.addEventListener('click', () => {
    if (confirm('Clear all AI and GitHub settings? This cannot be undone.')) {
        aiIntegration.clearSettings();
        githubLogger.clearSettings();
        loadSettings();
        loadGitHubSettings();

        // Show confirmation
        const originalText = clearSettingsBtn.textContent;
        clearSettingsBtn.textContent = '✓ Cleared!';

        setTimeout(() => {
            clearSettingsBtn.textContent = originalText;
        }, 2000);
    }
});

// Load GitHub settings when opening modal
const originalSettingsBtnHandler = settingsBtn.onclick;
settingsBtn.onclick = null;

settingsBtn.addEventListener('click', () => {
    settingsModal.classList.remove('hidden');
    loadSettings();
    loadGitHubSettings();
});

// Initialize GitHub settings on load
loadGitHubSettings();
