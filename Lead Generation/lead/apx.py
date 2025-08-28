from flask import Flask, render_template, request, jsonify
import requests
from bs4 import BeautifulSoup
import re
from flask_cors import CORS  

app = Flask(__name__)
CORS(app)  

# ScraperAPI key
API_KEY = '32b5adfb4fc42823b87cc00561f750df'  

   
def fetch_data_with_scraperapi(search_query):
    target_url = f'https://www.google.com/search?q={search_query.replace(" ", "+")}'
    payload = { 
        'api_key': API_KEY,
        'url': target_url
    }
    response = requests.get('https://api.scraperapi.com/', params=payload)
    
    if response.status_code == 200:
        return response.text  
    return None

# Function to extract phone numbers using regex
def extract_phone_number(text):
    phone_pattern = re.compile(r'(\+?\d{1,4}?[\s-]?\(?\d{1,4}?\)?[\s-]?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9})')
    phone_numbers = phone_pattern.findall(text)
    return phone_numbers[0] if phone_numbers else "Phone number not found"

# Function to scrape business website for phone number
def scrape_website_for_phone(url):
    try:
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            return extract_phone_number(soup.text)
    except Exception:
        return "Phone number not found"
    return "Phone number not found"

# Function to parse HTML and extract business leads
def parse_html(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    leads = []

    for result in soup.find_all(class_='tF2Cxc'):
        title = result.find('h3').text if result.find('h3') else None
        link = result.find('a')['href'] if result.find('a') else None
        description = result.find(class_='VwiC3b').text if result.find(class_='VwiC3b') else None

        phone_number = scrape_website_for_phone(link) if link else "Phone number not found"

        if title and link:
            leads.append({
                'Business Name': title,
                'Link': link,
                'Description': description,
                'Phone Number': phone_number
            })
    return leads

# API endpoint to return JSON data
@app.route("/api/scraped-data", methods=["GET"])
def get_scraped_data():
    search_query = request.args.get("query", "hotels")  # Default query if none provided
    html_content = fetch_data_with_scraperapi(search_query)
    if html_content:
        leads = parse_html(html_content)
        return jsonify(leads)  # Return scraped data as JSON
    return jsonify({"error": "Failed to retrieve content"}), 500

# HTML page rendering
@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        search_query = request.form.get("search_query")
        if search_query:
            html_content = fetch_data_with_scraperapi(search_query)
            if html_content:
                leads = parse_html(html_content)
                return render_template("results.html", leads=leads, query=search_query)
        return render_template("index.html", error="Failed to retrieve content. Try again.")
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
