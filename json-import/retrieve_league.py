from bs4 import BeautifulSoup
import requests
import json

SOCCER_SITE = 'http://www.soccer-rating.com/'
DIR_JSON = '../json'
league_maps = {
    'italyleague':'http://www.soccer-rating.com/Italy/',  }


def process_league(jsonfile,remotedir, remotedir2=None):
    ratings = retrieve_cells(remotedir)
    if (len(ratings) < 20) and remotedir2:
        ratings2 = retrieve_cells(remotedir2,20-len(ratings))
        ratings.update(ratings2)
    if (len(ratings) == 20):
        with open('../json/'+jsonfile+'.json','w') as handle:
            print(json.dumps(ratings),file=handle)


def retrieve_cells(remotedir,maxq=20):
    r = requests.get(SOCCER_SITE + remotedir + '/')
    soup = BeautifulSoup(r.content, "html5lib")
    table = soup.find("table", {"class": "bigtable rattab"})
    ratings = {}

    for row in table.findAll("tr"):
        cells = row.findAll("td")
        if (len(cells) > 0) and maxq > 0:
            ratings[cells[1].string] = float(cells[4].string)
            maxq -= 1
    return ratings

def process_league_uefa(jsonfile,remotedir,start, end):
    ratings = retrieve_cells_uefa(remotedir,start,end)
    if (len(ratings) == 20):
        with open('../json/'+jsonfile+'.json','w') as handle:
            print(json.dumps(ratings),file=handle)


def retrieve_cells_uefa(remotedir,start, end):
    r = requests.get(SOCCER_SITE + remotedir + '/')
    soup = BeautifulSoup(r.content,"html5lib")
    table = soup.find("table", {"class": "bigtable"})
    ratings = {}
    counter = 0

    for row in table.findAll("tr"):
        cells = row.findAll("td")

        if (len(cells) > 0) and start <= counter <= end:
            ratings[cells[1].string] = float(cells[4].string)
        counter += 1
    return ratings

def process_countries(jsonfile,country_site,start, end):
    ratings = retrieve_cells_countries(country_site,start,end)
    if (len(ratings) == 20):
        with open('../json/'+jsonfile+'.json','w') as handle:
            print(json.dumps(ratings),file=handle)


def retrieve_cells_countries(country_site,start, end):
    r = requests.get(country_site)
    soup = BeautifulSoup(r.content,"html5lib")
    tables = soup.findAll("table")
    ratings = {}
    counter = 0
    for table in tables:
        for row in table.findAll("tr"):
            cells = row.findAll("td")

            if (len(cells) >= 7) and start <= counter <= end:
                ratings[cells[2].string] = float(cells[3].string)
            counter += 1
        return ratings
    return ratings

process_league('italyleague','Italy')
process_league('franceleague','France')
process_league('spainleague','Spain')
process_league('germanyleague','Germany','Germany/DE2')
process_league('englandleague','England')
process_league_uefa('uefa1league','football-club-ranking',1,20)
process_league_uefa('uefa2league','football-club-ranking',21,40)

#process_countries('worldleague','http://www.eloratings.net/',1,20)
#process_countries('europeleague','http://www.eloratings.net/europe.html',1,20)

