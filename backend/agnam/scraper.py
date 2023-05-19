import requests
from bs4 import BeautifulSoup
import urllib3
from urllib.request import urlretrieve
from selenium.webdriver.chrome.options import Options
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By


# Method for requesting comics title and poster from given URL
def scrape_data(url, x):

    # Go to website and scrape all contents
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')

    # Get all info inside the summary_image div
    info = soup.find("div", {"class": "summary_image"})
    data = soup.find_all()
    
    # Get the cover image url of the comic 
    img = info.find("img")
    img_url = img.get("data-src")
    title = img.get("alt")
    title_new = title.replace(" ", "-")

    # Save the cover image
    path_to_save = 'media/images/' + title_new + '.png'
    response = requests.get(img_url)
    open(path_to_save, "wb").write(response.content)

    if x == 'title':
        return title
    elif x == 'poster':
        return path_to_save

    #print(soup.find()prettify())
    # data = soup.find
    # if type == 'title':
    #     print(data.post-title)
    # elif type == 'poster':
    #     print(data.summary-image.src)

def scrape_data_reccomendations():
    
    # Go to website and scrape all contents
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')

    # Get all info inside the summary_image div
    info = soup.find("div", {"class": "summary_image"})
    data = soup.find_all()
    
    # Get the cover image url of the comic 
    img = info.find("img")
    img_url = img.get("data-src")
    title = img.get("alt")
    title_new = title.replace(" ", "-")
    
    return data
