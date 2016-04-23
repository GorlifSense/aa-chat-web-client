(function(){
	var chat = {};	
	/* Create input messages */
	chat.input = {};
	var input = chat.input;
	input.context = '';
	Object.defineProperty(chat.input, 'value', {
		get: function(){ return input.context;},
		set: function(value){if(typeof value == 'string') {input.context = value}},
	});
	/* User list */
	chat.users = {};
	chat.users.list = {};
	var users = chat.users;
	users.addUser = function(id, nickname, func){
		users.list['id'] = {'id':id,'nickname':nickname,'date': new Date()};
		if(func) {func(users, users.list['id']);}
	};
	users.removeUser = function(id, func){
		if(func) {func(users, users.list['id']);}
		delete users.list['id'];
	};
	users.get = function(id){
		return users.list['id'];
	};
	/* Create messages instanse */
	chat.messages = {};
	chat.messages.list = {};
	var messages = chat.messages;
	messages.get = function(id){
		return messages.list[id];
	};
	function addMessage(id, func){
		var value = input.value;
		if(value != '' && value != null){
			messages.list[id] = {'id':id,'message':input.value};
			input.value = '';
			if(func) {func(messages, messages.list[id]);}
		}
	}
	chat.html = {};
	chat.html.map = {
		'#chat' : {
			'controller': chat,
			'event':['chat-resize'],
			'children': {
				'.chat-wrapper': {
					'children': {
						'.chat-users' : {
							'controller':chat.users,
							'event':['add-user','remove-user'],
							'children':{
								'.chat-users-close-button': {
									'children':'x',
								}
							}
						}, 
						'.chat-messages': {
							'controller': chat.messages,
							'event':['add-message']
						},
						'.chat-input': {
							'children': {
								'input': {
									'controller': chat.input,
									'events':['send-message'],
								},
								'button':{
									'children': 'send',
									'events':['send-message'],
								}
							}
						}
					}
				}
			}
		}
	};
	chat.html.apply = function(parent, object){
		var element = document.createElement(object['tag']);
		if(object['id'])
			element.id = object['id'];
		if(object['className'])
			element.className = object['className'];
		if(object['innerHTML'])
			element.innerHTML = object['innerHTML'];
		parent.appendChild(element);
	}
	chat.html.functions = {
		'chat-resize' : function(){
			if(this.offsetWith < this.limitWidth)
				this.className += ' minified';
			else
				this.className = this.className.replace(/\s?minified/,'');
		}, 
		'add-user' : function(id, nickname){
			this.controller.addUser(id, nickname, function(global, local){
				chat.html.apply(this, {'className':'message-'+local['id'],'innerHTML':local['message'],'tag':'div'});
			});
		},
		'remove-user' : function(id){
			this.controller.removeUser(id, function(global, local){
				chat.html.remove(this, {'className':'message-'+local['id']});
			});
		},
	}
	console.log(chat);
})();