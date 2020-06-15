import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import ChildListRender from './ChildListRender';
import { Button } from '../src/ui';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import '../styles/childList.css';

const CreateTask = (props) => {
	const [ task, setTask ] = useState('');
	const [ err, setErr ] = useState(false);
	const handleSave = (e) => {
		e.preventDefault();
		if (task) {
			props.toggleAnimation(true);
			setErr(false);
			console.log(props.project.id);
			Axios.post(`/projects/${props.project.id}/tasks`, {
				title: task,
				project_id: props.project.id,
				created_at: new Date(),
				completed: false,
				index: props.index.length + 1
			}).then(({ data: task }) => {
				setTask('');
				props.onAdd(task);
			});
		} else {
			setErr(true);
		}
	};

	const handleCancel = () => {
		setTask('');
		setErr(false);
	};
	return (
		<div>
			<form onSubmit={handleSave}>
				{err && <p className="err">** Please fill the taks **</p>}
				<input
					placeholder="Create Task"
					className="create-task"
					value={task}
					onChange={(e) => setTask(e.target.value)}
				/>
				<button className="submit" type="submit">
					Create
				</button>
			</form>
			<button className="cancel" onClick={handleCancel}>
				Cancel
			</button>
		</div>
	);
};

const TaskItem = SortableElement(({ value: task, handleUpdate, handleDelete, taskCompleted, animaiton, project }) => {
	return (
		<ChildListRender
			key={task.id}
			task={task}
			onDelete={handleDelete}
			taskUpdate={handleUpdate}
			taskCompleted={taskCompleted}
			animaiton={animaiton}
			project={project}
		/>
	);
});

const TaskList = SortableContainer(({ items, handleUpdate, handleDelete, taskCompleted, animaiton, project }) => {
	return (
		<div>
			{items.map((task, i) => (
				<TaskItem
					index={i}
					key={task.id}
					handleUpdate={handleUpdate}
					handleDelete={handleDelete}
					taskCompleted={taskCompleted}
					value={task}
					animaiton={animaiton}
					project={project}
				/>
			))}
		</div>
	);
});

function Content(props) {
	const id = props.match.params.project;
	const [ project, setProject ] = useState(null);
	const [ tasks, setTasks ] = useState([]);
	const [ animaiton, setAnimation ] = useState(false);

	const toggleAnimation = (prop) => {
		setAnimation(prop);
	};
	const getTastData = () => {
		console.log(props.match.params);
		Axios.get('/projects/' + id).then(({ data }) => {
			if (data) {
				console.log(data.tasks);
				setProject(data);
				setTasks(data.tasks);
				// console.log('Projects' + project);
				// return data;
			}
			return null;
		});
	};
	const handleUpdate = (task) => {
		setTasks(tasks.map((p) => (task.id == p.id ? { ...p, ...task } : p)));
	};

	const taskCompleted = (completedTask) => {
		setTasks(tasks.map((task) => (task.id == completedTask.id ? { ...task, ...completedTask } : task)));
		console.log(tasks);
	};

	useEffect(
		() => {
			setProject(null);
			getTastData(id);
		},
		[ id ]
	);
	console.log(id);
	if (!project) {
		return <div>Loading...</div>;
	}

	const handleDelete = (task) => {
		const conform = confirm('sure, you want to delete');

		if (conform === true) {
			setTasks(tasks.filter((t) => t.id !== task.id));
		}
	};

	const handleDrag = ({ oldIndex, newIndex }) => {
		console.log('moving', { oldIndex, newIndex });
		const newTasks = arrayMove(tasks, oldIndex, newIndex);
		setTasks(newTasks);
		// Axios.post(`tasks/sort`, newTasks.map((i) => i.id));
	};

	return (
		<div>
			<h4 className="content_name">Project Name : {project.name}</h4>
			<hr />
			<CreateTask
				toggleAnimation={toggleAnimation}
				index={tasks}
				project={project}
				onAdd={(task) => setTasks([ task, ...tasks ])}
			/>
			<hr />

			<div>
				<TaskList
					onSortEnd={handleDrag}
					useDragHandle
					handleDelete={handleDelete}
					handleUpdate={handleUpdate}
					taskCompleted={taskCompleted}
					items={tasks}
					project={project}
					animaiton={animaiton}
				/>
			</div>
		</div>
	);
}

export default Content;
