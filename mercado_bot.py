import requests
from bs4 import BeautifulSoup
import re


headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '3600',
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0'
    }


watchlist = [{19407: 1}]


function parse_price(price){
    print(re.findall('\d*\D+',price))
}

print(parse_price('5kk'))
