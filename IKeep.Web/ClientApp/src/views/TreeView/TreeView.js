import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Treebeard} from 'react-treebeard';

const data = {
    name: 'root',
    toggled: true,
    children: [
        {
            name: 'parent',
            children: [
                { name: 'child1' },
                { name: 'child2' }
            ]
        },
        {
            name: 'loading parent',
            loading: true,
            children: []
        },
        {
            name: 'parent',
            children: [
                {
                    name: 'nested parent',
                    children: [
                        { name: 'nested child 1' },
                        { name: 'nested child 2' }
                    ]
                }
            ]
        }
    ]
};

class TreeExample extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = this.props.Data;
        this.Data = this.props.Data;
        this.onToggle = this.onToggle.bind(this);
        console.log(this.props)
    }
    
    onToggle(node, toggled){
        const {cursor, data} = this.state;
        if (cursor) {
            this.setState(() => ({cursor, active: false}));
        }
        node.active = true;
        if (node.children) { 
            node.toggled = toggled; 
        }
        this.setState(() => ({cursor: node, data: Object.assign({}, data)}));
    }
    
    render()
    {
        //const {data} = this.state;
        return (
            <Treebeard
                data={this.Data}
                /* onToggle={this.onToggle} */
            />
        );
    }
}
export default TreeExample;
/* const content = document.getElementById('content');
ReactDOM.render(<TreeExample/>, content); */
//https://github.com/storybookjs/react-treebeard