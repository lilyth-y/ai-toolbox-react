# 🌍 How to Deploy AI Toolbox

This guide explains how to publish your AI Toolbox website to the internet for free using **GitHub Pages**.

## Prerequisites
- A GitHub Account (free).
- The project files (`.html`, `.css`, etc.) on your computer.

## Method 1: GitHub Pages (Recommended)

### Step 1: Create a Repository
1. Log in to [GitHub](https://github.com).
2. Click the **+** icon in the top right and select **New repository**.
3. Name it `ai-toolbox` (or any name you like).
4. Make sure it is **Public**.
5. Click **Create repository**.

### Step 2: Upload Files
1. In your new repository page, click **uploading an existing file**.
2. Drag and drop all your project files (`ai_resources.html`, `onboarding.html`, and any folders) into the box.
3. **Important**: Rename `ai_resources.html` to `index.html` if you want it to be the main home page. 
   - *If you keep it as is, your URL will look like `username.github.io/ai-toolbox/ai_resources.html`.*
4. Add a commit message (e.g., "Initial commit") and click **Commit changes**.

### Step 3: Enable GitHub Pages
1. Go to the **Settings** tab of your repository.
2. Scroll down (or click on the left sidebar) to find **Pages**.
3. Under **Build and deployment** > **Branch**, select `main` (or `master`) and click **Save**.
4. Wait about 1-2 minutes. Refresh the page.
5. You will see a message: **"Your site is live at..."** with a link! 🎉

## Method 2: Netlify (Alternative)
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop your project folder onto the page.
3. It will deploy instantly and give you a random URL.

## 🔑 Note on API Keys
Since this is a client-side application (HTML/JS), **do not commit your API Key directly to the code**.
- The "Bring Your Own Key" (BYOK) feature in this app is designed for security.
- Users (including you) will enter their key in the browser, and it saves to their local storage. It is **not** exposed on the public server.
