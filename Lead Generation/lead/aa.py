import requests

api_key = 'f4cd663744c6f7fe0dc07d891bc15497'
search_url = 'https://www.google.com/search?q=plumbers+in+New+York'

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

params = {
    'api_key': api_key,
    'url': search_url
}

response = requests.get('https://api.scraperapi.com/', params=params, headers=headers)

if response.status_code == 200:
    print(response.text)  # You should see the Google search HTML results
else:
    print(f"Error: {response.status_code}")
