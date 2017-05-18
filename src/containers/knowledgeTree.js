import React, {Component} from 'react'
import {connect} from 'react-redux'
import {message, Spin} from 'antd'
import Tree from '../components/tree'
import {doFetchDictionary} from '../actions/knowledge.ation'

class KnowledgeTree extends Component {
    deleteTreeNode(node) {
        console.log('delete tree node: ' + node);
    }

    addTreeNode(node) {
        console.log('add tree node: ' + node);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const { userInfo } = this.props.userState;

        doFetchDictionary(userInfo.regionId, null, (msg)=> {message.error(msg)})(dispatch)
    }

    render() {
        const {dictionary, loading} = this.props.dictionary;
        const knowledgeTree = dictionary && dictionary.knowledgeTree;
        return (
            <div style={{position: 'relative'}}>{
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
