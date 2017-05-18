import React, {Component} from 'react'
import {connect} from 'react-redux'
import {message, Spin} from 'antd'
import Tree from '../components/tree'
import {doDictionary} from '../actions/knowledge'

class KnowledgeTree extends Component {
    deleteTreeNode(node) {
        console.log('delete tree node: ' + node);
    }

    addTreeNode(node) {
        console.log('add tree node: ' + node);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        doDictionary(this.props.userInfo.regionId, null, (msg)=> {message.error(msg)})(dispatch)
    }

    render() {
        return (
            <div style={{position: 'relative'}}>
                {
                    this.props.loading ? (
                        <div className="center-point">
                            <Spin tip="Loading..."/>
                        </div>
                    ) : (
                        <Tree tree={this.props.knowledgeTree}
                               addTreeNode={this.addTreeNode.bind(this)}
                               deleteTreeNode={this.deleteTreeNode.bind(this)}/>
                    )
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userInfo: state.loginReducer && state.loginReducer.userInfo,
        knowledgeTree: state.knowledgeTreeReducer && state.knowledgeTreeReducer.dictionary && state.knowledgeTreeReducer.dictionary.knowledgeTree,
        loading: state.knowledgeTreeReducer && state.knowledgeTreeReducer.loading
    }
}
export default connect(mapStateToProps)(KnowledgeTree)
