const fs = require('fs');
const path = require('path');
const config = require('config');
const busboy = require('async-busboy');

module.exports = async (ctx, next) => {
	const contentType = ctx.get('content-type') || '';

	if (!contentType.includes('multipart/form-data')) {
		return await next();
	}

	const {files, fields} = await busboy(ctx.req, {
		limits: {
			fields: 50,
			files: 3,
			fileSize: 1048576 // 1МB
		}
	});

	if ('object' !== typeof ctx.request.body) ctx.request.body = {};

	for (const field in fields) {
		ctx.request.body[field] = fields[field];
	}

	if (files && files.length) {
		for (const file of files) {
			const fileName = file.filename;
			const fieldName = file.fieldname;
			file.pipe(fs.createWriteStream( path.join(config.staticRoot, fileName) ));
			ctx.request.body[fieldName] = fileName;
		}
	}

	await next();
}