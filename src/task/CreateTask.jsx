import React, { useState } from "react";
import Button from "../ui/Button";
import Axios from "axios";

export default function CreateTask(props) {
    const [pending, setPending] = useState(false);
    const [task, setTask] = useState("");
    const [err, setErr] = useState(false);
    const handleSave = (e) => {
        e.preventDefault();
        if (task) {
            props.toggleAnimation(true);
            setErr(false);
            console.log(props.project.id);
            setPending(true);
            Axios.post(`/projects/${props.project.id}/tasks`, {
                title: task,
                project_id: props.project.id,
                created_at: new Date(),
                completed: false,
                index: props.index.length + 1,
            }).then(({ data: task }) => {
                setTask("");
                setPending(false);
                props.onAdd(task);
            });
        } else {
            setErr(true);
        }
    };

    const handleCancel = () => {
        setTask("");
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
                <Button type="submit" isLoading={pending}>
                    Create
                </Button>
            </form>
            <button className="cancel" onClick={handleCancel}>
                Cancel
            </button>
        </div>
    );
}
