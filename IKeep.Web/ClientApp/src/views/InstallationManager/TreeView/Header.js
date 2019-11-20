import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
//import {Div} from 'react-treebeard'
//import {Div} from '../src/components/common';
import Icon from '@material-ui/core/Icon';
const Div = styled('div', {
    shouldForwardProp: prop => ['className', 'children'].indexOf(prop) !== -1
})((({style}) => style));

// Example: Customising The Header Decorator To Include Icons
const Header = ({onSelect, style, customStyles, node}) => {
    console.log(node)
    let iconType;
    if(node.id !== null)
    {
        switch (node.type)
        {
            case 'InstallationProxy':
                iconType = 'city';
            break;
            case 'BuildingProxy':
                iconType = 'building';
            break;
            case 'FloorProxy':
                iconType = 'kaaba';
            break;
            case 'AreaProxy':
                iconType = 'solar-panel';
            break;
            case 'Mango':
            case 'Papaya':
            console.log('El kilogramo de Mangos y Papayas cuesta $2.79.');
            break;
        }
    }
    else{
        iconType = 'plus'
    }
    

    //iconType = node.children ? 'folder' : 'file-text';
    //const iconType = 'file-text';
    const iconClass = `fa fa-${iconType}`;

    const iconStyle = {marginRight: '5px'};

    return (
        <div style={style.base} onClick={onSelect}>
            <Div style={node.selected ? {...style.title, ...customStyles.header.title} : style.title}>
                <i className={iconClass} style={iconStyle}/>
                {node.name}
            </Div>
        </div>
    );
};

Header.propTypes = {
    onSelect: PropTypes.func,
    node: PropTypes.object,
    style: PropTypes.object,
    customStyles: PropTypes.object
};

Header.defaultProps = {
    customStyles: {}
};

export default Header;
