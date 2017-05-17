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
        };
    }

    toggleVisible() {
        this.setState({visible: !this.state.visible});
    };

    onDeleteNode() {
        this.props.deleteNodeHandler(this.props.node);
    }

    onAddNode() {
        this.props.addNodeHandler(this.props.node);
    }

    getChildrenNodes() {
        return (
            <ul>{
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

        const childrenNodes = isLeafNode(this.props.node)? null : this.getChildrenNodes();
        const style = this.state.visible ? null: {display: "none"};
        return (
            <li style={style}>
                <label onClick={this.toggleVisible.bind(this)}>{this.props.node.display}</label>

                <Popconfirm placement="topRight" title={addMsg} okText="Yes" cancelText="No"
                            onConfirm={this.onAddNode.bind(this)}>
                    <span><Icon type="plus-circle-o"/></span>
                </Popconfirm>


                <Popconfirm placement="topRight" title={deleteMsg} okText="Yes" cancelText="No"
                            onConfirm={this.onDeleteNode.bind(this)} >
                    <span><Icon type="delete" /></span>
                </Popconfirm>

                {childrenNodes}
            </li>
        )
    }
}

class Tree extends Component{
    render() {
        if (isArray(this.props.tree)) {
            // tree list [tree1, tree2]
            return (
                <ul>
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
                <ul>
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