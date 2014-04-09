<!DOCTYPE html>
<html>
	%include modules/head.tpl%
	<body>
		<div id="global">
			%include modules/header.tpl%
			<div class="content">
				<div class="content-middle">
					<article id="article">
						<div class="items-column">
							%foreach postsOverview1 include modules/post_overview.tpl%
						</div>

						<div class="items-column">
							%foreach postsOverview2 include modules/post_overview.tpl%
						</div>

						<div class="items-column">
							%foreach postsOverview3 include modules/post_overview.tpl%
						</div>
					</article>
				</div>
			</div>
			%include modules/footer.tpl%
		</div>

		<!-- script -->
		%include modules/script.tpl%
	</body>
</html>