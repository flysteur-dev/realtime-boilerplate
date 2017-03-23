# realtime-boilerplate

Build a fast simple maintainable realtime application using (ES6, NodeJS, RethinkDB, React and Socket.io)

#1 - install rethinkdb

sudo apt-get install rethinkdb python-pip <br />
sudo pip install rethinkdb (python driver for importing table andsample data)

#2 - dependencies

npm install

#3 - run

npm run-script rundb <br />
npm run-script dev

#4 - play

Open http://localhost:3000/static

Then add an article : 

curl --data "title=title&content=content&link=it.works" http://localhost:3000/articles/add 
