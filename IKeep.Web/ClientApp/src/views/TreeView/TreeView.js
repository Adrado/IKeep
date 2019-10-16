import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Treebeard} from 'react-treebeard'



let TreeView = props =>
{
    //const classes = useStyles();
    const {Data, onToggle} = props;
    
    return(
        <Treebeard
            data = {Data}
            onToggle = {onToggle}
        />
    );
}

export default TreeView;

/* class TreeExample extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = this.props.Data;
        this.Data = this.props.Data;
        this.onToggle = this.onToggle.bind(this);
        console.log(this.props)
    }
    
    
    render()
    {
        //const {data} = this.state;
        return (
            <Treebeard
                data={this.Data}
                onToggle={this.onToggle} 
            />
        );
    }
}
export default TreeExample; */
/* const content = document.getElementById('content');
ReactDOM.render(<TreeExample/>, content); */
//https://github.com/storybookjs/react-treebeard