import React, {Component} from 'react'
import {connect} from 'react-redux'
import FilterHeader from '../components/filterHeader'

class Course extends Component {

    render() {
        return (
            <div>
                <FilterHeader knowledgeTree={this.props.knowledgeTree}> </FilterHeader>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        courseList: state.courseList,
        userInfo: state.loginReducer && state.loginReducer.userInfo,
        knowledgeTree: state.knowledgeTreeReducer && state.knowledgeTreeReducer.knowledgeTree
    }
}
export default connect(mapStateToProps)(Course)
