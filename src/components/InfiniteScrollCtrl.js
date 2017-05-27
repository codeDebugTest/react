import React, { Component } from 'react';
import { BackTop } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

export default class InfiniteScrollCtrl extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.props.loadFunction}
                    hasMore={this.props.hasMoreItems}
                    loader={<div className="loader">Loading ...</div>}
                    useWindow={true}
                    threshold={10}
                    initialLoad={false}
                >
                    {
                        this.props.items
                    }
                </InfiniteScroll>
                <BackTop />
            </div>
        );
    }
}
