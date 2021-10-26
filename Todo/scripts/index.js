document.addEventListener('DOMContentLoaded', function () {
  
  // проверяем нет ли никаких дел, оставшихся с прошлого дня
  if(localStorage.getItem('nextDayItem')!=null 
    && JSON.parse(localStorage.getItem('DateCompletionTask'))!=new Date().toLocaleDateString()){
      localStorage.setItem('todayList', localStorage.getItem('nextDayItem'))
      localStorage.removeItem('nextDayItem')
      localStorage.setItem( 'DateCompletionTask', JSON.stringify(new Date().toLocaleDateString()))
    }

    const $array = OutElementsOfLoad()
// Если сегодня выполнены дела - all done!
  if(JSON.parse(localStorage.getItem('DateCompletionTask'))===new Date().toLocaleDateString() &&
    localStorage.getItem('todayList')===null){
      GetPicture('pictures/Done.svg' , 'All done!' , 'Have a party or go for a walk!')
  }
  // Если дела выполнены не сегодня и дел нет - whats next
  else if(JSON.parse(localStorage.getItem('DateCompletionTask'))!=new Date().toLocaleDateString() &&
  localStorage.getItem('todayList')===null){
    let data = new Date()
    let nowData = data.getDay()
    GetPicture('pictures/' + nowData + '.svg', 'What’s up!', 'What do you want to do today?')
  }
  // остался последний вариант - когда дела все же есть
  else {
    document.querySelector('.picture').setAttribute('style', 'display: none')
    tasksToDO() // выводим сколько задач осталось на сегодня
    $array.forEach(element =>{ // вывод элементов на экран
    AddContainerToDo(element)
    })
  }

// при нажатии на кнопку enter в веденном поле whats next появляется задача
    const $input = document.querySelector('.textWhatsNext')
    $input.addEventListener('keydown', function (e) {
    if(e.keyCode===13 && document.querySelector('.textWhatsNext').value != ''){
      const whatsnext = document.querySelector('.textWhatsNext') // document.querySelector('.textWhatsNext') это this 
      let array = OutElementsOfLoad()
      array.push({text:whatsnext.value, done:0}) // добавляем в массив 
      localStorage.setItem ('todayList', JSON.stringify(array))
      AddContainerToDo(array[array.length-1])
      this.value = ""
      tasksToDO()
      document.querySelector('.gauge').setAttribute('style', '')
      document.querySelector('.tasksToDo').setAttribute('style', '')
      document.querySelector('.picture').setAttribute('style', 'display: none')
    }
  })

  // кнопка для переноса дел на новый день
  const buttonNewDay = document.querySelector('.buttonNewDay')
  buttonNewDay.addEventListener('click', function(e) {
    if (localStorage.getItem('todayList')!=null)
    {
      localStorage.setItem('nextDayItem', localStorage.getItem('todayList'))
      let array = OutElementsOfLoad()
      array.forEach( e => {
        let deleteElementCheck = document.querySelector('.elementCheckBox')
        deleteElementCheck.remove()
      })
      localStorage.removeItem('todayList')
      GetPicture('pictures/Done.svg' , 'All done!' , 'Have a party or go for a walk!')
    }
  })

 
})// конец dom 
 

// функция отрисовки элементов
function AddContainerToDo(text){

    let elementCheckBox = document.createElement('div')
    elementCheckBox.className = 'elementCheckBox'
    
    let divcheckbox = document.createElement('div')
    divcheckbox.className = 'checkbox'

    let divtext = document.createElement('div')
    divtext.className = 'text'
    divtext.innerText = text.text

    let divdel = document.createElement('div')
    divdel.className = 'del'
    
    if(text.done === 1)
    {
      divtext.style.textDecoration = "line-through"
      divtext.style.color = '#A5A5A5'
      divcheckbox.style.backgroundRepeat = 'no-repeat' 
      divcheckbox.style.backgroundPosition = 'center'
      divcheckbox.style.backgroundImage = 'url("data:image/svg+xml;charset=UTF-8,%3csvg width=\'16\' height=\'16\' viewBox=\'0 0 16 16\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3cpath fill-rule=\'evenodd\' clip-rule=\'evenodd\' d=\'M5.91006 10.4959L3.7071 8.29291C3.31658 7.90239 2.68342 7.90239 2.29289 8.29291C1.90237 8.68343 1.90237 9.3166 2.29289 9.70712L5.29288 12.7071C5.7168 13.131 6.4159 13.0892 6.7863 12.6178L13.7863 4.61786C14.1275 4.18359 14.0521 3.55494 13.6178 3.21372C13.1835 2.87251 12.5549 2.94795 12.2136 3.38222L5.91006 10.4959Z\' fill=\'%23364FFB\'/%3e%3c/svg%3e ")'
    }

    let containerECheckBox = document.querySelector('.blockWhatsNext')
    containerECheckBox.before(elementCheckBox)
    elementCheckBox.prepend(divdel)
    elementCheckBox.prepend(divtext)
    elementCheckBox.prepend(divcheckbox)

   
    divcheckbox.addEventListener('click', function(e){
      CompleteElements(this)
      e.stopPropagation()
    })

    divdel.addEventListener('click', function(e){
      DeleteElements(this)
      e.stopPropagation()
    })
}




// функция передает значение массива
function OutElementsOfLoad(){
  const listAsStr = localStorage.getItem('todayList')
  if (listAsStr) {
    return JSON.parse(listAsStr)
  } else {
    return []
  }
}

// Функция выводит сколько дел осталось
function tasksToDO()
{
  let aray = OutElementsOfLoad()
  const whatsTasksForToday = document.querySelector('.tasksToDo')
  let Done = 0
  let DontDone = 0
  aray.forEach(e => {
    if(e.done===0) Done +=1
    else DontDone +=1
  })
  whatsTasksForToday.innerText = Done + " tasks to do"
  let persent = DontDone / aray.length * 100
  const $gauge = document.querySelector('.gauge')
  setGaugePercent($gauge, Math.round(persent))
}

/* Удалить элемент */
function DeleteElements (elements){
  let task = elements.parentNode
  let text1 = task.querySelector('.text').innerHTML
  task.parentNode.removeChild(task)
  let aray = OutElementsOfLoad()
  aray.splice(aray.indexOf(aray.find(task => task.text === text1)), 1)
  localStorage.setItem('todayList', JSON.stringify(aray))
  tasksToDO()
  FindEndCase()
}

/* клик на чекбокс */
function CompleteElements(element){
  let aray = OutElementsOfLoad()
  let task = element.parentNode
  let text = task.querySelector('.text')
  let checkbox = task.querySelector('.checkbox')
 let t = aray.find(task => task.text === text.innerHTML)
  if (t.done === 0){
    text.style.color = '#A5A5A5'
    text.style.textDecoration = "line-through"
    checkbox.style.backgroundRepeat = 'no-repeat' 
    checkbox.style.backgroundPosition = 'center'
    checkbox.style.backgroundImage = 'url("data:image/svg+xml;charset=UTF-8,%3csvg width=\'16\' height=\'16\' viewBox=\'0 0 16 16\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3cpath fill-rule=\'evenodd\' clip-rule=\'evenodd\' d=\'M5.91006 10.4959L3.7071 8.29291C3.31658 7.90239 2.68342 7.90239 2.29289 8.29291C1.90237 8.68343 1.90237 9.3166 2.29289 9.70712L5.29288 12.7071C5.7168 13.131 6.4159 13.0892 6.7863 12.6178L13.7863 4.61786C14.1275 4.18359 14.0521 3.55494 13.6178 3.21372C13.1835 2.87251 12.5549 2.94795 12.2136 3.38222L5.91006 10.4959Z\' fill=\'%23364FFB\'/%3e%3c/svg%3e ")'
    t.done = 1
    localStorage.setItem('todayList', JSON.stringify(aray))
    tasksToDO()
  }
  else {
    text.setAttribute('style', '')
    checkbox.setAttribute('style', '')
    t.done = 0
    localStorage.setItem('todayList', JSON.stringify(aray))
    tasksToDO()
  }
  FindEndCase()
}


/* функция убирает все лишние блоки и выводит картинку */
function GetPicture (picture, header1, header2){
  let data = new Date()
    let nowData = data.getDay()
    document.querySelector('.picture').setAttribute('style', '')
    document.querySelector('.gauge').setAttribute('style', 'display: none')
    document.querySelector('.tasksToDo').setAttribute('style', 'display: none')
    document.querySelector('object').setAttribute('data', picture)
    document.querySelector('.text1InPicture').innerHTML = header1
    document.querySelector('.text2InPicture').innerHTML = header2
}

// Проверяет окончание всех дел
function FindEndCase(){
  let aray = OutElementsOfLoad()
  let Done = 0
  if (aray != [])
  {
    aray.forEach(e => 
    {
      if(e.done===1) Done +=1
    })
    if(Done === aray.length)
    {
    GetPicture('pictures/Done.svg' , 'All done!' , 'Have a party or go for a walk!')
    
    aray.forEach( e => {
      let deleteElementCheck = document.querySelector('.elementCheckBox')
      deleteElementCheck.remove()
    })
    localStorage.removeItem('todayList')
    localStorage.setItem( 'DateCompletionTask', JSON.stringify(new Date().toLocaleDateString()))
    }
  }
}