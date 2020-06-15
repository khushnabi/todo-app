import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../styles/sidebar.css';

import CreateProject from '../src/project/CreateProject';
import ListRender from './ListRender';
import SortableComponent from './SortableComponent';

const SideBar = (props) => {
	const [ name, setName ] = useState('');

	const [ projects, setProjects ] = useState([]);
	function getData() {
		Axios.get('/projects').then(({ data }) => {
			setProjects(data.data);
		});
	}
	useEffect(() => {
		getData();
	}, []);

	const heandleDelete = (id, slug) => {
		const conform = confirm('your want to delete');

		if (conform == true) {
			Axios.delete(`/projects/${id}`);
			setProjects(projects.filter((project) => project.id !== id));
		}
	};

	const handleAdd = (project) => {
		setProjects([ ...projects, project ]);
	};

	const onUpdate = (data) => {
		getData();
	};

	return (
		<div className="main-sidebar">
			<div className="top">
				<div className="all">All project</div>
				<div className="add">
					<CreateProject onAdd={handleAdd} />
				</div>
			</div>
			<div>
				{projects.map((project) => (
					<div className="lableListItem" key={project.id}>
						<div key={project.id}>
							<ListRender project={project} onUpdate={onUpdate} heandleDelete={heandleDelete} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default SideBar;
