import React from 'react';
import axios from 'axios';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [
        {
          value: 'All',
          key: 'default',
        },
        {
          value: 'Baby',
          key: 'baby'
        },
        {
          value: 'Beauty',
          key: 'beauty'
        },
        {
          value: 'Books',
          key: 'books'
        },
        {
          value: 'Car & Motobike',
          key: 'car-motorbike'
        },
        {
          value: 'CD & Vinyl',
          key: 'cd-vinyl'
        },
        {
          value: 'Classical Music',
          key: 'classical-music'
        },
        {
          value: 'Clothing',
          key: 'clothing'
        },
        {
          value: 'Computer & Accessories',
          key: 'computer-accessories'
        },
        {
          value: 'Digital Music',
          key: 'digital-music'
        },
        {
          value: 'DIY & Tools',
          key: 'diy-tools'
        },
        {
          value: 'DVD & BLueray',
          key: 'dvd-blueray'
        }
      ],

      currentCategory: 'default',
    }

    // this.parentSelectCategory = this.props.parentSelectCategory.bind(this);
  }

  selectCategory(e, category) {
    e.preventDefault();
    console.log('select category !!');
    this.setState({currentCategory: category.key});

    this.props.parentSelectCategory(category);
  }

  render() {
    const categories = this.state.categories.map((category) => {
      return (
        <li
          onClick={(e) => this.selectCategory(e, category)}
          className={category.key === this.state.currentCategory ? 'active' : ''}
          key={category.key}
          >
          <a href="#">{category.value}</a>
        </li>
      )
    });

    return (
      <div className="col-lg-3 col-md-3 col-sm-4">
      <div className="panel-heading">
        <h3>Categories</h3>
      </div>
        <ul className="nav nav-pills nav-stacked">
          {categories}
        </ul>
      </div>
    )
  }
};

export default Sidebar;
