
function create_table(command){
	const AsciiTableModule = require('./ascii-tables-gh-pages/assets/js/script')
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
	var path = require('path');
	var fs = require('fs');
	//joining path of directory 
	var directoryPath = "./stored_tables/";
	return fs.readdirSync(directoryPath);
}
function add_line(){}
function edit_line(){}



function main(){
	
const Discord = require('discord.js');
const client = new Discord.Client();
var lastTable = "";
var markdown = require( "markdown" ).markdown;
console.log( markdown.toHTML( "Hello *World*!" ) );

client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
 });

client.on('message', msg => {
	
var command = msg.content;
 if (command === 'ping') {
 msg.reply('PONG! c est fini Jb, t as perdu');
 }
 
 if (command.startsWith('!Picasso ')) {
	  command = command.substr(9, command.length);
	  console.log(command);
	  if (command.startsWith('help')) {
		  console.log("Affichage de l'aide");
		  msg.reply("Affichage de l'aide \n test multiligne ");
	  }
	  else if(command.startsWith('list-tables')){
		msg.reply(list_tables());
	  }
	  else if(command.startsWith('create-table')){
		command = command.substr(13, command.length);
		//var AsciiTable = require('ascii-table')
		var mytable = create_table(command);
		msg.reply("```".concat(mytable).concat("```"));
		lastTable = command;
	  }
	  else if(command.startsWith('store-last')){
		command = command.substr(11, command.length);
		var tmps = command.split(" ");
		var filename = tmps[0];
		filename.trim();
		if(!filename == "")
		{
			fs = require('fs');
			fs.writeFile("stored_tables/".concat(filename), lastTable,function(err) { 
			if (err) throw err;
			// if no error
			console.log("Data is written to file successfully.")
			});
		}
	  }
	  else if(command.startsWith('show-table')){
		command = command.substr(11, command.length);
		var mytable = create_table(show_table(command));
		msg.reply("```".concat(mytable).concat("```"));
	  }
	  else{
		msg.reply("Désolé je n'ai pas compris ta demande. Noob");
	  }
	  
 }
 });

var fs = require('fs');
var token = fs.readFileSync('./TOKEN.txt','utf-8');
client.login(token);

}


main();