<!DOCTYPE html>
<html>
	%include modules/head.tpl%
	<body>
		<div id="global">
			%include modules/header.tpl%
			<div class="content">
				<div class="content-middle">
					<section class="post-info">
						<div class="info-date">
							<a href="/year/%print currentPost.date.year%" class="date-month-year" title="View all posts posted in %print currentPost.date.year%"><time datetime="%print currentPost.date.iso%">%print currentPost.date.month% %print currentPost.date.year%</time></a>
						</div>
						<nav class="info-tags">
							<ul>
								%foreach currentPost.tags include modules/tag_item.tpl%
							</ul>
						</nav>
					</section>
					<article id="article">
						%print currentPost.source.html%
						%include modules/sharer.tpl%
					</article>
					%include modules/disqus/comments.tpl%
				</div>
			</div>
			%include modules/footer.tpl%
		</div>

		<!-- script -->
		%include modules/script.tpl%
		%include modules/disqus/script.tpl%
	</body>
</html>