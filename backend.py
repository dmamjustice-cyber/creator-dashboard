# backend.py - FastAPI backend with OpenAI + connector scaffolding
# Run: pip install -r requirements.txt
# then: uvicorn backend:app --reload --port 8000

import os
from fastapi import FastAPI, Request, HTTPException, Form
from fastapi.responses import JSONResponse, RedirectResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import openai
from typing import Optional
from urllib.parse import urlencode

app = FastAPI(title='Creator Dashboard Backend')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)

# Load env
OPENAI_KEY = os.getenv('OPENAI_API_KEY')
YOUTUBE_CLIENT_ID = os.getenv('YOUTUBE_CLIENT_ID')
YOUTUBE_CLIENT_SECRET = os.getenv('YOUTUBE_CLIENT_SECRET')
YOUTUBE_REDIRECT = os.getenv('YOUTUBE_REDIRECT', 'http://localhost:8000/connect/youtube/callback')
TIKTOK_CLIENT_ID = os.getenv('TIKTOK_CLIENT_ID')
TIKTOK_CLIENT_SECRET = os.getenv('TIKTOK_CLIENT_SECRET')
INSTAGRAM_CLIENT_ID = os.getenv('INSTAGRAM_CLIENT_ID')
INSTAGRAM_CLIENT_SECRET = os.getenv('INSTAGRAM_CLIENT_SECRET')
STRIPE_SECRET = os.getenv('STRIPE_SECRET')
STRIPE_PRICE_ID = os.getenv('STRIPE_PRICE_ID')
PAYPAL_CLIENT_ID = os.getenv('PAYPAL_CLIENT_ID')
PAYPAL_SECRET = os.getenv('PAYPAL_SECRET')
APP_DOMAIN = os.getenv('APP_DOMAIN', 'http://localhost:8000')

if OPENAI_KEY:
    openai.api_key = OPENAI_KEY

class AIReq(BaseModel):
    question: str

@app.post('/api/ai')
async def ai_endpoint(body: AIReq):
    question = body.question
    # If OpenAI key available, call ChatCompletion
    if OPENAI_KEY:
        try:
            resp = openai.ChatCompletion.create(
                model='gpt-4o-mini',
                messages=[
                    {'role':'system','content':'You are an assistant for creator monetization. Provide concise actionable advice.'},
                    {'role':'user','content': question}
                ],
                max_tokens=600,
                temperature=0.2,
            )
            content = resp['choices'][0]['message']['content']
            return {'answer': content}
        except Exception as e:
            return JSONResponse({'error': str(e)}, status_code=500)
    # fallback mock
    return {'answer': 'No OPENAI_API_KEY detected — mock: Increase Shorts output by 2x.'}

# --- YouTube OAuth start ---
@app.get('/connect/youtube')
def connect_youtube():
    if not YOUTUBE_CLIENT_ID:
        raise HTTPException(status_code=400, detail='YOUTUBE_CLIENT_ID not configured')
    params = {
        'client_id': YOUTUBE_CLIENT_ID,
        'redirect_uri': YOUTUBE_REDIRECT,
        'response_type': 'code',
        'scope': 'https://www.googleapis.com/auth/yt-analytics.readonly https://www.googleapis.com/auth/youtube.readonly',
        'access_type': 'offline',
        'prompt': 'consent'
    }
    url = 'https://accounts.google.com/o/oauth2/v2/auth?' + urlencode(params)
    return RedirectResponse(url)

@app.get('/connect/youtube/callback')
async def youtube_callback(code: Optional[str] = None):
    # In production exchange code for tokens server-side securely
    return {'status':'ok','message':'Received code (store exchange tokens).','code':code}

# --- TikTok OAuth start (scaffold) ---
@app.get('/connect/tiktok')
def connect_tiktok():
    if not TIKTOK_CLIENT_ID:
        raise HTTPException(status_code=400, detail='TIKTOK_CLIENT_ID not configured')
    params = {
        'client_key': TIKTOK_CLIENT_ID,
        'response_type':'code',
        'scope':'user.info.basic,video.list,video.data',
        'redirect_uri': APP_DOMAIN + '/connect/tiktok/callback'
    }
    url = 'https://open-api.tiktok.com/platform/oauth/connect?' + urlencode(params)
    return RedirectResponse(url)

@app.get('/connect/tiktok/callback')
async def tiktok_callback(code: Optional[str] = None):
    return {'status':'ok','message':'TikTok code received (scaffold).','code':code}

# --- Instagram OAuth start (scaffold) ---
@app.get('/connect/instagram')
def connect_instagram():
    if not INSTAGRAM_CLIENT_ID:
        raise HTTPException(status_code=400, detail='INSTAGRAM_CLIENT_ID not configured')
    params = {
        'client_id': INSTAGRAM_CLIENT_ID,
        'redirect_uri': APP_DOMAIN + '/connect/instagram/callback',
        'scope': 'user_profile,user_media',
        'response_type': 'code'
    }
    url = 'https://api.instagram.com/oauth/authorize?' + urlencode(params)
    return RedirectResponse(url)

@app.get('/connect/instagram/callback')
async def instagram_callback(code: Optional[str] = None):
    return {'status':'ok','message':'Instagram code received (scaffold).','code':code}

# --- Stripe Connect scaffold ---
@app.get('/connect/stripe')
def connect_stripe():
    if not STRIPE_SECRET:
        raise HTTPException(status_code=400, detail='STRIPE_SECRET not configured')
    if not STRIPE_PRICE_ID:
        # Just redirect to stripe dashboard in demo
        return RedirectResponse('https://dashboard.stripe.com')
    # In production you'd create a Login Link or OAuth connect flow
    return RedirectResponse('https://connect.stripe.com/')

# --- PayPal scaffold ---
@app.get('/connect/paypal')
def connect_paypal():
    if not PAYPAL_CLIENT_ID:
        raise HTTPException(status_code=400, detail='PAYPAL_CLIENT_ID not configured')
    # In production redirect to PayPal OAuth
    return RedirectResponse('https://www.paypal.com/signin')

@app.get('/status')
def status():
    return {'ok':True, 'openai': bool(OPENAI_KEY), 'youtube': bool(YOUTUBE_CLIENT_ID), 'tiktok': bool(TIKTOK_CLIENT_ID), 'instagram': bool(INSTAGRAM_CLIENT_ID), 'stripe': bool(STRIPE_SECRET), 'paypal': bool(PAYPAL_CLIENT_ID)}
