import React from 'react';
import Header from './reuse/header'
import axios from 'axios'

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: {},
    }

    this.getItem = this.getItem.bind(this);

    this.itemId = this.props.match.params.itemId;
    this.getItem();
  }

  getItem() {
    axios.get(`http://localhost:8080/api/items/${this.itemId}`)
      .then(res => {
        this.setState({item: res.data});
      })
  }

  render() {
    const item = this.state.item;
    let imgCollection = [];

    if (item.imgCollection) {
      imgCollection = item.imgCollection.map(img => {
        return (
          <div className="col-lg-6">
            <img
              src={`http://localhost:8080/api/render-item-img/${item.user._id}/item/${item._id}/img-path/${img}`}
              alt="item image"
              width="300px"
            />
          </div>
        )
      });
    }

    return (
      <div>
        <Header />
        <div className="container">
          <h1> {item.title} </h1>
          <br />
          {item.category}
          <br />
          {item.description}
          <br />
          Price : {item.price}
          <br /> <br />
          {imgCollection}
        </div>
      </div>
    )
  }
};

export default Item;
