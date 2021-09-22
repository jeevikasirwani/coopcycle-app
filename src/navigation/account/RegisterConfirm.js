import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content } from 'native-base'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'

import { confirmRegistration } from '../../redux/App/actions'
import { selectIsAuthenticated } from '../../redux/App/selectors'

class RegisterConfirm extends Component {
  componentDidMount() {
    const token = this.props.route.params?.token
    if (token) {
      this.props.confirmRegistration(token)
    }
  }

  render() {
    return (
      <Container>
        <Content padder contentContainerStyle={ styles.content } />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: selectIsAuthenticated(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    confirmRegistration: token => dispatch(confirmRegistration(token)),
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 15,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(RegisterConfirm))
