import React from 'react';

const Article = ({article}) => {

	let picture = `http://lorempixel.com/64/64/`;

	return (
		<li className="media">
			<div className="media-left"> 
				<a href={article.link}> 
					<img alt="64x64" className="media-object" data-src="holder.js/64x64" src={picture} data-holder-rendered="true" />
				</a> 
			</div> 
			<div className="media-body"> 
				<h4 className="media-heading">{article.title}</h4> 
				<p>{article.content}</p> 
			</div>
		</li>
	)
};

export default Article;