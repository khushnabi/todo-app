import React, { useState } from 'react';
import Axios from 'axios';
import slugify from 'slugify';
import styled from 'styled-components';
import BtnAdd from '../ui/BtnAdd';

const CreateProject = (props) => {
	const [ isAdding, setIsAdding ] = useState(false);
	const [ name, setName ] = useState('');
	const handleSave = (e) => {
		e.preventDefault();
		Axios.post('/projects', {
			name,
			slug: slugify(name, { lower: true })
		}).then(({ data }) => {
			props.onAdd(data);
			setName('');
			setIsAdding(false);
		});
	};
	const setAdding = () => {
		setIsAdding(!isAdding);
	};

	return (
		<div>
			{isAdding && (
				<div className="sidebar-form">
					<form onSubmit={handleSave}>
						<input
							className="createProjectInput"
							placeholder="Task name"
							onChange={(e) => setName(e.target.value)}
							value={name}
						/>
						<i className="fa fa-check" type="submit" onClick={handleSave} aria-hidden="true" />
					</form>
				</div>
			)}
			<BtnAdd isAdding={isAdding} setIsAdding={setAdding}>
				<i className="fa fa-plus" aria-hidden="true" />
			</BtnAdd>
		</div>
	);
};

export default CreateProject;
