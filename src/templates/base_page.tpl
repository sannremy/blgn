<!DOCTYPE html>
<html>
	%include modules/head.tpl%
	<body>
		<div id="global">
			%include modules/header.tpl%
			<div class="content">
				<div class="content-middle">
					<article id="article">
						%print currentPage.source.html%
					</article>
				</div>
			</div>
			%include modules/footer.tpl%
		</div>

		<!-- script -->
		%include modules/script.tpl%
	</body>
</html>