function OrdinatorModel () {
	'use strict';

	var self       = this,
		orderLocal = '',
		listLocal  = [],
		listTemp   = [];

	this.listOrdered = [];

	this.ordination = function (list, order) {
		listLocal  = list;
		orderLocal = order;

		$.each(listLocal, function (i, value) {
			listTemp.push(value[orderLocal]);
		});

		listTemp.sort();

		$.each(listTemp, function (i, valueTemp) {
			$.each(listLocal, function (j, valueLocal) {
				if(valueLocal[orderLocal] === valueTemp)
					self.listOrdered.push(valueLocal);
			});
		});
	};
}