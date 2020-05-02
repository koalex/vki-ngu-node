const config = require('config');
const path = require('path');
const {execFile} = require('child_process');
const mozjpeg = require('mozjpeg');


module.exports = async (ctx, next) => {
	if (!ctx.request.body || !ctx.request.body.foto) return await next();
	const input = path.join(config.staticRoot, ctx.request.body.foto);
	const output = path.join(config.staticRoot, 'min-' + ctx.request.body.foto);

	await new Promise(resolve => {
		execFile(mozjpeg, ['-outfile', output, input], err => {
			resolve();
		});
	});

	await next();
}
