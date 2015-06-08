<div>
	<h2>
		<a href="%print url%.html" title="%print title%">%print title%</a>
	</h2>
	<a href="year/%print date.year%.html" title="View all posts posted in %print date.year%">
		<time datetime="%print date.iso%">%print date.month% %print date.year%</time>
	</a>
	<p>
		%print overview%
		<a href="%print url%.html" title="Read more">...</a>
	</p>
	<ul>
		%foreach tags include modules/tag_item.tpl%
	</ul>
</div>