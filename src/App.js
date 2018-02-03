import React, { Component } from 'react'
import ProductList from './ProductList'
import { SORT_ASC } from './constants'

class App extends Component {
  render() {
    return (
      <div>
        <h4 style={{ margin: '2rem .5rem' }}>
          Xem bài viết:
          <a
            href="https://ehkoo.com/bai-viet/array-object-immutability-javascript"
            rel="noopener noreferrer"
            target="_blank"
          >
            Tuyệt chiêu đảm bảo tính bất biến trong JavaScript
          </a>
        </h4>
        <ProductList products={this.props.products} initSortField="name" initSortDirection={SORT_ASC} />
      </div>
    )
  }
}

export default App
