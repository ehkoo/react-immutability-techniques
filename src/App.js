import React, { Component } from 'react'
import ProductList from './ProductList'
import { SORT_ASC } from './constants'

class App extends Component {
  render() {
    return (
      <div>
        <h4 class="mx-2 my-2">
          Xem bài viết:
          <a href="https://ehkoo.com/bai-viet/array-object-immutability-javascript" target="_blank">
            Tuyệt chiêu đảm bảo tính bất biến trong JavaScript
          </a>
        </h4>
        <ProductList products={this.props.products} initSortField="name" initSortDirection={SORT_ASC} />
      </div>
    )
  }
}

export default App
