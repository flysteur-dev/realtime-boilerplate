import express from 'express';

let r         = require('rethinkdbdash')();
let router    = express.Router();
let is_stream = false;

//MIDDLEWARE
router.use((req, res, next) => {

	//RUN STREAM ONLY ONCE
	if (!is_stream) {

		//STREAM NEW CONTENTS
		//RETHINKDB WILL NOTIFY US ON DB UPDATES
		is_stream = true;
		r.table('articles').changes()
			.then ((results) => {

				//FOR EARCH NEW/UPDATES ARTICLES
				results.each((err, row) => {
					if (err) console.error(err);

					//NOTIFY WEBPAGE THROUGH WEBSOCKETS
					io.emit('article', row.new_val);
				});
			});
	}
	next();
});

//LIST
router.get('/', (req, res) => {

	//RETURN ALL ARTICLES ORDERED
	r.table('articles').orderBy(r.desc('date')).run()
		.error(()         => res.status(500).send())
		.then ((articles) => res.status(200).json(articles));
});

//ADD ARTICLE
router.post('/add', (req, res) => {

	let article = {
		title:   req.body.title,
		content: req.body.content,
		link:    req.body.link,
		date:    + new Date()
	};

	//ADD NEW ARTICLE WILL TRIGGER DB CHANGES EVENTS
	r.table('articles').insert(article).run()
		.error(()  => res.status(500).send())
		.then((db) => res.status(200).json(db.generated_keys));
});

export default router;