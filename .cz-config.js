const fs = require('fs');

const scopes = fs.readdirSync(__dirname + '/modules', {
	withFileTypes: true,
}).filter(dirent => {
	return dirent.isDirectory()
}).map(dirent => ({name: dirent.name}));

module.exports = {
	types: [
		{ value: 'feat', name: 'feat:     Новая функциональность' },
		{ value: 'fix', name: 'fix:      Исправление ошибки' },
		{ value: 'docs', name: 'docs:     Изменение документации' },
		{
			value: 'style',
			name:
				'style:    Изменения, которые не влияют на работу кода\n            (пробелы, форматирование, пропущенные точки с запятой и т.д.)',
		},
		{
			value: 'refactor',
			name: 'refactor: Изменение кода, которое не исправляет ошибки и не добавляет новой функциональности',
		},
		{
			value: 'perf',
			name: 'perf:     Изменение кода, улучшающее проиводительность',
		},
		{ value: 'test', name: 'test:     Добавление тестов' },
		{
			value: 'chore',
			name:
				'chore:    Changes to the build process or auxiliary tools\n            and libraries such as documentation generation',
		},
		{ value: 'revert', name: 'revert:   Revert to a commit' },
		{ value: 'WIP', name: 'WIP:      Work in progress' },
	],

	scopes: [{ name: 'app' }, ...scopes],

	allowTicketNumber: false,
	isTicketNumberRequired: false,
	ticketNumberPrefix: 'TICKET-',
	ticketNumberRegExp: '\\d{1,5}',

	// it needs to match the value for field type. Eg.: 'fix'
	/*
	 scopeOverrides: {
	 fix: [

	 {name: 'merge'},
	 {name: 'style'},
	 {name: 'e2eTest'},
	 {name: 'unitTest'}
	 ]
	 },
	 */
	// override the messages, defaults are as follows
	messages: {
		type: "Выберите тип вашего коммита:",
		scope: '\nУкажите область (scope) вашего изменеия:',
		// used if allowCustomScopes is true
		customScope: 'Denote the SCOPE of this change:',
		subject: 'Краткое описание:\n',
		body: 'Полное описание (optional). Use "|" to break new line:\n',
		breaking: 'List any BREAKING CHANGES (optional):\n',
		footer: 'Перечислите ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
		confirmCommit: 'Подтверждаем?',
	},

	allowCustomScopes: false,
	allowBreakingChanges: ['feat', 'fix'],
	// skip any questions you want
	// skipQuestions: ['body'],

	// limit subject length
	subjectLimit: 100,
	// breaklineChar: '|', // It is supported for fields body and footer.
	// footerPrefix : 'ISSUES CLOSED:'
	// askForBreakingChangeFirst : true, // default is false
};
