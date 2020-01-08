import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from "../Auxilary/Auxilary";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {// returning a class (so it's a "class factory")
        state = { 
            error: null
        }
        UNSAFE_componentWillMount(){ //alternatively use a constructor since this is discontinued
            this.reqInterceptor = axios.interceptors.request.use(req =>{
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error=> {
                this.setState({error: error});
            });
        }
        componentWillUnmount () {
            console.log('Will unmount', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor); 
            axios.interceptors.response.eject(this.resInterceptor);
        }//because if these interceptors are used in multiple places then multiple classes will be made and can cause errors
        errorConfirmedHandler = () => {
            this.setState({error: null});
        }
        render (){
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}    
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    };
}

export default withErrorHandler;