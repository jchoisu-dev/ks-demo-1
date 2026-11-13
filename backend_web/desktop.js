// 
const { controller } = require('./app/plugin/controllers');
const desktop = controller('../controller/desktop');
// 
const { wsss } = require('./app/plugin/wss');
//
const ports = [
  // 2001,
  // 2002,
  // 2003,
  // 2004,
  // 2005,
  1006,
  1007,
  1008,
  1009,
  1010,
  1011,
  1012,
  1013,
  1014,
  1015
];
//
for(let i in ports)
{
  wsss(ports[i], desktop);
}