import React, { Component } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";

const SortableItem = SortableElement(({ value }) => (
    <li tabIndex={0}>{value}</li>
));

const SortableList = SortableContainer(({ items }) => {
    return (
        <ul>
            {items.map((value, index) => (
                <SortableItem
                    key={`item-${value}`}
                    index={index}
                    value={value}
                />
            ))}
        </ul>
    );
});

class SortableComponent extends Component {
    state = {
        items: this.props.list
    };
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ items }) => ({
            items: arrayMove(items, oldIndex, newIndex)
        }));
    };
    render() {
        return (
            <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
        );
    }
}

export default SortableComponent;
