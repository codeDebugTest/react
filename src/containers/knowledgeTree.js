import React, {Component} from 'react'
import {connect} from 'react-redux'
import Tree from '../components/tree'
import {doFetchDictionary, doFetchKnowledgeTree, doUpdateKnowledgeTree} from '../actions/knowledge.ation'
import {getFatherNodePathByKtId} from '../utils/TreeToo'
import {message, Spin, Modal, Input} from 'antd'


class KnowledgeTree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            newNode: {
                code: '',
                display: '',
                visible: true
            }
        };
        this.actionNode = null;
    }

    updateKnowledgeTree(subjectNode) {
        const { userState, dictionary} = this.props;
        const requestInfo = {
            regionId: userState.userInfo.regionId,
            userToken: userState.userInfo.userToken,
            subjectId: subjectNode.id,
            tree: subjectNode.children
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
        this.updateKnowledgeTree(nodePath[1]);
    }

    addTreeNode(node, newNode) {
        console.log('add tree node: ' + node);
        const nodePath = getFatherNodePathByKtId(this.props.dictionary.knowledgeTree, node.id);
        if (!node.children) {
            node.children = [];
        }
        node.children.push(newNode);
        this.updateKnowledgeTree(nodePath[1]);
    }

    closeTreeNode(node, visible) {
        node.visible = visible;
        const nodePath = getFatherNodePathByKtId(this.props.dictionary.knowledgeTree, node.id);
        this.updateKnowledgeTree(nodePath[1]);
    }

    showAddNodeModal(node) {
        this.actionNode = node;
        this.setState({modalVisible: true,});
    }

    modalCancelHandler = () => {
        this.setState({modalVisible: false});
    }

    modalOkHandler = () => {
        const code = document.getElementById('nodeCode').value;
        const display = document.getElementById('nodeDisplay').value;
        if (!code || !display) {
            message.warn('code或名称不能为空！');
            return;
        }

        this.addTreeNode(this.actionNode, {code: code, display: display, visible: true});
        this.modalCancelHandler();
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
        const {modalVisible} = this.state
        return (
            <div style={{position: 'relative', marginLeft: '15px'}}>
                {
                    loading ? (
                        <div className="center-point">
                            <Spin tip="Loading..."/>
                        </div>
                    ) : (
                        <Tree tree={knowledgeTree}
                               addTreeNode={this.showAddNodeModal.bind(this)}
                               deleteTreeNode={this.deleteTreeNode.bind(this)}
                               closeNodeHandler={this.closeTreeNode.bind(this)}
                        />
                    )
                }
                <Modal visible={modalVisible} title="添加知识树节点" width="400"
                       onOk={this.modalOkHandler.bind(this)} onCancel={this.modalCancelHandler.bind(this)}
                       okText="确定" cancelText="取消">
                    <div className="row-form">
                        <label className='modal-control-label'>code：</label>
                        <Input className="margin-left-20 modal-input" id="nodeCode"/>
                    </div>

                    <div className="row-form">
                        <label className='modal-control-label'>名称：</label>
                        <Input className="margin-left-20 modal-input" id="nodeDisplay"/>
                    </div>
                </Modal>
            </div>
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
