var config = {
	development: {
		host : 'localhost',
		user : 'root',
		password : 'root',
		database : 'bilna_rebirth_v2'
	},
	staging: {
		host : 'localhost',
		user : 'root',
		password : 'root',
		database : 'bilna_rebirth_v2'
	},
	production: {
		host : 'localhost',
		user : 'root',
		password : 'root',
		database : 'bilna_production_v2'
	}
}
module.exports = function(mode){
	return config[mode || process.argv[3] || 'development'] || config.local; 
}
