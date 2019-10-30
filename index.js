
const tag_picasso = "!Picasso" ;
const tag_nothing = "nothing" ;
const tag_error = "error" ;
const tag_help = "help" ;
const tag_show_table = "show-table"
const tag_ping = "ping"
const tag_create_table = "create-table"
const tag_list_tables = "list-tables"
const tag_store_last_table = "store-last"

function create_table(command){
	const AsciiTableModule = require('./ascii-tables-gh-pages/script')
		AsciiTableModule.setSeparator('|');
		AsciiTableModule.setStyle("dots")
		return AsciiTableModule.createTable(command)
}
function create_table_from_html(){}
function create_table_from_markdown(){}
function create_table_from_markdown(){}
function show_table(tabletoshow){
	var path = require('path');
	var fs = require('fs');
	//joining path of directory 
	var directoryPath = "./stored_tables/";
	console.log(directoryPath.concat(tabletoshow));
	var content = fs.readFileSync(directoryPath.concat(tabletoshow),'utf-8');
	console.log(content);
	return content;
}
function show_table_html(){}
function show_table_markdown(){}
function delete_table(){}
function list_tables(){
	var fs = require('fs');
	return fs.readdirSync("./stored_tables/");
}
function add_line(){}
function edit_line(){}

function createNewToDo(mycase, myargs){
	return  { 	case: mycase, 
				args: myargs} ;
	
}

function parse_command(commandstr){
	var command_splitted = commandstr.trim().split(" ");
	if(command_splitted[0] === tag_picasso){
		switch(command_splitted[1]){
			case tag_ping:
					return createNewToDo(tag_ping, "pong");
			break;
			case tag_create_table:
				if(command_splitted.length < 4){
					return createNewToDo(tag_help, ["custom",tag_create_table]);
				}else{
					var table_content = commandstr.substr(25 + command_splitted[3].length , commandstr.length);
					// TODO : chechk syntax
					return createNewToDo(tag_create_table, {mode: command_splitted[2], table_content: table_content });
				}
			break;
			case tag_list_tables:
				return createNewToDo(tag_list_tables, null);
			break;
			case tag_show_table:
				return createNewToDo(tag_show_table, command_splitted[3]);
			break;
			case tag_store_last_table:
				return createNewToDo(tag_store_last_table, command_splitted[3]);
			break;
			case tag_help:
				if(command_splitted.length == 2){
					return createNewToDo(tag_help, "main");
				}
				else if(command_splitted[2] === "list")
				{
					return createNewToDo(tag_help, "list");
				}
				else{
					return createNewToDo(tag_help, ["custom",command_splitted[2]]);
				}
				
			break;
			default:
				return createNewToDo("error", null);
		}
	}
	return createNewToDo("nothing", null);
}



//////////////////////////////////////////////
function main(){
	
const Discord = require('discord.js');
const client = new Discord.Client();
var lastTable = "";
// var markdown = require( "markdown" ).markdown;

client.on('ready', () => {
 	console.log(`Logged in as ${client.user.tag}!`);
 });

client.on('message', msg => {
	
var command = parse_command(msg.content);

switch(command.case){
	case tag_error:
			msg.reply("Désolé, je n'ai pas compris le message");
	break;
	case tag_ping:
			msg.reply('pong');
	break;
	case tag_help:
		try{
			if(command.args === "main")
			{
				var fs = require('fs');
				console.log("Affichage de l'aide principale");
				var content = fs.readFileSync("./help/main_help",'utf-8');
				if(content){
					msg.reply(content);
				}
			}else if(command.args === "list"){
				var fs = require('fs');
				msg.reply("Les aides ci-dessous sont disponibles. Faites !Picasso help [aide] pour l'afficher: \n" + fs.readdirSync("./help/"));
			}
			else if(command.args[0] === "custom"){
				var fs = require('fs');
				console.log("affichage de l'aide pour ./help/"+command.args[1]);
				var content = fs.readFileSync("./help/"+command.args[1],'utf-8');
				if(content){
					msg.reply(content);
				}
			}
		}catch(error)
		{
			console.error(error);
			msg.reply("Désolé, une erreur est subvenue dans le code du bot. Les logs côtés serveur peuvent aider");
		}
	break;
	case tag_create_table:
		console.log(command);
		if(command.args.mode === "simple"){
			console.log("création d'un tableau simple");
			var mytable = create_table(command.args.table_content);
			msg.reply("```".concat(mytable).concat("```"));
			lastTable = command;
		}
	break;
	case tag_list_tables:
			msg.reply(list_tables());
	break;
	case tag_show_table:
		var mytable = create_table(show_table(command.args));
		msg.reply("```".concat(mytable).concat("```"));
	break;
	case tag_store_last_table:
		var filename = command.args
		if(!filename == "")
		{
			fs = require('fs');
			try{
				fs.writeFileSync("stored_tables/".concat(filename), lastTable);
				console.log("Data is written to file successfully.");
				msg.reply(" votre tableau a été enregistré sous le nom "+filename)
			}catch(error){
				console.error("Can't write data to file.");
				console.error(error);
				msg.reply(" Je suis désolé mais il m'est impossible d'enregister ce tableau");
			}
		}
	break;
	default:

}

 
 /*if (command.startsWith('!Picasso ')) {
	  command = command.substr(9, command.length);
	  console.log(command);

	  else if(command.startsWith('store-last')){
		
	  }
	  else if(command.startsWith('show-table')){
		
	  }
	  else{
		msg.reply("Désolé je n'ai pas compris ta demande. Noob");
	  }
	  
 }*/
 });

var fs = require('fs');
var token = fs.readFileSync('./TOKEN.txt','utf-8');
client.login(token);

}


main();