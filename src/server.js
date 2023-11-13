const axios = require('axios'); 
const zmq = require('zeromq');

const url = 'tcp://127.0.0.1:5000';
const baseURL = 'http://localhost:9091';

const sock = zmq.socket('rep');

/* bind to an endpoint */
sock.bindSync(url);
console.log(`[SERVER] Listening on ${url}`);

/* listen request */
sock.on('message', async (msg) => {
  try {
    const data = JSON.parse(msg.toString());
    console.log(`[RECEIVED] Client ${data.clientId} | ${data.loc} - ${data.doctorType}`);

    const doctorInfo = await getDoctors(data.loc, data.doctorType);
    
    if (doctorInfo.doctor) {
      const BookedDoctor = doctorInfo.doctor[0];
      sock.send(`Success Booking : ${BookedDoctor.name} at ${BookedDoctor.time}`);
    }

  } catch (error) {
    console.error('[ERROR][RECEIVED] ', error.message);
  }
});

/* get doctors data from doctor service */
const getDoctors = async (loc, doctorType) => {
  try {
    let endpoint, body, response;
    if (loc === 'pineValley') {
      endpoint = `${baseURL}/${loc}/doctors/`;
      body = {
        doctorType
      };
      response = await axios.post(endpoint, body);
    } else {
      endpoint = `${baseURL}/${loc}/doctors/${doctorType}`;
      response = await axios.get(endpoint);
    }

    const data = response.data;
    return data.doctors;

  } catch (error) {
    console.error('[ERROR][FETCH] ', error.message);
  }
};