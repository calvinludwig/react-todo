import logo from './assets/logo.svg';
import {ClipboardText, PlusCircle} from 'phosphor-react';
import {ChangeEvent, FormEvent, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import Task from './components/Task';

function App() {
	interface Task {
		id: string
		text: string
		done: boolean
	}
	const [tasks, setTasks] = useState<Task[]>([]);
	const [newTaskText, setNewTaskText] = useState<string>('');

	function hanbleNewTaskSubmit(event: FormEvent) {
		event.preventDefault();
		const newTask: Task = {
			id: uuidv4(),
			text: newTaskText,
			done: false,
		};
		setTasks(state => [newTask, ...state]);
		setNewTaskText('');
	}

	function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
		setNewTaskText(event.target.value);
	}

	function deleteTask(id: string) {
		setTasks(state => state.filter(task => task.id !== id));
	}

	function doneTask(id: string) {
		setTasks(tasks.map(task => {
			if (task.id === id) {
				task.done = !task.done;
			}

			return task;
		}));
	}

	const tasksDone = tasks.reduce((sum, task) => {
		if (task.done) {
			return sum + 1;
		}

		return sum;
	}, 0);

	return (
		<>
			<div className='z-0 bg-black h-48 relative flex items-center justify-center'>
				<img src={logo} alt='' srcSet='' />
			</div>
			<main className='max-w-3xl px-4'>
				<form onSubmit={hanbleNewTaskSubmit} className='flex gap-2'>
					<input
						value={newTaskText}
						onChange={handleNewTaskChange}
						className='z-10 rounded-lg border border-black bg-zinc-800
						 text-zinc-100 p-3 flex-1 focus:outline focus:outline-2
						 focus:outline-sky-700'
						type='text'
						placeholder='Adicione uma nova tarefa'
					/>
					<button
						disabled={newTaskText.length === 0}
						type='submit'
						className='font-bold text-md flex gap-1 justify-center z-10 p-3 rounded-lg text-zinc-100
						bg-sky-700 hover:bg-sky-600 active:bg-sky-800
						disabled:bg-zinc-500 disabled:cursor-not-allowed'
					>Criar<PlusCircle size={24} /></button>
				</form>
				<div className='mt-10 mb-4 flex items-center justify-between'>
					<div>
						<strong className='text-sky-300 text-sm'>Tarefas criadas
						</strong>
						<span className='bg-zinc-700 m-2 p-1 px-2 text-xs rounded-full'>{tasks.length}</span>
					</div>

					<div>
						<strong className='text-indigo-400 text-sm'>Concluídas
						</strong>
						<span className='bg-zinc-700 m-2 p-1 px-2 text-xs rounded-full'>
							{tasksDone} de {tasks.length}
						</span>
					</div>
				</div>
				{tasks.length === 0 && (
					<div className='border-t border-zinc-700 rounded-lg h-44 flex flex-col items-center justify-center'>
						<ClipboardText size={60} weight={'thin'} className='text-zinc-700'/>
						<p className='text-zinc-600 font-bold'>Você ainda não tem tarefas cadastradas</p>
						<p className='text-zinc-700'>Crie tarefas e organize seus itens a fazer</p>
					</div>
				)}
				<div>
					<ul className='flex flex-col gap-y-4'>
						{
							tasks.map(task => (
								<Task
									key={task.id}
									id={task.id}
									text={task.text}
									done={task.done}
									onDeleteTask={deleteTask}
									onDoneTask={doneTask}
								/>
							))
						}
					</ul>
				</div>
			</main>
		</>
	);
}

export default App;
