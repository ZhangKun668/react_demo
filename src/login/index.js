import React from "react";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  }


  skipPage() {
    this.props.history.push({
      pathname: '/menu',
      state: {
        id: 3
      }
    })
  }

  render() {
    return (
      <div onClick={this.skipPage}>这里是登录页面</div>
    )
  }
}

export default LoginPage;