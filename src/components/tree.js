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
            unfold: false,
            isTreeNode: !isLeafNode(this.props.node),
        };
    }

    toggleSpread() {
        if (this.props.node.visible === false) {
            return;
        }

        if (this.state.isTreeNode) {
            this.setState({unfold: !this.state.unfold});
        }
    };

    getLiStyleClass () {
        if (!this.state.isTreeNode) {
            return 'null-label';
        }
        return this.state.unfold ? 'togglable-down' : 'togglable-up';
    }

    onDeleteNode() {
        this.props.deleteNodeHandler(this.props.node);
    }

    onAddNode() {
        this.props.addNodeHandler(this.props.node);
    }

    onCloseNode(visible) {
        // this.setState({hide: hide});
        if (!visible && this.state.isTreeNode && this.state.unfold) {
            this.setState({unfold: !this.state.unfold});
        }

        this.props.closeNodeHandler(this.props.node, visible);
    }

    getChildrenNodes() {
        return (
            <ul className="tree-ul">{
                this.props.node.children.map((child, index) => {
                    return (<TreeNode node={child} key={index}
                                      addNodeHandler={this.props.addNodeHandler}
                                      deleteNodeHandler={this.props.deleteNodeHandler}
                                      closeNodeHandler={this.props.closeNodeHandler}
                                      level={this.props.level + 1}
                    />)
                })
            }</ul>
        )
    }

    render() {
        const display = this.props.node.display;
        const {node} = this.props;

        const deleteMsg = '确定要删除此节点: ' + display + ' ?';
        const addMsg = '确定要为此节点添加子节点: ' + display + '?';
        const closeAction = node.visible === false ? '显示' : '不可见';
        const closeMsg = '确定要' + closeAction + '此节点: ' + display + '?';

        const style = this.state.unfold ? null: {display: "none"};
        const labelClass = this.getLiStyleClass();
        return (
            <li className={"clearfixed" + (this.props.level !== 1 ? ' li-border-line' : '')}>
                <div className="node">
                    <label className={labelClass + (node.visible === false  ? ' disabled-node' : '')}
                           onClick={this.toggleSpread.bind(this)}>
                        {this.props.level === 1 || this.props.level === 2 ?
                            this.props.node.display
                            : this.props.node.code + ' ' + this.props.node.display
                        }
                    </label>

                    {node.visible !== false && this.props.level !== 1
                        ? (
                            <Popconfirm placement="topRight" title={addMsg} okText="是" cancelText="否"
                                        onConfirm={this.onAddNode.bind(this)} >
                                <Tooltip title="添加节点" placement="right">
                                    <span className="add-icon" ><Icon type="plus-circle-o"/></span>
                                </Tooltip>
                            </Popconfirm>
                          )
                        : ''
                    }

                    {node.visible !== false && this.props.level !== 1 && this.props.level !== 2
                        ? (
                            <Popconfirm placement="topRight" title={deleteMsg} okText="是" cancelText="否"
                                        onConfirm={this.onDeleteNode.bind(this)}>
                                <Tooltip title="删除节点" placement="right" >
                                    <span className="delete-icon"><Icon type="delete" /></span>
                                </Tooltip>
                            </Popconfirm>
                        )
                        : ''
                    }

                    { this.props.level === 1 || this.props.level === 2 ? '' : node.visible !== false
                        ? (
                            <Popconfirm placement="topRight" title={closeMsg} okText="是" cancelText="否"
                                        onConfirm={() => this.onCloseNode(false)}>
                                <Tooltip title={"不可见节点" } placement="right">
                                    <span className="close-icon" ><Icon type="close-circle-o" /></span>
                                </Tooltip>
                            </Popconfirm>
                        )
                        : (
                            <Popconfirm placement="topRight" title={closeMsg} okText="是" cancelText="否"
                                        onConfirm={() => this.onCloseNode(true)}>
                                <Tooltip title={"显示节点"} placement="right">
                                    <span className="open-icon" ><Icon type="smile-o" /></span>
                                </Tooltip>
                            </Popconfirm>
                        )
                    }
                </div>

                {!this.state.hide
                    ?
                        <div style={style}>
                            {this.state.isTreeNode ? this.getChildrenNodes() : null}
                        </div>
                    : ''
                }
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
                                      closeNodeHandler={this.props.closeNodeHandler}
                                      level={1}
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
                              closeNodeHandler={this.props.closeNodeHandler}
                              level={1}
                    />
                </ul>
            )
        }
        return (<div> </div>)
    }
}

export default Tree