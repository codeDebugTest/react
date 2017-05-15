import React, {Component} from 'react'
import {connect} from 'react-redux'

class Course extends Component {

    render() {
        return (
            <div>
                课程 页面
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        courseList: state.courseList
    }
}
export default connect(mapStateToProps)(Course)
