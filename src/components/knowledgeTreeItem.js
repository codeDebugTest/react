import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getKnowledgeTreePath} from '../utils/TreeToo'
import KnowledgeTreeLinePrivate from './knowledgeTreeLine'
import {Icon, Tooltip} from 'antd'

class KnowledgeTreeItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            knowledgeTreePaths: []
        }
    }

    setKnowledgeTreePaths(knowledgeTreeIds) {
        const {dictionary} = this.props.dictionary;
        const knowledgeTreePaths = knowledgeTreeIds.map(
            (knowledgeTreeId, index) => getKnowledgeTreePath(dictionary.knowledgeTree, knowledgeTreeId)
        );

        this.setState({knowledgeTreePaths: knowledgeTreePaths,});
    }

    handleKnowledgeTreeChange(knowledgeTreeId, index) {
        this.props.knowledgeTreeIds[index] = knowledgeTreeId;
        this.setKnowledgeTreePaths(this.props.knowledgeTreeIds);
    }

    removeKnowledgeTree(index) {
        this.props.knowledgeTreeIds.splice(index, 1);
        this.setKnowledgeTreePaths(this.props.knowledgeTreeIds);
    }

    componentWillReceiveProps(nextProps) {
        console.log('检测 props 属性的改变'+ nextProps);
        this.setKnowledgeTreePaths(nextProps.knowledgeTreeIds);
    }

    componentWillMount() {
        this.setKnowledgeTreePaths(this.props.knowledgeTreeIds);
    }

    render() {  //knowledgeTreeIds, dictionary
        return (
            <div>
                {this.state.knowledgeTreePaths.map(
                    (knowledgeTreePath, index) => (
                        <div className="row-form" key={index}>
                            <label className='control-label'>知识树：</label>
                            <label className="margin-left-20 info-label">
                                <KnowledgeTreeLinePrivate
                                    selectedIdsPath={knowledgeTreePath}
                                    index={index}
                                    treeNodeSelectedCallback={this.handleKnowledgeTreeChange.bind(this)}
                                />
                            </label>
                            <Tooltip title="删除知识树" placement="top">
                                <span className="remove-tree" onClick={() => this.removeKnowledgeTree(index)}>
                                    <Icon type="minus-circle-o"/>
                                </span>
                            </Tooltip>
                        </div>
                    )
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dictionary: state.dictionary,
    }
};

export default connect(mapStateToProps)(KnowledgeTreeItem)
