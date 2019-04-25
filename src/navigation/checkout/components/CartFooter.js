import React, { Component } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { Text, Button, Icon, Footer } from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
import moment from 'moment'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

import { formatPrice } from '../../../Cart'
import CartFooterButton from './CartFooterButton'

const styles = StyleSheet.create({
  column: {
    flex: 1,
    justifyContent: 'center'
  },
  cartSummary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15
  },
  cartSummaryText: {
    color: '#fff',
    fontSize: 14
  },
  cartSummarySeparator: {
    paddingHorizontal: 5
  },
  cartSummaryTotal: {
    fontWeight: 'bold'
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  }
})

class CartFooter extends Component {

  constructor(props) {
    super(props)
    this.state = {
      opacityAnim: new Animated.Value(1)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.cart.total !== prevProps.cart.total) {
      this.animate()
    }
  }

  animate() {
    Animated.sequence([
      Animated.timing(this.state.opacityAnim, {
        toValue: 0.4,
        duration: 300,
      }),
      Animated.timing(this.state.opacityAnim, {
        toValue: 1,
        duration: 200,
      }),
    ]).start()
  }

  renderButton() {

    const { cart } = this.props

    if (cart.length === 0) {

      return (
        <View />
      )
    }

    if (cart.totalItems < cart.restaurant.minimumCartAmount) {

      return (
        <Button block transparent>
          <Icon style={{ color: '#fff', position: 'absolute', left: 0 }} name="information-circle" />
          <Text style={ styles.buttonText }>
            { `Minimum ${formatPrice(cart.restaurant.minimumCartAmount)} €` }
          </Text>
          <Text style={{ color: '#fff', position: 'absolute', right: 0, fontWeight: 'bold', fontFamily: 'OpenSans-Regular' }}>
            { `${formatPrice(cart.totalItems)} €` }
          </Text>
        </Button>
      )
    }

    return (
      <Button block onPress={ () => this.props.onSubmit() }>
        <Text style={{ position: 'absolute', left: 0, fontWeight: 'bold', fontFamily: 'OpenSans-Regular' }}>
          { `[${cart.length}]` }
        </Text>
        <Text>{ this.props.t('ORDER') }</Text>
        <Text style={{ position: 'absolute', right: 0, fontWeight: 'bold', fontFamily: 'OpenSans-Regular' }}>
          { `${formatPrice(cart.total)} €` }
        </Text>
      </Button>
    )
  }

  renderSummary() {

    const { opacityAnim } = this.state
    const { cart, date } = this.props

    return (
      <View style={ styles.cartSummary }>
        <Animated.View style={{ opacity: opacityAnim }}>
          <Text style={[ styles.cartSummaryText, styles.cartSummaryTotal ]}>
            { `${formatPrice(cart.total)} € (${cart.length})` }
          </Text>
        </Animated.View>
        <Text style={[ styles.cartSummaryText, styles.cartSummarySeparator ]}>|</Text>
        <Text style={[ styles.cartSummaryText ]}>{ moment(date).format('ddd LT') }</Text>
      </View>
    )
  }

  render() {

    const { cart } = this.props

    return (
      <Footer>
        <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 5, paddingVertical: 5 }}>
          <CartFooterButton cart={ cart } onPress={ () => this.props.onSubmit() } />
        </View>
      </Footer>
    )
  }
}

function mapStateToProps(state) {

  return {
    cart: state.checkout.cart,
    date: state.checkout.date,
  }
}

export default connect(mapStateToProps)(withNamespaces('common')(CartFooter))
