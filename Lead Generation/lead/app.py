import requests
from bs4 import BeautifulSoup
import re
import pandas as pd
import streamlit as st

# Your ScraperAPI key
api_key = 'f4cd663744c6f7fe0dc07d891bc15497'  # Replace with your API key

# Function to fetch the data through ScraperAPI
def fetch_data_with_scraperapi(search_query):
    target_url = f'https://www.google.com/search?q={search_query.replace(" ", "+")}'
    payload = { 
        'api_key': api_key,
        'url': target_url
    }

    response = requests.get('https://api.scraperapi.com/', params=payload)
    
    if response.status_code == 200:
        return response.text  # Return the HTML content of the page
    else:
        st.error(f"Failed to fetch the page. Status code: {response.status_code}")
        return None

# Function to extract phone numbers using regular expressions
def extract_phone_number(text):
    phone_pattern = re.compile(r'(\+?\d{1,4}?[\s-]?\(?\d{1,4}?\)?[\s-]?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9})')
    phone_numbers = phone_pattern.findall(text)
    return phone_numbers[0] if phone_numbers else "Phone number not found"

# Function to scrape the business website for phone numbers
def scrape_website_for_phone(url):
    try:
        website_response = requests.get(url)
        if website_response.status_code == 200:
            website_soup = BeautifulSoup(website_response.text, 'html.parser')
            # Extract phone number from the website content
            phone_number = extract_phone_number(website_soup.text)
            return phone_number
        else:
            return "Phone number not found"
    except Exception as e:
        st.error(f"Error scraping {url}: {e}")
        return "Phone number not found"

# Function to parse the HTML and extract business leads with phone numbers
def parse_html(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    leads = []

    # Extracting relevant business information from the search results
    for result in soup.find_all(class_='tF2Cxc'):
        title = result.find('h3').text if result.find('h3') else None
        link = result.find('a')['href'] if result.find('a') else None
        description = result.find(class_='VwiC3b').text if result.find(class_='VwiC3b') else None

        # Scrape the phone number from the business website
        phone_number = scrape_website_for_phone(link) if link else "Phone number not found"

        if title and link:
            leads.append({
                'Business Name': title,
                'Link': link,
                'Description': description,
                'Phone Number': phone_number  # Add phone number here
            })

    return leads

# Streamlit App
def main():
    st.title("Lead Search and Analysis App")
    
    # Input for search query
    search_query = st.text_input("Enter the search query", "")
    
    # Button to trigger search
    if st.button("Search"):
        if search_query:
            st.write(f"Searching for '{search_query}'...")
            html_content = fetch_data_with_scraperapi(search_query)
            
            if html_content:
                leads = parse_html(html_content)
                
                if leads:
                    st.write(f"Found {len(leads)} leads.")
                    leads_df = pd.DataFrame(leads)
                    st.dataframe(leads_df)  # Display the leads as a table
                else:
                    st.write("No leads found.")
            else:
                st.write("Failed to retrieve content from the target URL.")
        else:
            st.write("Please enter a search query.")
    
if __name__ == "__main__":
    main()

