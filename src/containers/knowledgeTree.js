import React, {Component} from 'react'
import {connect} from 'react-redux'

class KnowledgeTree extends Component {

    render() {
        const {userName} = this.props
        return (
            <div>
                { userName + '知识树 页面'}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userName: state.loginReducer.userInfo && state.loginReducer.userInfo.userName
    }
}
export default connect(mapStateToProps)(KnowledgeTree)
