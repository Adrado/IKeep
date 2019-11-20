import React from 'react';
import {Treebeard, decorators} from 'react-treebeard'
import useHandleTree from './useHandleTree'
import Header from './Header'

import PropTypes from 'prop-types';

const Tree = ({treeData = {}}) =>
{
    const {data, onToggle} = useHandleTree(treeData)
    const treeStyle = _default;
    return(
        <Treebeard
            style={treeStyle}
            data = {data}
            onToggle = {onToggle}
            decorators = {{...decorators, Header}}
        />
    );
} 

export default Tree;

Tree.propTypes = 
  {
  treeData: PropTypes.object.isRequired,
}

var _default = {
    tree: {
      base: {
        listStyle: 'none',
        backgroundColor: '#fffffff', //#21252B //#fffffff
        margin: 0,
        padding: 0,
        color: '#9DA5AB',
        fontFamily: 'lucida grande ,tahoma,verdana,arial,sans-serif',
        fontSize: '14px'
      },
      node: {
        base: {
          position: 'relative'
        },
        link: {
          cursor: 'pointer',
          position: 'relative',
          padding: '0px 5px',
          display: 'block'
        },
        activeLink: {
          background: '#ffffff'
        },
        toggle: {
          base: {
            position: 'relative',
            display: 'inline-block',
            verticalAlign: 'top',
            marginLeft: '-5px',
            height: '24px',
            width: '24px'
          },
          wrapper: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            margin: '-7px 0 0 -7px',
            height: '14px'
          },
          height: 14,
          width: 14,
          arrow: {
            fill: '#9DA5AB',
            strokeWidth: 0
          }
        },
        header: {
          base: {
            display: 'inline-block',
            verticalAlign: 'top',
            color: '#2e2f30'// #9DA5AB //#2e2f30
          },
          connector: {
            width: '2px',
            height: '12px',
            borderLeft: 'solid 2px black',
            borderBottom: 'solid 2px black',
            position: 'absolute',
            top: '0px',
            left: '-21px'
          },
          title: {
            lineHeight: '24px',
            verticalAlign: 'middle'
          }
        },
        subtree: {
          listStyle: 'none',
          paddingLeft: '19px'
        },
        loading: {
          color: '#E2C089'
        }
      }
    }
  };
