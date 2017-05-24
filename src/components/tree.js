import React, {Component} from 'react'
import {Icon, Popconfirm, Tooltip} from 'antd'
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

    onCloseNode() {
        this.props.closeNodeHandler(this.props.node);
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
        const deleteMsg = '确定要删除此节点: ' + this.props.node.display + ' ?';
        const addMsg = '确定要为此节点添加子节点: ' + this.props.node.display + '?';
        const closeAction = this.state.visible ? '禁用' : '恢复';
        const closeMsg = '确定要' + closeAction + '此节点: ' + this.props.node.display + '?';

        const childrenNodes = this.state.isTreeNode ? this.getChildrenNodes() : null;
        const style = this.state.visible ? null: {display: "none"};
        const labelClass = this.getLiStyleClass();
        return (
            <li className="clearfixed" disabled={this.state.visible}>
                <label className={labelClass} disabled={this.state.visible}
                       onClick={this.toggleVisible.bind(this)}>{this.props.node.display}</label>

                <Popconfirm placement="topRight" title={addMsg} okText="Yes" cancelText="No"
                            onConfirm={this.onAddNode.bind(this)} >
                    <Tooltip title="添加节点" placement="right">
                        <span className="add-icon" disabled={this.state.visible}><Icon type="plus-circle-o"/></span>
                    </Tooltip>
                </Popconfirm>


                <Popconfirm placement="topRight" title={deleteMsg} okText="Yes" cancelText="No"
                            onConfirm={this.onDeleteNode.bind(this)}>
                    <Tooltip title="删除节点" placement="right" >
                        <span className="delete-icon" disabled={this.state.visible}><Icon type="delete" /></span>
                    </Tooltip>
                </Popconfirm>

                <Popconfirm placement="topRight" title={closeMsg} okText="Yes" cancelText="No"
                            onConfirm={this.onCloseNode.bind(this)}>
                    <Tooltip title={this.state.visible ? "禁用节点" : "恢复节点" } placement="right">
                        <span className="close-icon" disabled={this.state.visible}><Icon type="close-circle-o" /></span>
                    </Tooltip>
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