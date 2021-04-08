import React from 'react'
import { connect } from 'react-redux'
import { AbstractComponent, InterAbstractComponent } from '../../module/AbstractComponent'
import { InterUser } from '../../store/model/IUser'
import { ICombinedState } from '../../store/reducers'

interface InterLoginProps extends InterAbstractComponent {
  token: string
  [key:string]:any
}

class Login extends AbstractComponent<InterLoginProps, {}> {
  componentDidMount() {

    // this.props.token && this.props.location
  }
  render() {
    return (
      <div>login</div>
    )
  }
}

const mapStateToProps = (state: ICombinedState): InterUser => state.user

export default connect(
  mapStateToProps,
  {}
)(Login)
