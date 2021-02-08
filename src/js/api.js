const URL = '';

const sendToAWS = async (phoneNumber, countryCode) => {
  try {
    const consent = {
      uuid: Date.now().toString(),
      channelType: 'SMS',
      channelValue: phoneNumber,
      countryCode,
    };

    const request = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify(consent),
    });

    console.log(request.status, request);
  } catch (e) {
    console.log('!ERROR! ', e);
  }
};

document.getElementById('consent-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const phoneNumber = document.querySelector('[name=phoneNumber]').value;
  const countryCode = document.querySelector('[name=countryCode]').value;

  sendToAWS(phoneNumber, countryCode);
});
