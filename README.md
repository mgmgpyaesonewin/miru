#Open Chrome
open -a Google\ Chrome --args --disable-web-security --user-data-dir

#Start text sentiment engine
python3 setup.py
-- ADDR - PORT -> http://127.0.0.1:8083/?imsi=yesno.wtf

#Start node proxy server
node index.js -d -p 8000
-- ADDR - PORT -> proxy server -> 8000

#Start mongo
brew services start mongodb

#Start Client 
yarn run dev -> http://localhost:8082

#Start Client API
node server.js | ./node_modules/.bin/nodemon server.js
-- Addr -> port -> http://localhost:3000/



