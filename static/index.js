const createURL = '/api/contacts';
const create_btn = document.querySelector('#create_user');
const username = document.querySelector('#username');
const userphone = document.querySelector('#userphone');


create_btn.addEventListener('submit', (e) => {
  try {
    e.preventDefault();
    fetch(createURL, {
      method: 'POST',
      body: `?user=${userphone.value}&phone=${userphone.value}`
    })
      .then(result => {
        console.log(result);
      });
  } catch (err) {
    console.log(err);
  }
});