import React, {Component} from 'react'
import {Icon, Popconfirm} from 'antd'
import {isArray, isObject} from '../utils/util'


const isLeafNode = (node) => {
    return !( node.hasOwnProperty('children') && node.children && isArray(node.children) )
};

class TreeNode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            isTreeNode: !isLeafNode(this.props.node)
        };
    }

    toggleVisible() {
        if (this.state.isTreeNode) {
            this.setState({visible: !this.state.visible});
        }
    };

    getLiStyleClass () {
        if (!this.state.isTreeNode) {
            return 'null-label';
        }
        return this.state.visible ? 'togglable-down' : 'togglable-up';
    }
    onDeleteNode() {
        this.props.deleteNodeHandler(this.props.node);
    }

    onAddNode() {
        this.props.addNodeHandler(this.props.node);
    }

    getChildrenNodes() {
        return (
            <ul className="tree-ul">{
                this.props.node.children.map((child, index) => {
                    return (<TreeNode node={child} key={index}
                                      addNodeHandler={this.props.addNodeHandler}
                                      deleteNodeHandler={this.props.deleteNodeHandler}
                    />)
                })
            }</ul>
        )
    }

    render() {
        const deleteMsg = 'Are you sure delete this node: ' + this.props.node.display + ' ?';
        const addMsg = 'Are you sure add a new node in this node: ' + this.props.node.display + '?';
        const childrenNodes = this.state.isTreeNode ? this.getChildrenNodes() : null;
        const style = this.state.visible ? null: {display: "none"};
        const labelClass = this.getLiStyleClass();
        return (
            <li className="clearfixed">
                <label className={labelClass} onClick={this.toggleVisible.bind(this)}>{this.props.node.display}</label>

                <Popconfirm placement="topRight" title={addMsg} okText="Yes" cancelText="No"
                            onConfirm={this.onAddNode.bind(this)}>
                    <span className="add-icon"><Icon type="plus-circle-o"/></span>
                </Popconfirm>


                <Popconfirm placement="topRight" title={deleteMsg} okText="Yes" cancelText="No"
                            onConfirm={this.onDeleteNode.bind(this)} >
                    <span className="delete-icon"><Icon type="delete" /></span>
                </Popconfirm>

                <div style={style}>
                    {childrenNodes}
                </div>
            </li>
        )
    }
}

class Tree extends Component{
    render() {
        if (isArray(this.props.tree)) {
            // tree list [tree1, tree2]
            return (
                <ul className="tree-ul" style={{padding:0}}>
                    {this.props.tree.map((root, index) => {
                        return (
                            <TreeNode node={root} key={index}
                                      addNodeHandler={this.props.addTreeNode}
                                      deleteNodeHandler={this.props.deleteTreeNode}
                            />
                        )
                    })}
                </ul>
            )
        } else if (isObject(this.props.tree)) {
            // one tree
            return (
                <ul className="tree-ul">
                    <TreeNode node={this.props.tree}
                              addNodeHandler={this.props.addTreeNode}
                              deleteNodeHandler={this.props.deleteTreeNode}
                    />
                </ul>
            )
        }
        return (<div> </div>)
    }
}

export default Tree