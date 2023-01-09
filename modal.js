const rootNode = document.getElementById('root')
const modalNode = document.getElementById('modal')
const openModalBtn = rootNode.querySelector('.button-open-modal')


const isCharNum = (item) => {
  return '0123456789'.indexOf(item) !== -1
}


const nameValidate = (str) => {
  const regex = /^[a-zA-Z0-9А-Яа-я]{3,20}/
  return regex.test(str)
}

const phoneValidate = (str) => {
  return str.length === 18
}




const onNameChange = (e) => {
  e.target.classList.remove('error-input')
}

const onPhoneChange = (e) => {
  let resStr ='+7 ('
  e.target.classList.remove('error-input')
  const arrNums = e.target.value.split('').filter(isCharNum).slice(1,11)
  for(let i = 0; i < 10,i < arrNums.length; i++){
    if(i === 3){
      resStr +=  ') ' + arrNums[i]
      continue
    }
    if(i === 6 || i === 8){
      resStr += '-' + arrNums[i]
      continue
    }
    resStr += arrNums[i]
  }
  e.preventDefault()
  e.target.value = resStr
}

const closeModal = () => {
  const btn = modalNode.querySelector('.modal__close-btn')
  btn.removeEventListener('click',closeModal)

  const phoneInput = modalNode.querySelector('#phone')
  phoneInput.removeEventListener('change',onPhoneChange)
  
  const nameInput = modalNode.querySelector('#name')
  nameInput.removeEventListener('input',onNameChange)

  const form = modalNode.querySelector('#form')
  form.removeEventListener('submit',onSubmit)

  modalNode.innerHTML=''
}

const onSubmit = async (e) => {
  e.preventDefault()
  let isValid = true
  const [name,phone,message] = Array.from(e.originalTarget).slice(0,3).map(it => it.value)
  if(!nameValidate(name)){
    const nameInput = modalNode.querySelector('#name')
    nameInput.classList.add('error-input')
    isValid = false
  }
  if(!phoneValidate(phone)){
    const phoneInput = modalNode.querySelector('#phone')
    phoneInput.classList.add('error-input')
    isValid = false
  }

  if(!isValid){
    return
  }

  const resp = await new Promise((res,rej) => {
    setTimeout(() => {
      res(Math.random() < 0.5)
    },1000)
  })

  if(resp){
    closeModal()
    alert(`Успешно!
    ${JSON.stringify({
      phone:'+7'+phone.split('').filter(isCharNum).join(''),
      name,
      message
    })}`)
  }else{
    alert('Произошла ошибка!')
  }
}

const openModal = () => {
  modalNode.innerHTML=`
    <div class="modal__body">
      <div class="modal__container">
        <h1 class="modal__title"><button class="modal__close-btn">X</button></h1>
        <form id="form">
          <p class="modal__input-label">Имя</p>
          <input class="modal__input" id="name" type="text">
          <p class="modal__input-label">Телефон</p>
          <input class="modal__input" id="phone" type="text">
          <p class="modal__input-label">Сообщение</p>
          <textarea class="modal__textarea" name="" id="" cols="30" rows="10"></textarea>
          <button>Отправить</button>
        </form>
      </div>
    </div> 
  `
  const btn = modalNode.querySelector('.modal__close-btn')
  btn.addEventListener('click',closeModal)

  const phoneInput = modalNode.querySelector('#phone')
  phoneInput.addEventListener('input',onPhoneChange)

  const nameInput = modalNode.querySelector('#name')
  nameInput.addEventListener('input',onNameChange)

  const form = modalNode.querySelector('#form')
  form.addEventListener('submit',onSubmit)
}


openModalBtn.addEventListener('click',openModal)