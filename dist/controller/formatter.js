sap.ui.define(function() {
	"use strict";

	var formatter = {
		f_timestamp: function(jsonDateString) {
			//return new Date(parseInt(jsonDateString.replace('/Date(', '')));
			if (jsonDateString > "0") {
				return new Date(jsonDateString).toLocaleString();
			} else {
				return "Keine Daten";
			}
		}

	};

	return formatter;

}, /* bExport= */ true);