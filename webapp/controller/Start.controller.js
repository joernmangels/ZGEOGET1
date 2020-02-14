var oView;
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"de/varelmann/zgeoget1/controller/formatter"
	

], function(Controller, formatter) {
	"use strict";

	return Controller.extend("de.varelmann.zgeoget1.controller.Start", {

		onInit: function(evt) {
			oView = this.getView();
			oView.setModel(this.getOwnerComponent().getModel("geodata"), "geodata");
		},
		onGetGeo: function(evt) {
			//var oModel = this.getView().getModel("geodata");
			// var data = {
			// 	Latitude: "0.0",
			// 	Longitude: "0.0"
			// };

			// 	  if (navigator.geolocation) {
			//navigator.geolocation.getCurrentPosition(this._SetPosition);

			//} else { 
			//  x.innerHTML = "Geolocation is not supported by this browser.";
			//}
			// 	navigator.geolocation.getCurrentPosition(DataTransfer)
			//var youAreHere = this.getLocation(true);

			//var daten = this.getLocation2();
			this.getLocation3();
			// var data = {
			// 	Timestamp: "1",
			// 	Accuracy: "2",
			// 	Latitude: "3",
			// 	Longitude: "41"
			// };
			// // var oView2 = this.getView();
			// var oModel = oView.getModel("geodata");
			// // oView2.setModel(oModel, data);
			//  oModel.setProperty("/Latitude", '123456');
			
		},
		getLocation3: function() {
			//oView = this.getView();
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError, {
					enableHighAccuracy: true
				});
			} else {
				alert("Geolocation is not supported by this browser.");
			}
		},
		geoSuccess: function(position) {
			//var lat = position.coords.latitude;
			//var lng = position.coords.longitude;
			//alert("lat:" + lat + " lng:" + lng);
			//oView.byId("Latitude").setText(position.coords.latitude);
			// var data = {
			// 	Timestamp: position.timestamp,
			// 	Accuracy: position.coords.accurancy,
			// 	Latitude: position.coords.latitude,
			// 	Longitude: position.coords.longitude
			// };
			// //oView.setModel("geodata", data);
			var oModel = oView.getModel("geodata");
			oModel.setProperty("/Latitude", position.coords.latitude);
			oModel.setProperty("/Longitude", position.coords.longitude);
			oModel.setProperty("/Timestamp", position.timestamp);
			oModel.setProperty("/Time", position.timestamp);
			
			var link = "https://www.google.com/maps/search/?api=1&query=" +  position.coords.latitude + ","  + position.coords.longitude;
			
			oModel.setProperty("/Link", link);
			oModel.setProperty("/Link_enabled", true);
		},
		geoError: function() {
			alert("Geocoder failed.");
		},
		_SetPosition: function(position) {
			//   x.innerHTML = "Latitude: " + position.coords.latitude + 
			//   "<br>Longitude: " + position.coords.longitude;
			var data = {
				Timestamp: position.timestamp,
				Accuracy: position.coords.accurancy,
				Latitude: position.coords.latitude,
				Longitude: position.coords.longitude
			};
			this.getView().setModel("geodata", data);
		},
		getLocation2: function() {

			if (navigator.geolocation) {
				var obj = {};

				navigator.geolocation.getCurrentPosition(
					function(position) {
						obj.Timestamp = position.timestamp;
						obj.Accuracy = position.coords.accurancy;
						obj.Latitude = position.coords.latitude;
						obj.Longitude = position.coords.longitude;
					}

				);
				return obj;
			}

			// 		// Accuracy in meters, latitude and longitude
			// 		obj.ACCURACY = position.coords.accuracy;
			// 		obj.LATITUDE = position.coords.latitude;
			// 		obj.LONGITUDE = position.coords.longitude;
			//})			
		},
		getLocation: function(enableHighAccuracy) {
			//		function getLocation(enableHighAccuracy) {
			if (navigator.geolocation) {
				var obj = {};
				navigator.geolocation.getCurrentPosition(function(position) {

					// Accuracy in meters, latitude and longitude
					obj.ACCURACY = position.coords.accuracy;
					obj.LATITUDE = position.coords.latitude;
					obj.LONGITUDE = position.coords.longitude;

					// Get address from geolocation
					try {
						$.ajax({
							url: 'https://maps.googleapis.com/maps/api/geocode/json',
							data: {
								latlng: position.coords.latitude + ',' + position.coords.longitude,
								sensor: true
							},
							success: function(data) {
								if (data.status == 'OK') {
									var strt = $.grep(data.results, function(e) {
										return e.types == 'street_address';
									});
									if (strt.length === 1) {
										var route = $.grep(strt[0].address_components, function(e) {
											return e.types == 'route';
										});
										if (route.length === 1) {
											obj.STREET = route[0].long_name;
										}
										var no = $.grep(strt[0].address_components, function(e) {
											return e.types == 'street_number';
										});
										if (no.length === 1) {
											obj.STREET_NUMBER = no[0].long_name;
										}
										var zipcode = $.grep(strt[0].address_components, function(e) {
											return e.types == 'postal_code';
										});
										if (zipcode.length === 1) {
											obj.POSTAL_CODE = zipcode[0].long_name;
										}
										var town = $.grep(strt[0].address_components, function(e) {
											return e.types == 'postal_town';
										});
										if (town.length === 1) {
											obj.CITY = town[0].long_name;
										}
									}
								}
							}
						}).then(
							function() {
								console.log("I know where you are!");
							});
					} catch (error) {
						console.warn(error);
					}

				}, function(error) {
					console.warn(error.code + ' ' + error.message);
				}, {
					enableHighAccuracy: enableHighAccuracy
				});
				return obj;
			}
		}
	});
});