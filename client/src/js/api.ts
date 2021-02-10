const saveInDb = async (phoneNumber: string, countryCode: string) => {
  const URL = 'https://3p81tg0vh6.execute-api.us-east-1.amazonaws.com/';

  try {
    const userData = {
      phoneNumber,
      countryCode,
    };

    const request = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    console.log(request.status, request);
  } catch (e) {
    console.log('!ERROR! ', e);
  }
};

document.getElementById('consent-form')!.addEventListener('submit', (e) => {
  e.preventDefault();
  const phoneNumber = document.querySelector('[name=phoneNumber]')! as HTMLInputElement;
  const countryCode = document.querySelector('[name=countryCode]')! as HTMLSelectElement;

  saveInDb(phoneNumber.value, countryCode.value);
});
