(function(global) {
	
	'use strict';
	
	// global
	global.q = function(element) {
		var elements = document.querySelectorAll(element);
		if(elements.length === 0) {
			return null;
		} else if(elements.length === 1) {
			return elements[0];
		} else {
			return elements;
		}
	};
	
	var SrcJs = function() {

		this.currentCols = null;
		this.referenceCols = 3;
		this.itemOverviews = q('.item-overview');
		this.itemsColumns = q('.items-column');
		this.itemList = [];

		this.init = function() {

			var self = this;
			if(this.itemOverviews !== null) {
				this.itemList = this._getInitialItemList();

				var mql = [
					global.matchMedia("(max-width: 499px)"),
					global.matchMedia("(max-width: 768px) and (min-width: 500px)"),
					global.matchMedia("(min-width: 769px)")
				];

				for(var i = 0; i < mql.length; i++) {
					(function(i) {
						mql[i].addListener(function(mql) {
							self.handleChange(mql, i + 1);
						});
						self.handleChange(mql[i], i + 1);
					})(i);
				}
			}
		};

		this._getInitialItemList = function() {
			var i = 0, itemIndex = this.itemOverviews.length - 1, rowDone = 1, itemList = [];
			var itemsPerCol = Math.max(1, Math.floor(this.itemOverviews.length / this.referenceCols));

			for(i; i < this.itemOverviews.length; i++) {
				if(i > 0 && i % this.referenceCols === 0) {
					itemIndex = this.itemOverviews.length - 1 - rowDone++;
				}
				itemList[i] = this.itemOverviews[itemIndex];
				itemIndex -= itemsPerCol;
			}

			return itemList;
		};

		this.handleChange = function(mql, cols) {
			if(mql.matches) {
				this._sortItems(cols);
			}
		};

		this._sortItems = function(currentCols) {
			this.currentCols = currentCols;
			var i = 0;
			if(this.itemOverviews.length > this.currentCols && this.referenceCols > this.currentCols) {
				for(i = this.itemList.length - 1 - this.currentCols; i >= 0; i--) {
					this.itemList[i + this.currentCols].parentNode.insertBefore(
						this.itemList[i].parentNode.removeChild(this.itemList[i]),
						this.itemList[i + this.currentCols].nextSibling
					);
				}
			} else if(this.referenceCols < this.currentCols) {
				var colIndex = this.referenceCols;
				for(i = this.itemList.length - 1 - this.referenceCols; i >= 0; i--) {
					this.itemsColumns[colIndex].appendChild(this.itemList[i].parentNode.removeChild(this.itemList[i]));
					colIndex = colIndex === this.currentCols - 1 ? 0 : colIndex + 1;
				}
			}
			this.referenceCols = this.currentCols;
		}

		this.share = function(social) {
			var url = encodeURIComponent(location.href),
				title = encodeURIComponent(document.title),
				company = "srchea.com",
				width = 550,
				height = 550;

			switch(social) {
				case 'twitter' :
					var popupUrl = 'https://twitter.com/home?status=' + title + ' ' + url;
				break;
				case 'googleplus' :
					var popupUrl = 'https://plus.google.com/share?url=' + url;
				break;
				case 'delicious' :
					var popupUrl = 'https://delicious.com/save?v=5&provider=' + company + '&noui&jump=close&url=' + url + '&title=' + title;
				break;
				case 'linkedin' :
					var popupUrl = 'https://www.linkedin.com/shareArticle?mini=true&url=' + url + '&title=' + title;
				break;
				case 'stumbleupon' :
					var popupUrl = 'http://www.stumbleupon.com/submit?url=' + url + '&title=' + title;
				break;
				case 'digg' :
					var popupUrl = 'http://digg.com/submit?phase=2&url=' + url + '&title=' + title + '&bodytext=&topic=programming';
				break;
				case 'reddit' :
					var popupUrl = 'http://www.reddit.com/submit?title=' + title + '&url=' + url;
				break;
				case 'pinterest' :
					var popupUrl = 'http://pinterest.com/pin/create/button/?url=' + url + '&media=&description=';
				break;
				default :
					var popupUrl = null;
				break;
			}

			if(popupUrl) {
				window.open(popupUrl, social,'toolbar=no,width=' + width + ',height=' + height);
			}

			return false;
		};
		
		this.utils = {
			unitSanitizer: function(value) {
				value = value.replace(/(px|pt|pc|em|ex|in|cm|mm|%)/gi, '');
				return value.indexOf('.') !== -1 ? parseFloat(value, 10) : parseInt(value, 10);
			}
		};
	};
	
	global.srcjs = new SrcJs();
	global.srcjs.init();
	
})(window);