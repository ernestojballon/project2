import React, { Component } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom';
import './Areas.scss'
import AddArea from './AddArea';
import  AddItem  from './AddItem';
import EditButton from './ActionButtons/EditButton';
import DeleteButton from './ActionButtons/DeleteButton';
import { IStoreState, ILoginState, IStateArea, IStateInventory } from '../../reducers/globalState.models.';
import { connect } from 'react-redux';
import {Spinner} from 'reactstrap'
// import { mapDispatchProps } from '../inventory/ActionsButtons/ShareButton';
import { statement } from '@babel/template';
import { getAreasByInventoryIdAction } from '../../actions/area.action'



interface IAreaProps extends RouteComponentProps{
    loginState:ILoginState,
    listAreaState:IStateArea[],
    getAreasByInventoryIdAction:any
    inventoryState: IStateInventory
    
    
}
export class Areas extends Component<IAreaProps, any> {


    componentDidMount = async ()=>{
        if(this.props.loginState.isAuthenticated){
            
            let invId = this.props.inventoryState.id
            this.props.getAreasByInventoryIdAction(invId)
            
        }else{
            console.log(`i'm not authenticated`)
            localStorage.removeItem('loginUser')
            this.props.history.push('/')
        }
    }
    componentDidUpdate(){
        // console.log('updated::',this.props)
        // this.areas()
    }
    render() {
        let lst
        if (this.props.listAreaState != undefined){
            // console.log('ready to print',[...this.props.listAreaState]) 
            lst = [...this.props.listAreaState].map((i:IStateArea)=>
                (
                <div key ={i.id} className="card card-container">
                    <div className="card-header d-flext pt-3">
                        <h5 className="card-title mr-auto"> {i.name}</h5>
                        <p className="card-text">{i.description}</p>

                        <AddItem classname="modalAddInventory"/>
                        
                    </div>
                    <div className="card-body">
                        {i.items[0] && i.items.map((item) => (
                            <div key = {item.id} className="item">
                                <div className="d-flex align-items-center ">
                                    {item.name}
                                    <div className="ml-auto d-flex align-items-center my-3">
                                        <EditButton/><DeleteButton/>        
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
                )
            )
        }
        console.log(`lst: ${lst}`)
        return (
            <div className='container Inventories-container mt-5'>
                <div className="header d-flex flex-row">
                    <p className="display-4">{this.props.inventoryState.name}</p>
                    <AddArea className="modalAddArea" buttonLabel='Add Area' />
                </div>
                
                <div className="inventories-container p-3">
                        {(this.props.listAreaState[0] && lst ) || <span className="lead">No Areas in this inventory yet.</span>}
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state:IStoreState) =>{
    
    return {
        loginState: state.loginState,
        inventoryState: state.currentInventoryState,
        listAreaState: state.listAreaState
    }
}

const mapDispatchToProps = {
    getAreasByInventoryIdAction: getAreasByInventoryIdAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Areas);