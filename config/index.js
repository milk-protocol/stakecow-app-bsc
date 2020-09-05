let env = 'development'
if(process.env.NODE_ENV == 'production') {
	env = 'production';
}

const config = require(`./${env}`);

export default config;
