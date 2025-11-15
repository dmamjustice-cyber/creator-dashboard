CreatorDashboard_full_v2 - OpenAI + Platform Connectors (scaffold)
================================================================

This package contains a demo frontend and a FastAPI backend scaffold that:
- Calls OpenAI ChatCompletion (set OPENAI_API_KEY in env)
- Provides OAuth connect routes scaffolds for YouTube, TikTok, Instagram
- Provides simple redirects for Stripe and PayPal connect (scaffolding)
- Includes a mock backend to answer AI questions and sample API endpoints

Files:
- index.html (frontend)
- styles.css
- app.js
- backend.py (FastAPI app)
- requirements.txt
- README.md
- .env.example

Quick start (frontend only):
1. Unzip and open index.html in your browser.
2. The UI is interactive; AI features will attempt to call the backend at http://localhost:8000.

Run backend locally:
1. Install Python 3.9+
2. (optional) python3 -m venv venv && source venv/bin/activate
3. pip install -r requirements.txt
4. Create a `.env` file based on `.env.example` and set your keys (OPENAI_API_KEY, YOUTUBE_CLIENT_ID, etc.)
5. Run: uvicorn backend:app --reload --port 8000
6. Open index.html and test AI / Connect buttons.

Notes:
- You must create OAuth credentials on Google Cloud (YouTube) and TikTok/Instagram developer portals, then set CLIENT_ID/CLIENT_SECRET env vars.
- The OAuth callbacks in this scaffold just return the code — in production you must exchange the code for tokens server-side.
- Stripe Connect & PayPal flows are sketched as redirects — you'll need to implement full OAuth or Connect flows per their docs.
