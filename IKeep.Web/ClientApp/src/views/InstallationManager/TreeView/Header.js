import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Div = styled('div', {
    shouldForwardProp: prop => ['className', 'children'].indexOf(prop) !== -1
})((({style}) => style));

// Example: Customising The Header Decorator To Include Icons
const Header = ({onSelect, style, customStyles, node}) => {
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
