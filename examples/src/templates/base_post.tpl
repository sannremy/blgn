<!DOCTYPE html>
<html>
	%include modules/head.tpl%
	<body>
		<section>
			<a href="../year/%print currentPost.date.year%.html" title="%print currentPost.date.year%">
				<time datetime="%print currentPost.date.iso%">%print currentPost.date.month% %print currentPost.date.year%</time>
			</a>
			<ul>
				%foreach currentPost.tags include modules/tag_item.tpl%
			</ul>
		</section>
		<article>
			%print currentPost.source.html%
		</article>
	</body>
</html>