import sys
import zipfile
import json
import os

if len(sys.argv) < 3:
    print("Usage: python3 create-zip.py <zip_path> <html_path>")
    sys.exit(1)

zip_path = sys.argv[1]
html_path = sys.argv[2]

with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as z:
    z.write(html_path, arcname="index.html")
    manifest = {
        "name": "Parijat Flower House & Nursery",
        "version": "1.0.0",
        "category": "flower shop / nursery",
        "location": "Sankhamul Marg, Ward 10, Kathmandu",
        "founder": "Basant Pokhrel",
        "agency": "Sunya",
        "whatsapp": "9867333080",
        "pricing": {
            "setup_npr": 9999,
            "hosting_monthly_npr": 1500
        }
    }
    z.writestr("manifest.json", json.dumps(manifest, indent=2))
    guide = """SUNYA — CLIENT PRODUCTION DEPLOYMENT GUIDE
=============================================================
Business: Parijat Flower House & Nursery
Location: Sankhamul Marg, Ward 10, Kathmandu
Founder Direct Line: +977-9867333080

1. To view your website offline:
   Double-click index.html in any browser.

2. To connect your custom domain:
   WhatsApp Basant at 9867333080 with your desired domain name
   (e.g., parijatflowers.com.np).
   We configure high-speed hosting and SSL certificate within 24 hours.

3. Payment Details:
   FonePay / eSewa / Khalti: 9867333080
============================================================="""
    z.writestr("DEPLOYMENT_GUIDE.txt", guide)

print(f"ZIP package created successfully at: {zip_path}")
