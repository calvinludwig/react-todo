import {CheckCircle, Circle, Trash} from 'phosphor-react';

interface TaskProps {
	id: string
	text: string
	done: boolean
	// eslint-disable-next-line no-unused-vars
	onDeleteTask: (id: string) => void
	// eslint-disable-next-line no-unused-vars
	onDoneTask: (id: string) => void
}

export default function Task({id, text, done, onDeleteTask, onDoneTask}:TaskProps) {
	function handleDoneClick() {
		onDoneTask(id);
	}

	function handleDeleteClick() {
		onDeleteTask(id);
	}

	return (
		<li
			className={
				String('flex w-full items-center gap-4 bg-zinc-800 p-4 rounded-lg border border-zinc-500 shadow-md ')
				+ String(done ? 'opacity-70' : '')}>
			<div className='cursor-pointer'>
				<Done isDone={done} onClick={handleDoneClick}/>
			</div>
			<div className='flex-1'>
				<span className={String(done ? 'line-through text-zinc-500' : '')}>{text}</span>
			</div>
			<button onClick={handleDeleteClick}><Trash /></button>
		</li>
	);
}

interface DoneProps {
	isDone: boolean
	onClick: () => void
}

function Done({isDone, onClick}: DoneProps) {
	if (isDone) {
		return <CheckCircle size={28} weight={'fill'} className='text-indigo-400' onClick={onClick}/>;
	}

	return <Circle size={28} weight={'regular'} className='text-sky-300' onClick={onClick}/>;
}
