import React, { useState } from "react";
import Axios from "axios";
import slugify from "slugify";
import styled from "styled-components";

const BtnAdd = styled.a`
    --size: 30px;
    display: inline-block;
    height: var(--size);
    width: var(--size);
    line-height: var(--size);
    text-align: center;
    :hover {
        background-color: rgba(0, 0, 0, 0.3);
    }
    border-radius: 50%;
    transform: rotate(${(props) => (props.active ? "45" : 0)}deg);
    transition: transform 0.3s;
`;

const CreateProject = (props) => {
    const [isAdding, setIsAdding] = useState(false);
    const [name, setName] = useState("");
    const handleSave = (e) => {
        e.preventDefault();
        Axios.post("/projects", {
            name,
            slug: slugify(name, { lower: true }),
        }).then(({ data }) => {
            props.onAdd(data);
            setName("");
            setIsAdding(false);
        });
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
                        <i
                            className="fa fa-check"
                            type="submit"
                            onClick={handleSave}
                            aria-hidden="true"
                        />
                    </form>
                </div>
            )}
            <BtnAdd active={isAdding} onClick={() => setIsAdding(!isAdding)}>
                <i className="fa fa-plus" aria-hidden="true" />
            </BtnAdd>
        </div>
    );
};

export default CreateProject;
