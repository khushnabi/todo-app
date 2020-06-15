import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import slugify from 'slugify';
import moment from 'moment';
import '../styles/childList.css';
import { SortableHandle } from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => <span style={{ cursor: 'move' }} className="fa fa-arrows-alt" />);

function ChildListRender(props) {
	const task = props.task;
	const id = task.id;
	const [ animaiton, setAnimation ] = useState(false);
	const [ edit, isEditing ] = useState(false);
	const [ name, setName ] = useState('');
	const [ projects, setProjects ] = useState([]);
	const [ isLabel, setIsLabel ] = useState(false);
	const [ label, setLable ] = useState('');
	const [ taskLable, setTaskLable ] = useState([]);

	useEffect(
		() => {
			setAnimation(props.animaiton);
			setTaskLable(task.labels);
		},
		[ props.project ]
	);
	const handleEdit = (id) => {
		isEditing(true);
		setName(task.title);
	};
	const handleEditSave = (e) => {
		e.preventDefault();
		Axios.put(`/projects/${props.project.slug}/tasks/${id}`, {
			...task,
			title: name,
			updated_at: props.project.created_at == props.project.updated_at ? new Date() : props.project.updated_at,
			completed: false
		}).then(({ data }) => {
			props.taskUpdate(data);
			isEditing(false);
			setName('');
		});
	};

	const handleDelete = () => {
		console.log(id);
		Axios.delete(`/projects/${props.project.slug}/tasks/${id}`).then(() => {
			props.onDelete(task);
		});
	};

	function handleCompleted(completed) {
		// setName(props.task.title);
		Axios.put(`/projects/${props.project.slug}/tasks/${id}`, {
			...task,
			completed_at: new Date(),
			completed: !completed
		}).then(({ data }) => {
			props.taskCompleted(data);
		});
	}
	function cancelEdit() {
		isEditing(false);
		setName(task.title);
	}

	const addLabel = () => {
		setIsLabel(true);
	};

	const labelSubmit = (e) => {
		Axios.post(`/projects/${props.project.slug}/tasks/${id}/labels`, {
			task_id: id,
			label: label
		}).then(({ data }) => {
			labelAdding(data);
			setLable('');
			setIsLabel(false);
		});
		e.preventDefault();
	};

	const labelAdding = (addLabel) => {
		console.log(taskLable);
		taskLable.push(addLabel);
		setTaskLable(taskLable);
	};

	const closeLabel = () => {
		setIsLabel(false);
	};
	const deleteLabel = (id) => {
		Axios.delete(`/projects/${props.project.slug}/tasks/${id}/labels/${id}`).then(() => {
			setTaskLable(taskLable.filter((item) => item.id !== id));
		});
	};
	const timeText =
		props.task.updated_at == props.task.created_at
			? ` Created : ${moment(props.task.created_at).fromNow()}`
			: ` Updated : ${moment(props.task.updated_at).fromNow()}`;
	const animationClass = animaiton ? 'animation' : null;
	return (
		<div>
			<div className={'card-view  ' + animationClass}>
				{edit ? (
					<div className="edit-section">
						<form onSubmit={handleEditSave}>
							<input
								className="updateTask"
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>

							<span className="fa fa-close" onClick={() => cancelEdit()} />
							<span className="fa fa-check" type="submit" onClick={handleEditSave} />
						</form>
					</div>
				) : task.completed ? (
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between'
						}}
					>
						<div>
							<h3 className="completed">{task.title}</h3>{' '}
							<p>completed: {moment(task.completed_at).fromNow()}</p>
							<ul className="icon-list">
								<li>
									{' '}
									<input
										className="checkbox"
										type="checkbox"
										checked={!!task.completed}
										onChange={() => handleCompleted(task.completed)}
									/>
								</li>
								<li>
									<a onClick={handleDelete}>
										<span className="fa fa-trash" />
									</a>
								</li>
							</ul>
						</div>
						<div className="drag">
							<DragHandle />
						</div>
					</div>
				) : (
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between'
						}}
					>
						<div>
							<h4 className="title">{task.title}</h4>
							<p>{timeText}</p>
							<ul className="icon-list">
								{!isLabel ? (
									<li>
										<a href="#" onClick={addLabel}>
											<span className="fa fa-plus" />
										</a>
									</li>
								) : (
									<li class="label-form">
										<form onSubmit={labelSubmit}>
											<input
												value={label}
												className="addLable"
												type="text"
												placeholder="add lable"
												onChange={(e) => setLable(e.target.value)}
											/>
											<span onClick={labelSubmit} type="submit" className="fa fa-check" />
											<span onClick={closeLabel} className="fa fa-close" />
										</form>
									</li>
								)}
								<li>
									<a>
										<input
											className="checkbox"
											type="checkbox"
											checked={!!task.completed}
											onChange={() => handleCompleted(task.completed)}
										/>
									</a>
								</li>
								<li>
									<a>
										<span className="fa fa-pencil" onClick={() => handleEdit()} />
									</a>
								</li>
								<li>
									<a onClick={handleDelete}>
										<span className="fa fa-trash" />
									</a>
								</li>
							</ul>
							{taskLable && taskLable.length > 0 && <hr />}

							{taskLable && (
								<ul className="label-wraper">
									{taskLable.map((item) => (
										<li className="lable" key={item.id}>
											{item.label}
											{' ' + ''}
											<span onClick={() => deleteLabel(item.id)} className="fa fa-close" />
										</li>
									))}
								</ul>
							)}
						</div>

						<div className="drag">
							<DragHandle />
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default ChildListRender;
