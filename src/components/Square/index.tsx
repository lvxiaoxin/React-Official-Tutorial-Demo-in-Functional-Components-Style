import React from 'react';

interface Props {
    value: string;
    onClick: () => void;
}

// Square is called a controlled component. --> since all its rendering value and event handlers are controlled by its parent level component.
const Square = (props: Props) => {
    return (
        <button className="square" onClick={() => props.onClick()}>{props.value}</button>
    );
};

export default Square;
