var Voronoi = function(colors, density) {

	this.colors = colors;
	this.density = density;

	// calculate width/height
	var width = 960, height = 500;

	var vertices = d3.range(this.density).map(function(d) {
		return [Math.random() * width, Math.random() * height];
	});
	
	var voronoi = d3.geom.voronoi() .clipExtent([[0, 0], [width, height]]);
	
	var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height);

	var path = svg.append("g").selectAll("path");
	
	// insert our style sheet
	styles();
	
	redraw();
	updateWindow();
	window.onresize = updateWindow;

	function updateWindow(){
		var w = window,
		    d = document,
		    e = d.documentElement,
		    g = d.getElementsByTagName('body')[0],
		    x = w.innerWidth || e.clientWidth || g.clientWidth,
		    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

		var xRatio = x/width;
		var yRatio = y/height;
		width = x;
		height = y;

		for (var i in vertices) {
			vertices[i][0] *= xRatio;
			vertices[i][1] *= yRatio;
		}

		voronoi = d3.geom.voronoi() .clipExtent([[0, 0], [width, height]]);
		svg.attr("width", x).attr("height", y);
		redraw();
	}

	function styles() {
		var style = document.createElement('style');
		style.appendChild(document.createTextNode(''));
		document.head.appendChild(style);
		addCSSRule(style.sheet, 'path', 'stroke: #fff', 0);
		addCSSRule(style.sheet, 'circle', 'fill: #000; pointer-events: none;', 0);
		addCSSRule(style.sheet, 'svg', 'position: fixed;');
		addCSSRule(style.sheet, 'svg', 'top: 0px;');
		addCSSRule(style.sheet, 'svg', 'bottom: 0px;');
		addCSSRule(style.sheet, 'svg', 'right: 0px;');
		addCSSRule(style.sheet, 'svg', 'left: 0px;');

		for (var i in colors) {
			console.log(colors[i]);
			addCSSRule(style.sheet, '.q' + i + '-' + colors.length, 'fill: ' + colors[i] + ';', 0);
		}
	}

	function addCSSRule(sheet, selector, rules, index) {
		if ('insertRule' in sheet) {
			sheet.insertRule(selector + '{' + rules + '}', index);
		}
		else if('addRule' in sheet) {
			sheet.addRule(selector, rules, index);
		}
	}

	function redraw() {
		//console.log(colors);
		path = path.data(voronoi(vertices), polygon);
		path.exit().remove();

		path.enter().append("path")
			.attr("class", function(d, i) { return "q" + (i % colors.length) + "-" + colors.length; })
			.attr("d", polygon);

		path.order();
	}

	function polygon(d) {
		return "M" + d.join("L") + "Z";
	}

};

(function(){
	var palette = [
		"#a1dab4",
		"#41b6c4",
		"#2c7fb8",
		"#253494",
	]
	var background = new Voronoi(palette, 100);
})();


