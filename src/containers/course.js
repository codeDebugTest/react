import React, {Component} from 'react'
import {connect} from 'react-redux'
import FilterHeader from '../components/filterHeader'

class Course extends Component {

    render() {
        return (
            <div>
                <FilterHeader> </FilterHeader>
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
