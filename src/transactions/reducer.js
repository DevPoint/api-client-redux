
const assign = Object.assign;

export const defaultInsertTransaction = {
	transactionId: null,
	ready: false,
	processing: true,
	failed: false,
	itemId: null,
	data: {},
	errors: [],
	validationErrors: null
};

export const defaultUpdateTransaction = {
	transactionId: null,
	ready: false,
	processing: true,
	failed: false,
	itemId: null,
	data: {},
	errors: [],
	validationErrors: null
};

export const defaultDeleteTransaction = {
	transactionId: null,
	ready: false,
	processing: true,
	failed: false,
	itemId: null,
	errors: []
};

export const defaultLoginTransaction = {
	transactionId: null,
	ready: false,
	processing: true,
	failed: false,
	userId: null,
	credentials: {},
	errors: [],
	validationErrors: null
};

export const defaultRegisterTransaction = {
	transactionId: null,
	ready: false,
	processing: true,
	failed: false,
	token: '',
	errors: [],
};

function reducer(state, action) {
	const actionTypeFrags = action.type.split('_');
	const newState = assign({}, state);
	const updateTransaction = { transactionId: action.id };
	if (action.payload) {
		for (let propKey in action.payload) {
			updateTransaction[propKey] = action.payload[propKey];
		}
	}
	let defaultTransaction = {};
	switch (actionTypeFrags[2]) {
		case 'INSERT':
			defaultTransaction = defaultInsertTransaction;
			break;
		case 'UPDATE':
			defaultTransaction = defaultUpdateTransaction;
			break;
		case 'DELETE':
			defaultTransaction = defaultDeleteTransaction;
			break;
		case 'LOGIN':
			defaultTransaction = defaultLoginTransaction;
			break;
		case 'REGISTER':
			defaultTransaction = defaultRegisterTransaction;
			break;
	}
	switch (actionTypeFrags[0]) {
		case 'ADD':
			newState[action.id] = defaultTransaction;
			state = assign({}, state, newState);
			break;
		case 'SET':
			newState[action.id] = assign({}, defaultTransaction, actionTransaction);
			state = assign({}, state, newState);
			break;
		case 'UPDATE':
			newState[action.id] = assign({}, state[action.id], actionTransaction);
			state = assign({}, state, newState);
			break;
	}
	return state;
};

export default reducer;
