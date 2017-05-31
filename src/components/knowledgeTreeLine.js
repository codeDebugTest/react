import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Breadcrumb } from 'antd';
import { Menu, Dropdown } from 'antd';
import { varEmpty, varNotEmpty} from '../utils/util';
import { getOrDefault } from '../utils/util';
import { getValidTreeIdFromPath } from '../utils/TreeToo';
import { findTreeNodeFromPath, ID_ALL, getNodeAll } from '../utils/TreeToo';

const NodeMenu = ({ nodeItems, onMenuItemClicked }) => (
    <Menu onSelect={onMenuItemClicked}>
        {nodeItems.map((nodeItem, i) => (
            <Menu.Item key={i}> {nodeItem.display} </Menu.Item>
        ))}
    </Menu>
);

class KnowledgeTreeLineInternal extends Component {
    constructor(props) {
        super(props);
        this.dropdownBtns = {};
        this.state = {
            dropdownVisibles: {}
        }
    }

    handleVisibleChange(level, flag) {
        let newVisibles = { ...this.state.dropdownVisibles };
        newVisibles[level] = flag;
        this.setState({ dropdownVisibles: newVisibles });
    }

    setVisibleFalse(level) {
        let newVisibles = { ...this.state.dropdownVisibles };
        newVisibles[level] = false;
        this.setState({ dropdownVisibles: newVisibles });
    }

    onPathClicked(level, lastNodeId) {
        const parentPath = this.props.selectedIdsPath.slice(0, level);
        this.props.onNodeSelected([...parentPath, lastNodeId]);
    }

    handleMenuItemClicked(level, nodeItems, menuItem) {
        this.setVisibleFalse(level);

        const parentPath = this.props.selectedIdsPath.slice(0, level);
        const currentNode = nodeItems[menuItem.key];

        if (varNotEmpty(currentNode.children))
            this.props.onNodeSelected([...parentPath, currentNode.id + '', ID_ALL]);
        else
            this.props.onNodeSelected([...parentPath, currentNode.id + '']);
    }

    getNode(level) {
        return findTreeNodeFromPath(this.props.treeRootNodes, this.props.selectedIdsPath, level);
    }

    getSiblings(level) {
        if (level === 0)
            return this.props.treeRootNodes;
        const parent = findTreeNodeFromPath(this.props.treeRootNodes, this.props.selectedIdsPath, level - 1);
        if (varNotEmpty(parent.children))
            return parent.children;
        return [];
    }

    getSiblingsWithAll(level) {
        return [getNodeAll(level), ...this.getSiblings(level)];
    }

    render() { // props: treeRootNodes, selectedIdsPath, onNodeSelected, gradeSubjectOnly
        const { selectedIdsPath } = this.props;

        let selectedIdsPathModified = selectedIdsPath;
        if (this.props.gradeSubjectOnly && selectedIdsPath.length > 2)
            selectedIdsPathModified = [selectedIdsPath[0], selectedIdsPath[1]];

        return (
            <Breadcrumb separator={this.props.gradeSubjectOnly ? ' ' : '/'}>
                {selectedIdsPathModified.map((id, level) => {
                    const siblings = this.getSiblingsWithAll(level);
                    const node = this.getNode(level);
                    return <Breadcrumb.Item key={level}>
                        <Dropdown.Button
                            size='small'
                            className={level === selectedIdsPathModified.length - 1 ? "breadcrumb-last-btn" : ''}
                            onClick={this.onPathClicked.bind(this, level, id)}
                            overlay={
                                <NodeMenu
                                    nodeItems={siblings}
                                    onMenuItemClicked={this.handleMenuItemClicked.bind(this, level, siblings)} />
                            }
                            onVisibleChange={this.handleVisibleChange.bind(this, level)}
                            visible={this.state.dropdownVisibles[level]}
                            trigger={['click']} >
                            {node.display}
                        </Dropdown.Button>
                    </Breadcrumb.Item>
                })}
            </Breadcrumb>
        );
    }
}

class KnowledgeTreeLinePrivate extends Component {
    onNodeSelectedWrapper(newPath) {
        if (varNotEmpty(this.props.treeNodeSelectedCallback)){}
            this.props.treeNodeSelectedCallback(getValidTreeIdFromPath(newPath), this.props.index);

        if (varNotEmpty(this.props.treePathSelectedCallback))
            this.props.treePathSelectedCallback(newPath);
    }
    render() { // selectedIdsPath, treePathSelectedCallback, // treeNodeSelectedCallback, gradeSubjectOnly
        const {dictionary} = this.props.dictionary;
        return (
            varEmpty(dictionary)
                ?
                <h4>loading dictionary...</h4>
                :
                <div className="margin-y-10">
                    <KnowledgeTreeLineInternal
                        treeRootNodes={dictionary.knowledgeTree}
                        selectedIdsPath={this.props.selectedIdsPath}
                        onNodeSelected={this.onNodeSelectedWrapper.bind(this)}
                        gradeSubjectOnly={this.props.gradeSubjectOnly} />
                </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        dictionary: state.dictionary,
    }
};

export default connect(mapStateToProps)(KnowledgeTreeLinePrivate)

