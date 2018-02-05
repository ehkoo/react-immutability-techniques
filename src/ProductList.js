import React from 'react'
import { SORT_ASC, SORT_DESC } from './constants'

class ProductList extends React.Component {
  state = {}

  componentDidMount() {
    this.resetState()
  }

  resetState = () => {
    this.setState({
      products: this.props.products,
      searchKeyword: '',
      sortField: this.props.initSortField,
      sortDirection: this.props.initSortDirection,
      transformers: []
    })
  }

  searchProducts(products, keyword) {
    const regex = new RegExp(keyword, 'i')

    return products.filter(product => regex.test(product.name))
  }

  sortProductsByName(a, b) {
    return a.name.localeCompare(b.name)
  }

  sortProductsByPrice(a, b) {
    return a.price - b.price
  }

  toggleTransformer(list, transformer) {
    return list.includes(transformer) ? list.filter(f => f !== transformer) : [...list, transformer]
  }

  transformName(product) {
    return { ...product, name: product.name.toUpperCase() }
  }

  doublePrice(product) {
    return { ...product, price: product.price * 2 }
  }

  filterProducts(products, { searchKeyword, sortField, sortDirection, transformers = [] } = {}) {
    const filteredProducts =
      searchKeyword && searchKeyword.length > 0 ? this.searchProducts(products, searchKeyword) : products

    const sortedProducts = [...filteredProducts].sort((a, b) => {
      const sortFn = sortField === 'name' ? this.sortProductsByName : this.sortProductsByPrice
      return sortFn(a, b) * sortDirection
    })

    const transformedProducts = transformers.reduce((acc, fn) => {
      return acc.map(fn)
    }, sortedProducts)

    return transformedProducts
  }

  doToggleSortDirection = fieldName => e => {
    e.preventDefault()
    this.setState(old => {
      if (fieldName !== old.sortField) return { sortField: fieldName }

      return { sortDirection: old.sortDirection === SORT_ASC ? SORT_DESC : SORT_ASC }
    })
  }

  doSearch = e => {
    this.setState({ searchKeyword: e.currentTarget.value })
  }

  doUpperize = e => {
    this.setState(old => {
      return { transformers: this.toggleTransformer(old.transformers, this.transformName) }
    })
  }

  doDoublePrice = e => {
    this.setState(old => {
      return { transformers: this.toggleTransformer(old.transformers, this.doublePrice) }
    })
  }

  doRemoveProduct = product => e => {
    this.setState(old => {
      return { products: old.products.filter(p => p !== product) }
    })
  }

  getSortIcon(fieldName, { sortField, sortDirection }) {
    if (fieldName !== sortField) return null

    return sortDirection === SORT_DESC ? <i className="icon icon-upward" /> : <i className="icon icon-downward" />
  }

  render() {
    const products = this.filterProducts(this.state.products || this.props.products, this.state)

    return (
      <div className="my-2">
        <div className="container">
          <div className="columns px-2">
            <div className="has-icon-right">
              <input type="search" className="form-input" placeholder="Search by name" onInput={this.doSearch} />
              <i className="form-icon icon icon-search" />
            </div>
            <div className="col-ml-auto">
              <button className="mx-1 btn" onClick={this.doUpperize}>
                Name to UPPERCASE!
              </button>
              <button className="mx-1 btn" onClick={this.doDoublePrice}>
                Double the price!
              </button>
              <button className="mx-1 btn" onClick={this.resetState}>
                Reset
              </button>
            </div>
          </div>
        </div>

        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th className="c-hand" onClick={this.doToggleSortDirection('name')}>
                Name {this.getSortIcon('name', this.state)}
              </th>
              <th className="c-hand" onClick={this.doToggleSortDirection('price')}>
                Price {this.getSortIcon('price', this.state)}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.name}>
                <td>{product.name}</td>
                <td>¥{product.price}</td>
                <td>
                  <button className="btn btn-error" onClick={this.doRemoveProduct(product)}>
                    <i className="icon icon-delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default ProductList
