import React, {Component} from 'react'
import {Icon, Popconfirm} from 'antd'
import {isArray} from '../utils/util'


const isLeafNode = (node) => {
    return !( node.hasOwnProperty('children') && node.children && isArray(node.children) )
};


class TreeNode extends Component {
    constructor(props) {
        super(props)
    }

    onDeleteNode() {
        this.props.deleteHandler(this.props.node);
    }

    onAddNode() {
        this.props.addHandler(this.props.node);
    }

    getChildrenNodes() {
        return (
            <ul>
                {
                    this.props.node.children.map((child, index) => {
                        return (<TreeNode node={child} key={index}/>)
                    })
                }
            </ul>
        )
    }

    render() {
        const deleteMsg = 'Are you sure delete this node: ' + this.props.node.display + ' ?';
        const addMsg = 'Are you sure add a new node in this node: ' + this.props.node.display + '?';
        const childrenNodes = isLeafNode(this.props.node)? null : this.getChildrenNodes();

        return (
            <li>
                <label>{this.props.node.display}</label>

                <Popconfirm placement="topRight" title={addMsg} okText="Yes" cancelText="No" onConfirm={this.onAddNode.bind(this)}>
                    <span><Icon type="plus-circle-o"/></span>
                </Popconfirm>


                <Popconfirm placement="topRight" title={deleteMsg} okText="Yes" cancelText="No" onConfirm={this.onDeleteNode.bind(this)} >
                    <span><Icon type="delete" /></span>
                </Popconfirm>

                {childrenNodes}
            </li>
        )
    }
}

class Tree extends Component{
    constructor(props) {
        super(props)
    }

    render

    render() {
        return
    }
}

class Tree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
        };
    }

    toggle = () => {
        this.setState({visible: !this.state.visible});
    };

    render() {
        var childNodes;
        var classObj;

        if (this.props.node.childNodes != null) {
            childNodes = this.props.data.childNodes.map(function(node, index) {
                return <li key={index}><Tree node={node} /></li>
            });

            classObj = {
                togglable: true,
                "togglable-down": this.state.visible,
                "togglable-up": !this.state.visible
            };
        }

        var style;
        if (!this.state.visible) {
            style = {display: "none"};
        }

        return (
            <div>
                <h5 onClick={this.toggle} className={classNames(classObj)}>
                    {this.props.data.title}
                </h5>
                <ul style={style}>
                    {childNodes}
                </ul>
            </div>
        );
    }
}