function getSorted(selector, attrName) {
    return $($(selector).toArray().mergeSort(function(a, b) {
        var aVal = a.getAttribute(attrName),
            bVal = b.getAttribute(attrName);

        if (typeof(aVal) == 'string')
            return aVal.localeCompare(bVal);

        return aVal - bVal;
    }));
}

function getReverseSorted(selector, attrName) {
    return $($(selector).toArray().mergeSort(function(a, b) {
        var aVal = a.getAttribute(attrName),
            bVal = b.getAttribute(attrName);

        if (typeof(bVal) == 'string')
            return bVal.localeCompare(aVal);

        return bVal - aVal;
    }));
}

function getAttributeByLi(li, attribute) {
    return li.getAttribute(attribute);
}

function displayPublications(lis, type, ordered_list, generate_anchors) {
    var pre = "0", current;

    $("div.publications").html("");
    $("div.anchors").html("<br />");
	
    while (lis.length > 0) {

        current = getAttributeByLi(lis[0], type);

        if (type == "data-time") {
            current = Math.floor(current / 10000);
            current = current.toString();
        }

        if (pre.localeCompare(current) != 0) {
		
            validClassName = current.replace(/ /g, "");
            validClassName = validClassName.replace(/[\&:\\\{\}\*\+\$\/\^\.\|\?\+\(\)\[\]!@#%]/g, "");
			
			// Generate <h3><a> and <ul> in div.publications
            $("div.publications").append("<h3>" + (generate_anchors ? "<a name='" + validClassName + "'>" : "") + current + (generate_anchors ? "</a>" : "") + "</h3>" + 
			(ordered_list ? "<ol class=" : "<ul class=") + "'" + validClassName + (ordered_list ? "'></ol>" : "'></ul>"));
			
			// Generate anchors in div.anchors
			if (generate_anchors)
				$("div.anchors").append("<a href='#" + validClassName + "'>" + current + "</a>&nbsp;|&nbsp;");
        }

        $("." + validClassName).html($("." + validClassName).html() + lis[0].outerHTML);

        pre = current;

        lis = [].slice.call(lis, 1);
    }
}

function toggle(type, ordered_list, generate_anchors) {
    var lis;
	ordered_list = typeof ordered_list !== 'undefined' ? ordered_list : true;
	generate_anchors = typeof generate_anchors !== 'undefined' ? generate_anchors : true;

    if (type == "data-time")
        lis = getReverseSorted('#publicationdatabase .publication', type);
    else
        lis = getSorted('#publicationdatabase .publication', type);

    displayPublications(lis, type, ordered_list, generate_anchors);
}