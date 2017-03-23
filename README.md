# realtime-boilerplate

Build a fast simple maintainable realtime application using (NodeJS, ES6, RethinkDB)

#1 - install rethinkdb
sudo apt-get install rethinkdb

#2 - dependencies
npm install

#3 - run
npm run-script dev

#4 - play
Look at http://localhost:3000
Then add an article : curl --data "title=title&content=content&link=it.works" http://localhost:3000/articles/add 