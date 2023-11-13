const zmq = require('zeromq');
const sock = zmq.socket('req');


/* connect to socket */
const url = 'tcp://127.0.0.1:5000';
sock.connect(url);
console.log(`[CLIENT] Connected to ${url}`);	


/* Read command line arguments */
const clientId = process.argv.slice(2)[0];
const timeout = process.argv.slice(2)[1];
if (!clientId) {
  console.error('Error: Please provide a client name as a command line argument.');
  process.exit(1);
}

const sendMessage = (clientId, loc, doctorType) => {
  const msg = {
    clientId,
    loc,
    doctorType
  };
  const serializedMsg = JSON.stringify(msg);
  sock.send(serializedMsg);
  console.log('[SENT] ', msg);
};

/* send request to server for every {timeout} seconds */
setInterval(() => {
  const loc = ['pineValley', 'grandOak'];
  const doctorType = ['Ophthalmologist', 'Physician', 'Pediatrician'];

  const randomLoc = loc[Math.floor(Math.random() * loc.length)];
  const randomDoctorType = doctorType[Math.floor(Math.random() * doctorType.length)];

  sendMessage(clientId, randomLoc, randomDoctorType);
}, timeout);


/* listen response */
sock.on('message', (reply) => {
  console.log(`[SERVER] ${reply.toString()}`);
});
