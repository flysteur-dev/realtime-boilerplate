import React   from 'react';
import Article from './article_item';

const List = (props) => {
	const articles = props.articles.map((article) => {
		return <Article key={article.id} article={article} />
	});

	return (
		<ul className="media-list">
			{articles}
		</ul>
	);
};

export default List;