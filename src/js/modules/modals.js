const modals = () => {
 /*  функция привязки окна к тригеру */
  function bindModal(triggerSelector, modalSelector, closeSelector) {
    const trigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector),
          close = document.querySelector(closeSelector);

    trigger.forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target) {
          e.preventDefault();
        }
  
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
        /* document.body.classList.add('modal-open'); */
      });
    });

   /*  закрытие окна при нажатии на крестик */
    close.addEventListener('click', () => {
      modal.style.display = "none";
      document.body.style.overflow = "";
    /*  document.body.classList.remove('modal-open'); */
    });
    
  /*   закрытие модального окна при нажатии в любое место */
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";
      /* document.body.classList.remove('modal-open'); */
      }
    });
  }

 /*  показать модальное окно через определенное время */
  function showModalByTime(selector, time) {
    setTimeout(function() {
      document.querySelector(selector).style.display = 'block';
      document.body.style.overflow = "hidden";
    }, time);
  }
 
  bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
  bindModal('.phone_link', '.popup', '.popup .popup_close');
  showModalByTime('.popup', 60000);
};

export default modals;