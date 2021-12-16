if (typeof jQuery !== "undefined") {
	(function($) {
		var BOT = {
			Config : {
				sHTMLtag : "can-has-js"
			}
			,init : function() {
				var c = BOT;
				var p = c.Project;

				$(document).ready(function() {
					p.imgSizer.collate();
					p.intro();
					p.tagIt();
				});
			}
			,Project : {
				imgSizer : {
					Config : {
						imgCache : []
						,spacer : "/-/img/x.gif"
					}
					,collate : function(aScope) {
						var isOldIE = (document.all && !window.opera && !window.XDomainRequest) ? 1 : 0;
						if (isOldIE && document.getElementsByTagName) {
							var c = BOT.Project.imgSizer;
							var imgCache = c.Config.imgCache;

							var images = (aScope && aScope.length) ? aScope : document.getElementsByTagName("img");
							for (var i = 0; i < images.length; i++) {
								images[i].origWidth = images[i].offsetWidth;
								images[i].origHeight = images[i].offsetHeight;

								imgCache.push(images[i]);
								c.ieAlpha(images[i]);
								images[i].style.width = "100%";
							}

							if (imgCache.length) {
								c.resize(function() {
									for (var i = 0; i < imgCache.length; i++) {
										var ratio = (imgCache[i].offsetWidth / imgCache[i].origWidth);
										imgCache[i].style.height = (imgCache[i].origHeight * ratio) + "px";
									}
								});
							}
						}
					}
					,ieAlpha : function(img) {
						var c = BOT.Project.imgSizer;
						if (img.oldSrc) {
							img.src = img.oldSrc;
						}
						var src = img.src;
						img.style.width = img.offsetWidth + "px";
						img.style.height = img.offsetHeight + "px";
						img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src + "', sizingMethod='scale')"
						img.oldSrc = src;
						img.src = c.Config.spacer;
					}
					// Ghettomodified version of Simon Willison's addLoadEvent() -- http://simonwillison.net/2004/May/26/addLoadEvent/
					,resize : function(func) {
						var oldonresize = window.onresize;
						if (typeof window.onresize != 'function') {
							window.onresize = func;
						} else {
							window.onresize = function() {
								if (oldonresize) {
									oldonresize();
								}
								func();
							}
						}
					}
				}
				,intro : function() {
					$("#intro").append('<i class="cap"></i><i class="cap alt"></i>');

					var $oSlides = $("#slides p"),
						iCeil = $oSlides.length,
						iShow = Math.floor(Math.random() * iCeil),
						sClass = "meh";

					$oSlides.addClass(sClass);
					$($oSlides[iShow]).removeClass(sClass);
				}
				,tagIt : function() {
					var c = BOT;
					$("html").addClass(c.Config.sHTMLtag);
				}
			}
		};

		BOT.init();
	})(jQuery);
}
