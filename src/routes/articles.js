import express from 'express';

var r      = require('rethinkdbdash')();
var router = express.Router();

//MIDDLEWARE
router.use((req, res, next) => {
	//BEFORE
	next();
});

//LIST
router.get('/', (req, res) => {

	//RETURN ALL ARTICLES
	r.table('articles').orderBy(r.desc('date')).run()
		.error(()         => res.status(500).send())
		.then ((articles) => res.status(200).json(articles));

	//STREAM NEW CONTENTS
	r.table('articles').changes()
		.error(() => res.status(500).send())
		.then ((results) => {

			//For new/updated articles
			results.each((err, row) => {
				if (err) console.error(err);
				
				//Notify webpage
				io.emit('article', row.new_val);
			});
		});
});

//ADD ARTICLE
router.post('/add', (req, res) => {

	let article = {
		title:   req.body.title,
		content: req.body.content,
		link:    req.body.link
	};

	r.table('articles').insert(article).run()
		.error(()  => res.status(500).send())
		.then((db) => res.status(200).json(db.generated_keys));
});

export default router;