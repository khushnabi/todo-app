import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import slugify from 'slugify';
import '../styles/sidebar.css';

function ListRender(props) {
	const id = props.project.id;
	const [ edit, isEditing ] = useState(false);
	const [ name, setName ] = useState('');

	const handleEdit = (id) => {
		setName(props.project.name);
		isEditing(true);
	};
	const handleEditSave = (e) => {
		e.preventDefault();
		Axios.put('/projects/' + id, {
			name,
			slug: slugify(name, { lower: true })
		}).then((data) => {
			props.onUpdate(data);
			isEditing(false);
			setName('');
		});
	};

	function cancelEdit() {
		isEditing(false);
		setName('');
	}

	return (
		<div>
			{edit ? (
				<form onSubmit={handleEditSave}>
					<input
						className="createProjectInput"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<span className="fa fa-check" type="submit" onClick={handleEditSave} />
					<span className="fa fa-close" onClick={() => cancelEdit()} />
				</form>
			) : (
				<div className="project">
					<Link className="project-name" to={`/${props.project.slug}`}>
						{props.project.name}
					</Link>
					<span className="sidebar-icon">
						<i className="fa fa-close" onClick={() => props.heandleDelete(id, props.project.slug)} />
						<i className="fa fa-pencil" onClick={handleEdit} />
					</span>
				</div>
			)}
		</div>
	);
}

export default ListRender;
