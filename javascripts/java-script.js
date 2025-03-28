document.addEventListener('DOMContentLoaded', () => {

  const elements = [
    { main: '.seno', belp: '.belp1', target: '#soloma', image: "url('../images/rozp.svg')", color: '#F80CB5' },
    { main: '.kamen', belp: '.belp2', target: '#stone', image: "url('../images/rozp.svg')", color: '#F80CB5' },
    { main: '.vetochki', belp: '.belp3', target: '#vetky', image: "url('../images/rozp.svg')", color: '#F80CB5' },
    { main: '.kirpich', belp: '.belp4', target: '#kirpich2', image: "url('../images/rozp.svg')", color: '#F80CB5' },
    { main: '.vimya', belp: '.belp5', target: '#vimya2', image: "url('../images/rozp.svg')", color: '#F80CB5' },
    { main: '.zhelezo', belp: '.belp6', target: '#iron', image: "url('../images/rozp.svg')", color: '#F80CB5' }
  ];

  elements.forEach(({ main, belp, target, image, color }) => {
    const mainElement = document.querySelector(main);
    const belpElement = document.querySelector(belp);
    const targetElement = document.querySelector(target);

    function changeImage() {
      belpElement.style.backgroundImage = image;
      targetElement.style.backgroundColor = color;
      targetElement.style.border = 'none';
    }

    function checkIfBothClicked() {
      if (mainElement.classList.contains('clicked') && targetElement.classList.contains('clicked')) {
        changeImage();
      }
    }

    mainElement.addEventListener('click', function() {
      mainElement.classList.add('clicked');
      checkIfBothClicked();
    });

    targetElement.addEventListener('click', function() {
      targetElement.classList.add('clicked');
      checkIfBothClicked();
    });
  });

  const furnitureElements = document.querySelectorAll('.furniture > div');
  let rotation = 0;  // Переменная для хранения текущего угла поворота

  furnitureElements.forEach((element) => {
    element.setAttribute('draggable', true);  // Устанавливаем атрибут draggable для перетаскивания

    element.addEventListener('dragstart', function (e) {
      e.dataTransfer.setData('text', element.className);  // Используем className элемента для его идентификации
      element.style.opacity = 0.8;  // Уменьшаем прозрачность элемента
    });

    element.addEventListener('dragend', function () {
      element.style.opacity = 1;      // Восстанавливаем прозрачность после завершения перетаскивания
    });


    element.addEventListener('dblclick', function () {  
      rotation += 30;      // Увеличиваем угол на 30 градусов при каждом двойном клике
      element.style.transform = `rotate(${rotation}deg)`;  // Применяем поворот
    });
  });

  const furnitureArea = document.querySelector('.section_2');  // Элементы, куда можно перетаскивать

  furnitureArea.addEventListener('dragover', function (e) {
    e.preventDefault();  // Необходимо для того, чтобы разрешить перетаскивание
  });

  furnitureArea.addEventListener('drop', function (e) {
    e.preventDefault();  // Останавливаем стандартное поведение браузера

    const draggedClass = e.dataTransfer.getData('text');  // Получаем данные перетаскиваемого элемента
    const draggedElement = document.querySelector(`.${draggedClass}`);  // Находим элемент по классу

    furnitureArea.appendChild(draggedElement);    // Перемещаем элемент в новое место

    draggedElement.style.position = 'absolute'; // Дополнительно можно изменить стиль или класс элемента
    draggedElement.style.left = `${e.pageX - draggedElement.offsetWidth / 2}px`;
    draggedElement.style.top = `${e.pageY - draggedElement.offsetHeight / 2}px`;
  });
});
