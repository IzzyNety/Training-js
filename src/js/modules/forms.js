import checkNumInputs from './checkNumInputs';

const forms = (state) => {
 /*  получаем элементы которые нам понадобятся */
  const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input');


checkNumInputs('input[name="user_phone"]');

  /* создаем обьект с сообщениями */
  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  /* функция отвечающая за отправку запроса */
  const postData = async (url, data) => {
    document.querySelector('.status').textContent = message.loading;
    let res = await fetch(url, {
      method: "POST",
      body: data
    });

    return await res.text();
  };

  /* функция по очищению */
  const clearInputs = () => {
    inputs.forEach(item => {
      item.value = '';
    });
  };

  /* перебираем все формы */
  form.forEach(item => {
    item.addEventListener('submit', (e) => {
        e.preventDefault();

        /* оповещение пользователя */
        let statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        item.appendChild(statusMessage);

        /* сбор данных которые есть в форме */
        const formData = new FormData(item);
        if(item.getAttribute('data-calc') === "end") {
          for (let key in state) {
            formData.append(key, state[key]);
          }
        }

        /* написание самого запроса на сервер */
        postData('assets/server.php', formData)
          .then(res => {
            console.log(res);
            statusMessage.textContent = message.success;
          })
          .catch(() => statusMessage.textContent = message.failure)
          .finally(() => {
            clearInputs();
            setTimeout(() => {
              statusMessage.remove();
            }, 5000);
          });
    });
  });
};

export default forms;