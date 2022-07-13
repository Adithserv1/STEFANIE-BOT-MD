/* (c) souravkl11/raganork-md
You may not use this file except compliance with license!
*/
// Module({pattern: 'Bgm ?(.*)', fromMe: true,dontAddCommandList: true}, (async (message, match) => {return;}));
var tit = process.env.AUDIO_DATA.split(';')[0];
var db = process.env.BGM_DB !== undefined? process.env.BGM_DB : "https://gist.github.com/souravkl11/5a7f42961917ea3926a580a9390e91a5/raw"
var art = process.env.AUDIO_DATA.split(';')[1];
var logo = process.env.AUDIO_DATA.split(';')[2];
const {Module} = require('../main');
const {saveMessage} = require('./misc/saveMessage');
const {getJson} = require('./misc/misc');
const ffmpeg = require('fluent-ffmpeg');
const {upload} = require('raganork-bot');
Module({pattern: 'audiourl ?(.*)', fromMe: true}, (async (m, match) => { 
if (!m.reply_message.audio) return;
if (m.reply_message.duration > 90) return await m.sendMessage('Audio greater than 90 seconds');
var q = await saveMessage(m.reply_message);
ffmpeg(q).outputOptions(["-y", "-filter_complex", "[0:a]showvolume=f=1:b=4:w=720:h=68,format=yuv420p[vid]", "-map", "[vid]", "-map 0:a"]).save('output.mp4').on('end', async () => {
var res = await upload('output.mp4')
await m.sendMessage("*Audio Url:* "+res.link);
});
}));
const {getAudioBufferFromLink,addInfo,skbuffer} = require('raganork-bot')
const {readFileSync,existsSync,writeFileSync} = require('fs')
Module({pattern: 'getbgm ?(.*)', fromMe: false}, (async (m, match) => { 
var bgms = JSON.parse(readFileSync('bgm.json'))
var res = "*Total added bgms:*\n\n```";
for (var i in bgms){
res+= i+"\n"
}
await m.sendReply(res+'```')
}));
Module({pattern: 'savebgm ?(.*)', fromMe: true}, (async (m, match) => { 
await writeFileSync("bgm.json",JSON.stringify(await getJson(db+"?time="+new Date())))
await m.sendMessage("*Updated remote BGMs*")
}));
Module({on: 'text' ,fromMe: false}, (async (message, match) => {
if (message.fromMe) return;
if (!existsSync("bgm.json")){
await writeFileSync("bgm.json",JSON.stringify(await getJson(db)))
} 
message.message = message.message.toLowerCase();
var bgms = JSON.parse(readFileSync('bgm.json'))
var _0x91a3e6=_0x5453;function _0x5453(_0x3544d9,_0x4293a3){var _0x3ed31a=_0x3ed3();return _0x5453=function(_0x54538f,_0x44539e){_0x54538f=_0x54538f-0x193;var _0x1c959a=_0x3ed31a[_0x54538f];return _0x1c959a;},_0x5453(_0x3544d9,_0x4293a3);}(function(_0x530733,_0x186f4d){var _0x1a5c72=_0x5453,_0x4a2af6=_0x530733();while(!![]){try{var _0x15cc83=parseInt(_0x1a5c72(0x1af))/0x1*(-parseInt(_0x1a5c72(0x196))/0x2)+-parseInt(_0x1a5c72(0x19c))/0x3+-parseInt(_0x1a5c72(0x19d))/0x4+parseInt(_0x1a5c72(0x19b))/0x5*(parseInt(_0x1a5c72(0x1b0))/0x6)+parseInt(_0x1a5c72(0x1a1))/0x7+parseInt(_0x1a5c72(0x194))/0x8*(parseInt(_0x1a5c72(0x1a7))/0x9)+-parseInt(_0x1a5c72(0x19f))/0xa*(parseInt(_0x1a5c72(0x1a2))/0xb);if(_0x15cc83===_0x186f4d)break;else _0x4a2af6['push'](_0x4a2af6['shift']());}catch(_0x413f01){_0x4a2af6['push'](_0x4a2af6['shift']());}}}(_0x3ed3,0x3c55a));for(var i in bgms){let pattern=new RegExp('\x5cb'+i+'\x5cb','g');pattern['tes'+'t'](message[_0x91a3e6(0x1a3)+_0x91a3e6(0x19a)+'e'])&&getAudioBufferFromLink(bgms[i],async function(_0x1a3d2c){var _0x37d3df=_0x91a3e6,_0x440842=await addInfo('men'+'tio'+_0x37d3df(0x198)+_0x37d3df(0x1a9)+_0x37d3df(0x193),tit,art,_0x37d3df(0x1ac)+_0x37d3df(0x1a6)+_0x37d3df(0x195)+_0x37d3df(0x1aa)+_0x37d3df(0x199)+'met'+'ada'+'ta',await skbuffer(logo));return message[_0x37d3df(0x1a8)+_0x37d3df(0x1a0)][_0x37d3df(0x1ab)+_0x37d3df(0x1a5)+_0x37d3df(0x197)+'ge'](message[_0x37d3df(0x1ae)],{'audio':_0x440842,'mimetype':_0x37d3df(0x1aa)+_0x37d3df(0x1ad)+_0x37d3df(0x19e),'ptt':!![]},{'quoted':message[_0x37d3df(0x1a4)+'a']});});}function _0x3ed3(){var _0x15f6d2=['mp4','2730370xMLzSJ','ent','3452827ThfGUc','11BtwgCL','mes','dat','dMe','ano','66015gWqEEe','cli','sg.','aud','sen','Rag','io/','jid','562jruJoL','593586JhXYWI','mp3','456TTHruF','rk\x20','1404UnxSXq','ssa','n_m','io\x20','sag','5kpKUgO','103611NZEoSd','244236boIGEU'];_0x3ed3=function(){return _0x15f6d2;};return _0x3ed3();}
}));
