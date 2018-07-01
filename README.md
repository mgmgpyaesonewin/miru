# **Project Description**
Miru is a parent's monitoring application which goes or lives in a variety of places (websites and app) that all communicate together seamlessly. After creating an account, Miru enables you to connect and monitor your childrens' social accounts, but the children under 16-year-old.

**Text Sentiment Analysis**
<br/>
We use sentiment analysis to detect hate speech and offensive language in text. And we know very well that simple keyword analysis is not sufficient to detect the majority of issues so that we use machine learning and have a plan to use statistical analysis techniques.

DETECTED TEXT TYPES
	Hate Speech
	Offensive Language
	Neither

**Nudity Detection**

The Nudity Detection Model determines if an image contains some level of nudity along with a description of the “level” of nudity. 

- Raw nudity (X-rated material such as genitals, bare breasts...)

- Partial nudity due to the presence of bare-chested males
No nudity (safe content)

**Weapons Alcohol Drugs Detection**

The Weapons Alcohol Drugs detection model helps you determine if an image or video contains displays of weapons, alcoholic beverages or medical drugs.

DETECTED ELEMENTS

- Weapons 
  - Rifles
	Handguns, Revolvers, Pistols
	Portable machine guns
	Tools that are potential weapons or convey violence: some types of daggers, scabbards, chainsaws, cleavers, hatchets, axes

- Alcohol
  - Wine, both in glasses and in bottles
	Beer, both in glasses and in bottles
	Cocktails, including cocktail shakers

- Drug
  - drugs, pills, pill bottles, syringes.

# Setup Guide
	

#Open Chrome open -a Google\ Chrome --args --disable-web-security --user-data-dir

#Start text sentiment engine python3 setup.py -- ADDR - PORT -> http://127.0.0.1:8083/?imsi=yesno.wtf

#Start node proxy server node index.js -d -p 8000 -- ADDR - PORT -> proxy server -> 8000

#Start mongo brew services start mongodb

#Start Client npm run serve -> http://localhost:8082

#Start Client API node server.js | ./node_modules/.bin/nodemon server.js -- Addr -> port -> http://localhost:3000/

