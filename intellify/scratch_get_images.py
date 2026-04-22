import urllib.request
import re
import json

url = "https://www.intellify.marwadiuniversity.ac.in/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    # Wix images often look like https://static.wixstatic.com/media/...
    urls = re.findall(r'https://static\.wixstatic\.com/media/[a-zA-Z0-9_\-]+\.(?:jpg|png|jpeg|webp)', html)
    print(json.dumps(list(set(urls)), indent=2))
except Exception as e:
    print("Error:", e)
