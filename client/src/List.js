import React, {Component} from 'react';
import { getList, addTodo, UpdateTodo, DeleteTodo } from './ListFunction';

class List extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            term: '',
            jbt: '',
            editDisable: false,
            items: []
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onSubmit = this.onChange.bind(this)
    }
    componentDidMount() {
        this.getAll()
    }
    onChange = e => {
        this.setState({
            term: e.target.value,
            jbt: e.target.value,
            editDisable: 'disable'
        })
    }
    getAll = () => {
        getList().then(data => {
            this.setState({
                term: '',
                jbt: '',
                items: [...data]
            },
            () => {
            console.log(this.state.term)
            })
        })
    }

    onSubmit = e => {
        e.preventDefault()
        this.setState({editDisable: ''})
        addTodo(this.state.term, this.state.jbt).then(() => {
            this.getAll()
        })
    }

    onUpdate = e => {
        e.preventDefault();
        UpdateTodo(this.state.term, this.state.jbt, this.state.id).then(() => {
            this.getAll();
        })
    }

    onEdit = (item, itemid, itemj, e) => {
        e.preventDefault();
        this.setState({
            id: item,
            term: itemid,
            jbt: itemj
        })
        console.log(item);
    }
    onDelete = (val, e) => {
        e.preventDefault();
        DeleteTodo(val)
        var data = [...this.state.items]
        data.filter((item, index) => {
            if(item[1] && item[2] === val) {
                data.splice(index, 1)
            } 
            return true
        })
        this.setState({items: [...data]})
    }
    render() {
        return (
             <div className="col-md-12">
                 <form onSubmit={this.onSubmit}>
                     <div className="form-group">
                         <label>Task Name</label>
                         <div className="row">
                             <div className="col-md-9">
                                 <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Nama Anda"
                                    value={this.state.term || ''}
                                    onChange={this.onChange.bind(this)} />
                            </div>
                            <div className="col-md-9">
                                 <input
                                    type="text"
                                    className="form-control mb-2"
                                    id="input2"
                                    placeholder="Jabatan Anda"
                                    value={this.state.jbt || ''}
                                    onChange={this.onChange.bind(this)} />
                             </div>
                             <div className="col-md-12">
                                 <button className="btn btn-primary" onClick={this.onUpdate.bind(this)}>
                                     Update
                                 </button>
                             </div>
                         </div>
                     </div>
                     <button className="btn btn-success btn-block" type="submit" onClick={this.onSubmit.bind(this)}>
                         Submit
                     </button>
                 </form>
                 <div className="table table-sm table-bordered">
                     <tbody>
                            {this.state.items.map((item,index) =>
                            <tr key={index}>
                                <td className="text-left">{item[0]}</td>
                                <td className="text-left">{item[1]}</td>
                                <td className="text-left">{item[2]}</td>
                                <td className="text-right">
                                <button className="btn btn-info mr-1" disabled={this.state.editDisable}
                                    onClick={this.onEdit.bind(this, item[0], item[1], item[2])}>Edit</button>
                                <button className="btn btn-danger mr-1" disabled={this.state.onDelete}
                                    onClick={this.onDelete.bind(this, item[1], item[2])}>Hapus</button>
                                </td>
                            </tr>
                         )}
                     </tbody>
                 </div>
             </div>
        );
    }
}

export default List;