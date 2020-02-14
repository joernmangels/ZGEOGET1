sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";

	return {

		createTestModel: function(name) {

			var data = {
				//Device: Device,
				Timestamp: "0",
				Time: "0",
				Accuracy: "0",
				Latitude: "0.0",
				Longitude: "0.0",
				Link: "",
				Link_enabled: false
			};

			//var oModel = new JSONModel(Device);
			//oModel.setDefaultBindingMode("OneWay");
			var oModel = new JSONModel(data, name);
			return oModel;
		}

	};
});