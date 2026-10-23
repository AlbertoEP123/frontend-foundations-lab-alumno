let tasks = [
  { id: '1', title: 'Implementar loading', completed: true },
  { id: '2', title: 'Probar error 500', completed: false }
];

const form = document.querySelector('[data-form]');
const list = document.querySelector('[data-list]');
const status = document.querySelector('[data-status]');

function render() {
  list.replaceChildren();
  for (const task of tasks) {
    const item = document.createElement('li');
    item.className = 'task-item';
    item.dataset.taskId = task.id;
    item.dataset.completed = String(task.completed);
    item.innerHTML = `
      <span class="task-item__title"></span>
      <button type="button" data-action="toggle" aria-label="Cambiar estado de tarea">✓</button>
      <button type="button" data-action="delete" aria-label="Eliminar tarea">×</button>
    `;
    item.querySelector('.task-item__title').textContent = task.title;
    list.append(item);
  }
}

list.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return;

  const button = event.target.closest('[data-action]');
  if (!button || !list.contains(button)) return;

  const item = button.closest('[data-task-id]');
  if (!item) return;

  const taskId = item.dataset.taskId;
  if (button.dataset.action === 'delete') {
    tasks = tasks.filter((task) => task.id !== taskId);
    status.textContent = 'Tarea eliminada.';
  } else if (button.dataset.action === 'toggle') {
    tasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    status.textContent = 'Estado de la tarea actualizado.';
  } else {
    return;
  }

  render();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const titleInput = form.elements.namedItem('title');
  const title = titleInput.value.trim();

  if (title.length < 3) {
    status.textContent = 'La tarea debe tener al menos 3 caracteres.';
    titleInput.focus();
    return;
  }

  tasks = [...tasks, {
    id: crypto.randomUUID(),
    title,
    completed: false
  }];
  titleInput.value = '';
  status.textContent = 'Tarea añadida.';
  render();
});

render();
