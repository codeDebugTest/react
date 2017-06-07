import React, {Component} from 'react'
import {connect} from 'react-redux'
import {message, Spin} from 'antd'
import Tree from '../components/tree'
import {doFetchDictionary, doFetchKnowledgeTree, doUpdateKnowledgeTree} from '../actions/knowledge.ation'
import {getFatherNodePathByKtId} from '../utils/TreeToo'

class KnowledgeTree extends Component {

    updateKnowledgeTree(subjectId) {
        const { userInfo } = this.props.userState;
        const requestInfo = {
            regionId: userInfo.regionId,
            userToken: userInfo.userToken,
            subjectId: subjectId,
            tree: this.props.dictionary.knowledgeTree
        };

        doUpdateKnowledgeTree(requestInfo, this.getKnowledgeTree.bind(this), (msg)=> {message.error(msg)})
    }

    deleteTreeNode(node) {
        console.log('delete tree node: ' + node);
        const nodePath = getFatherNodePathByKtId(this.props.dictionary.knowledgeTree, node.id);
        const fatherNode = nodePath[nodePath.length -2];

        for (let i= 0; i < fatherNode.children.length; i++) {
            if (fatherNode.children[i].id === node.id) {
                fatherNode.children.splice(i, 1);
                break;
            }
        }
        this.updateKnowledgeTree(nodePath[1].id);
    }

    addTreeNode(node) {
        console.log('add tree node: ' + node);
        const nodePath = getFatherNodePathByKtId(this.props.dictionary.knowledgeTree, node.id);
        this.updateKnowledgeTree(nodePath[1].id);
    }

    showHideNode(node) {
        node.visible = !node.visible;
        const nodePath = getFatherNodePathByKtId(this.props.dictionary.knowledgeTree, node.id);
        this.updateKnowledgeTree(nodePath[1].id);
    }

    getKnowledgeTree() {
        const { dispatch } = this.props;
        const { userInfo } = this.props.userState;

        doFetchKnowledgeTree({
            regionId: userInfo.regionId,
            showAll: true
        }, null, (msg) => {message.error(msg)})(dispatch);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const { userInfo } = this.props.userState;
        this.getKnowledgeTree();
        doFetchDictionary(userInfo.regionId, null, (msg)=> {message.error(msg)})(dispatch)
    }

    render() {
        const {knowledgeTree, loading} = this.props.dictionary;
        return (
            <div style={{position: 'relative', marginLeft: '15px'}}>{
                loading ? (
                    <div className="center-point">
                        <Spin tip="Loading..."/>
                    </div>
                ) : (
                    <Tree tree={knowledgeTree}
                           addTreeNode={this.addTreeNode.bind(this)}
                           deleteTreeNode={this.deleteTreeNode.bind(this)}/>
                )
            }</div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userState: state.login,
        dictionary: state.dictionary,
    }
}
export default connect(mapStateToProps)(KnowledgeTree)
