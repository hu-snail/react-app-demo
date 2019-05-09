import React, {Component} from 'react'

class Detail extends Component{
  render() {
    return (
      <h1 className="title">详情</h1>
    )
  }

  componentDidMount() {
    console.log(this.props.match);
  }
}

export default Detail;
