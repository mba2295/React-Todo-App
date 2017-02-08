var InputComponent = React.createClass({
    onButtonClicked: function (e) {
        e.preventDefault();

        var task = this.refs.task.value;
        if (task.length > 0) {
            this.props.onNewTask(task);
            this.refs.task.value = '';
        }

    },
    render: function () {
        return (
            <div className="row">
                <form className="form-group col-xs-6 col-xs-push-3" onSubmit={this.onButtonClicked}>
                    <h4 className="text-center">Task</h4>
                    <textarea ref="task" className="form-control" rows="5"/>
                    <br/>
                    <button className="pull-right"><i className="glyphicon glyphicon-plus"></i></button>
                </form>
            </div>
        );
    },
});

var ListItem = React.createClass({
    _deleteTask: function (task, e) {
        e.preventDefault();
        this.props.onDelete(task);

    },
    _editButtonClick: function (e) {
        e.preventDefault();
        this.setState({
            edit: true,
        });
    },
    _saveTask: function (e) {
        e.preventDefault();
        var task = this.props.task;
        task.task = this.refs.edited.value;
        this.props.onEdit(task);
        this.setState({
            edit: false,
        });

    },
    _addClass: function (e) {
        var t;
        if (e.srcElement) t = e.srcElement.parentNode;
        else if (e.target) t = e.target.parentNode.parentNode;
        t.style.backgroundColor = "#4CAF50";
    },

    getInitialState: function () {
        return ({
            edit: false,
        });
    },

    render: function () {
        if (!this.state.edit) {
            return (
                <li className="list-group-item">{this.props.task.task}{'  '}
                    <button className="pull-right" onClick={this._addClass}><i
                        className="glyphicon glyphicon-ok"></i>
                    </button>
                    <button className="pull-right" onClick={this._deleteTask.bind(this, this.props.task)}><i
                        className="glyphicon glyphicon-remove"></i></button>
                    <button className="pull-right" onClick={this._editButtonClick}><i
                        className="glyphicon glyphicon-edit"></i></button>
                </li>
            );
        }
        else {
            return (
                <form onSubmit={this._editTask}>
                    <input ref="edited" type="text" defaultValue={this.props.task.task}/>
                    <button className="pull-right" onClick={this._saveTask}><i
                        className="glyphicon glyphicon-saved"></i></button>

                </form>
            );
        }
    },
});

var TaskList = React.createClass({
    displayName: 'List',


    _deleteTask: function (task) {
        var taskList = this.props.tasks;
        var updatedTasks = taskList.filter(function (filterTask) {
            return filterTask.key !== task.key;
        });

        this.props.onDeleteTask(updatedTasks);

    },

    _editTask: function (task) {
        var taskList = this.props.tasks;
        var editedTasks = taskList.filter(function (filterTask) {
            if (filterTask.key == task.key)
                return (task);
            else
                return filterTask;

        });

        this.props.onDeleteTask(editedTasks);

    },
    render: function () {
        var taskList = this.props.tasks;
        return (
            <div className="row">
                <ul className="list-group col-xs-6 col-xs-push-3">
                    {taskList.map(function (task, i) {
                        return (
                            <div key={task.key}>
                                <ListItem task={task} onDelete={this._deleteTask} onEdit={this._editTask}></ListItem>
                            </div>
                        );
                    }.bind(this))}
                </ul>
            </div>


        );
    }
});

var HelloContainer = React.createClass({

    _handleNewUpdate: function (task) {
        var tasksArray = this.state.tasks;
        tasksArray.push({
            task: task,
            key: Date.now(),
        });
        this.setState({
            tasks: tasksArray,
        });
    },
    _handleDelete: function (tasksArray) {
        this.setState({
            tasks: tasksArray,
        });
    },


    getInitialState: function () {
        return ({
            tasks: [],
            edit: false,

        });
    },

    render: function () {
        return (
            <div className="container">
                <h2 className="text-center">React ToDo App</h2>
                <div>
                    <InputComponent onNewTask={this._handleNewUpdate}></InputComponent>
                    <TaskList onDeleteTask={this._handleDelete} edit={this.state.edit}
                              tasks={this.state.tasks}></TaskList>
                </div>
            </div>
        );
    }

});

ReactDOM.render(<HelloContainer/>, document.getElementById('main'));
