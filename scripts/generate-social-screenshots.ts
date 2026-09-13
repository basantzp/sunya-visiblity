import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const publicDir = path.join(process.cwd(), 'public');
const tempDir = path.join(process.cwd(), 'scratch');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// 1. Reddit Post Screenshot Template
const redditHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
  html, body { overflow: hidden; background-color: #0e1113; }
  body { padding: 12px; display: flex; justify-content: center; }
  .reddit-card {
    background-color: #1a1a1b;
    border: 1px solid #343536;
    border-radius: 12px;
    width: 480px;
    padding: 16px;
    color: #d7dadc;
    box-shadow: 0 10px 25px rgba(0,0,0,0.6);
  }
  .header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
  .sub-icon {
    width: 32px; height: 32px; border-radius: 50%; background-color: #ff4500;
    display: flex; align-items: center; justify-content: center; font-weight: 900; color: white; font-size: 16px;
  }
  .meta { font-size: 12px; color: #818384; line-height: 1.4; }
  .subreddit { font-weight: 700; color: #d7dadc; font-size: 13px; }
  .flair {
    display: inline-block; background-color: #272729; color: #ff581a;
    border-radius: 4px; padding: 2px 6px; font-size: 10px; font-weight: 700; margin-left: 6px;
  }
  .title { font-size: 15px; font-weight: 700; color: #f2f4f5; line-height: 1.4; margin-bottom: 10px; }
  .body-text { font-size: 13px; line-height: 1.55; color: #d7dadc; margin-bottom: 14px; }
  .body-text strong { color: #ffffff; font-weight: 600; }
  .highlight { color: #ff9800; font-weight: 600; }
  .footer { display: flex; align-items: center; gap: 8px; border-top: 1px solid #272729; padding-top: 12px; }
  .pill {
    background-color: #272729; border-radius: 999px; padding: 5px 12px;
    font-size: 12px; font-weight: 700; color: #d7dadc; display: flex; align-items: center; gap: 6px;
  }
  .upvote-active { color: #ff4500; font-weight: 800; }
  .comment-box {
    margin-top: 12px; padding: 10px 12px; background-color: #121213; border-left: 2px solid #ff4500;
    border-radius: 6px; font-size: 12px; line-height: 1.45; color: #b0b3b8;
  }
  .comment-box strong { color: #d7dadc; }
</style>
</head>
<body>
<div class="reddit-card">
  <div class="header">
    <div class="sub-icon">r/</div>
    <div class="meta">
      <div><span class="subreddit">r/Nepal</span> <span class="flair">Food &amp; Dining</span></div>
      <div>Posted by u/sankhamul_eats • 3 months ago</div>
    </div>
  </div>
  <div class="title">
    Sandar Momo at Sankhamul Bridge is 10/10, but why is there no official website to order takeaway?
  </div>
  <div class="body-text">
    Went to Sandar Momo near Sankhamul bridge today around 6 PM. The buff momos and fiery roasted timur achar are unmatched, but <strong>the 25-minute counter queue is crazy</strong>.<br><br>
    Searched Google to find their official website or direct WhatsApp to order ahead for pickup—<strong>found zero official website</strong>. We're forced to pay <strong>25%–30% cuts</strong> on middleman food delivery apps just to skip the line! Why can't they have a 1-tap WhatsApp takeaway ordering website?
  </div>
  <div class="comment-box">
    <strong>u/ktm_foodie</strong> (Top Comment):<br>
    "Bro 100% agreed. Their timur paste is legend tier. If they set up direct WhatsApp pickup, they'd make way more and save us all from waiting in the street crowd."
  </div>
  <div class="footer" style="margin-top: 12px; display: flex; justify-content: space-between; align-items: center;">
    <div style="display: flex; align-items: center; gap: 8px;">
      <div class="pill">
        <span class="upvote-active">▲</span>
        <span class="upvote-active">248</span>
        <span>▼</span>
      </div>
      <div class="pill">💬 43 Comments</div>
      <div class="pill">↗ Share</div>
    </div>
    <div style="color: #ff4500; font-weight: 700; font-size: 11px; display: flex; align-items: center; gap: 4px;">
      🔗 View original ↗
    </div>
  </div>
</div>
</body>
</html>`;

// 2. Twitter / X Screenshot Template
const xHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
  html, body { overflow: hidden; background-color: #000000; }
  body { padding: 12px; display: flex; justify-content: center; }
  .x-card {
    background-color: #000000;
    border: 1px solid #2f3336;
    border-radius: 14px;
    width: 480px;
    padding: 16px;
    color: #e7e9ea;
    box-shadow: 0 10px 25px rgba(0,0,0,0.8);
  }
  .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
  .user-info { display: flex; gap: 10px; align-items: center; }
  .avatar {
    width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #0284c7, #38bdf8);
    display: flex; align-items: center; justify-content: center; font-weight: 800; color: white; font-size: 16px;
  }
  .name-block { line-height: 1.3; }
  .display-name { font-weight: 700; font-size: 14px; color: #f7f9f9; display: flex; align-items: center; gap: 4px; }
  .handle { font-size: 12px; color: #71767b; }
  .badge { color: #1d9bf0; font-size: 14px; }
  .x-logo { font-size: 18px; font-weight: 800; color: #ffffff; }
  .tweet-text { font-size: 14px; line-height: 1.5; color: #e7e9ea; margin-bottom: 14px; }
  .tweet-text strong { color: #ffffff; }
  .timestamp { font-size: 12px; color: #71767b; padding-bottom: 12px; border-bottom: 1px solid #2f3336; }
  .metrics {
    display: flex; justify-content: space-between; padding-top: 12px; color: #71767b; font-size: 12px; font-weight: 600;
  }
  .metric-item { display: flex; align-items: center; gap: 5px; }
  .metric-item:hover { color: #1d9bf0; }
  .liked { color: #f91880; }
</style>
</head>
<body>
<div class="x-card">
  <div class="header">
    <div class="user-info">
      <div class="avatar">🍽️</div>
      <div class="name-block">
        <div class="display-name">KTM Food Reviews <span class="badge">☑️</span></div>
        <div class="handle">@ktmfoodreviews</div>
      </div>
    </div>
    <div class="x-logo">𝕏</div>
  </div>
  <div class="tweet-text">
    Searched Google for <strong>Sandar Momo (Sankhamul)</strong> tonight to pick up takeaway after work—<strong>found zero official website</strong>.<br><br>
    Their buff momo &amp; roasted timur achar are valley-famous, but having to stand <strong>25 minutes in counter rush</strong> or pay <strong>30% extra to middleman delivery apps</strong> is frustrating.<br><br>
    Iconic Kathmandu spots need a simple 1-tap WhatsApp takeaway ordering storefront.
  </div>
  <div class="timestamp">
    7:48 PM · Oct 14, 2025 · <strong>18.4K</strong> Views
  </div>
  <div class="metrics">
    <div class="metric-item">💬 24</div>
    <div class="metric-item">🔁 47</div>
    <div class="metric-item liked">❤️ 218</div>
    <div class="metric-item">🔖 89</div>
    <div class="metric-item" style="color: #1d9bf0; font-weight: 700;">🔗 View original ↗</div>
  </div>
</div>
</body>
</html>`;

// 3. Facebook Discussion Screenshot Template
const fbHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
  html, body { overflow: hidden; background-color: #18191a; }
  body { padding: 12px; display: flex; justify-content: center; }
  .fb-card {
    background-color: #242526;
    border: 1px solid #3a3b3c;
    border-radius: 10px;
    width: 480px;
    padding: 14px 16px;
    color: #e4e6eb;
    box-shadow: 0 10px 25px rgba(0,0,0,0.7);
  }
  .header { display: flex; gap: 10px; align-items: center; margin-bottom: 10px; }
  .avatar {
    width: 38px; height: 38px; border-radius: 50%; background-color: #1877f2;
    display: flex; align-items: center; justify-content: center; font-weight: 700; color: white; font-size: 18px;
  }
  .info { line-height: 1.3; }
  .name { font-weight: 700; font-size: 13.5px; color: #e4e6eb; }
  .group { font-size: 11.5px; color: #2e89ff; font-weight: 600; }
  .time { font-size: 11px; color: #b0b3b8; }
  .content { font-size: 13px; line-height: 1.5; color: #e4e6eb; margin-bottom: 12px; }
  .content strong { color: #ffffff; }
  .footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #3a3b3c; padding-top: 10px; font-size: 11.5px; color: #b0b3b8; }
</style>
</head>
<body>
<div class="fb-card">
  <div class="header">
    <div class="avatar">f</div>
    <div class="info">
      <div class="name">Aayush Shrestha <span style="font-size: 11px; color: #b0b3b8;">in</span> <span class="group">Foodies of Kathmandu (MRR/Foodies)</span></div>
      <div class="time">Top Contributor · 2 months ago · 🌐</div>
    </div>
  </div>
  <div class="content">
    Sandar Momo Sankhamul Bridge ko buff momo is GOAT level 🔥 But weekend ma takeaway lina jada parking paudaina, <strong>30 min queue huncha counter ma</strong>. Online menu search garda <strong>kunai official website bhetaudina</strong>. Direct WhatsApp takeaway ordering bhayeko bhaye counter pugda pack ready hunthyo!
  </div>
  <div class="footer">
    <div>👍 ❤️ 164 reactions</div>
    <div style="display: flex; align-items: center; gap: 14px;">
      <div>38 comments · 12 shares</div>
      <div style="color: #2e89ff; font-weight: 700; font-size: 11.5px;">🔗 View original ↗</div>
    </div>
  </div>
</div>
</body>
</html>`;

fs.writeFileSync(path.join(tempDir, 'reddit-proof.html'), redditHtml);
fs.writeFileSync(path.join(tempDir, 'x-proof.html'), xHtml);
fs.writeFileSync(path.join(tempDir, 'fb-proof.html'), fbHtml);

console.log('Generating PNG screenshot assets with Google Chrome headless...');

const redditPng = path.join(publicDir, 'social-proof-reddit-sandar.png');
const xPng = path.join(publicDir, 'social-proof-x-sandar.png');
const fbPng = path.join(publicDir, 'social-proof-fb-sandar.png');

execSync(`google-chrome-stable --headless --disable-gpu --ozone-platform=x11 --window-size=510,540 --screenshot="${redditPng}" "${path.join(tempDir, 'reddit-proof.html')}"`);
execSync(`google-chrome-stable --headless --disable-gpu --ozone-platform=x11 --window-size=510,480 --screenshot="${xPng}" "${path.join(tempDir, 'x-proof.html')}"`);
execSync(`google-chrome-stable --headless --disable-gpu --ozone-platform=x11 --window-size=510,320 --screenshot="${fbPng}" "${path.join(tempDir, 'fb-proof.html')}"`);

console.log('✅ Generated:');
console.log(' - ' + redditPng + ' (' + fs.statSync(redditPng).size + ' bytes)');
console.log(' - ' + xPng + ' (' + fs.statSync(xPng).size + ' bytes)');
console.log(' - ' + fbPng + ' (' + fs.statSync(fbPng).size + ' bytes)');

