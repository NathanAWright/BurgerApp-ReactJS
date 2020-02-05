import React, { Component } from "react";
import Aux from '../../hoc/Auxilary/Auxilary';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state={...};
    // }
    //the above is the older version of the following
    state = {
        purchasing: false
    }
    componentDidMount () {
        this.props.onInitIngredients();
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        // alert('Continue');
        // const queryParams = [];
        // for (let i in this.props.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]));
        // }
        // queryParams.push('price='+this.state.totalPrice);
        // const queryString = queryParams.join('&');
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    updatePurchaseState = (ingredients) => {
        // const ingredients = {
        //     ...this.props.ingredients
        // }; //this didn't work because the purchasable button doesn't update in time
        const sum = Object.keys(ingredients).map(ingredientKey => {
            return ingredients[ingredientKey];//returns the corresponding number value for each key
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum > 0;
    }
    
    render() {
        const disabledInfo = {
            ...this.props.ingredients
        }
        // console.log(
        //     'BURGER BUILDER INGREDIENTS ARE: ', this.props.ingredients
        // );
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        // console.log('BURGER BUILDER PROPS: ', this.props);
        if (this.props.ingredients){
            burger = <Aux>
                <Burger ingredients={this.props.ingredients} />
                <BuildControls
                    ingredientRemoved={this.props.onRemoveIngredient}
                    ingredientAdded={this.props.onAddIngredient}
                    disabled={disabledInfo}
                    price={this.props.totalPrice}
                    purchasable={this.updatePurchaseState(this.props.ingredients)}
                    ordered={this.purchaseHandler}
                />
            </Aux>;
            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                price={this.props.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />;
        }
        // if (this.state.loading) {
        //     orderSummary = <Spinner />;
        // }
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onRemoveIngredient: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));