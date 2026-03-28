const axios = require('axios');

async function run() {
  try {
    const req = await axios.post('http://localhost:8000/api/orders', {
      shippingAddress: '123 Test St',
      paymentMethod: 'COD'
    }, { headers: { Authorization: 'Bearer ' }});
    console.log(JSON.stringify(req.data, null, 2));
  } catch(e) { console.log(e.response ? e.response.data : e.message); }
}

run();
