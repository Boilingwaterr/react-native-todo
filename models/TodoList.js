const {Schema, model, Types} = require('mongoose');

const toDoSchema = new Schema({
    // taskId: {type: Types.ObjectId, required: true, unique: true},
    title: {type: String, required: true},
    task: {type: String, required: true},
    isImportant: {type: Boolean, default: false},
    date: {type: Date, default: Date.now},
    isComplete: {type: Boolean, default: false},
    owner: [{ type: Types.ObjectId, ref: 'User' }]
});


module.exports = model('ToDoList', toDoSchema);