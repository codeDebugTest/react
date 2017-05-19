import React, {Component} from 'react'
import {Row, Input} from 'antd'
import '../App.css'

const Search = Input.Search;

class SearchBox extends Component {
    constructor(props) {
        super(props);
    }

    onSearchSelect(value) {
        console.log(`search text: ${value}`);
        this.props.searchFunc(value);
    }

    render() {
        return (
            <div>
                <label>{this.props.searchLabel}</label>
                <Search style={{marginLeft: 15, width: 300}}
                        placeholder="input search text"
                        onSearch={this.onSearchSelect.bind(this)}
                />
            </div>
        )
    }
}

export default SearchBox;