module.exports = function(connection) {
	this.connection = connection;
};

module.exports.prototype = {
	extend: function(properties) {
		var Child = module.exports;
		Child.prototype = module.exports.prototype;
		for(var key in properties) {
			Child.prototype[key] = properties[key];
		}
		return Child;
	},

	setConnection: function(connection) {
		this.connection = connection;
	}

}