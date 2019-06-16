import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import './Areas.scss'

export class AddItem extends Component<any,any> {
    state = {
        modal:false
    }
    titleRef:any;
    descriptionRef:any;

    constructor(props) {
      super(props);
      this.titleRef = React.createRef();
      this.descriptionRef = React.createRef();


    }
    addItem = ()=>{
        let area = {
            title:this.titleRef.value,
        }

    }
    toggle = () =>{
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
    render() {
        return (
            <div className='AddItem-container'>
            
          <Button className='btn btn-success text-white button-add' onClick={this.toggle}><span className="button-content">+</span></Button>
          <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Create an Item</ModalHeader>
            <ModalBody>
                <form  onSubmit={this.addItem} className=''>
                    <div className="form-group">
                        <input 
                            type="text" 
                            id='title' 
                            className="form-control"
                            name='title'
                            placeholder='Insert the name'
                            required    
                            min= '0'
                            ref = {input=>this.titleRef = input}
                    />
                    </div>
                    <Button className='btn btn-block ' type='submit' color="primary" >Add Item</Button>


                </form>
                
            </ModalBody>
          </Modal>
        </div>
        )
    }
}
export const mapDispatchProps = {
    
}
const mapStateToProps = (state) =>{
    return {

    };
}
export default connect(mapStateToProps,mapDispatchProps)(AddItem);
