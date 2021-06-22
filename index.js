const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const TodoTask = require("./models/TodoTask");
const routes = require("./routes");

const addPost = document.querySelector('.todo-header');

dotenv.config();


app.use("/static", express.static("public"));

app.use(express.urlencoded({ extended: true }));

//connection to db
mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    console.log(err)
    console.log("Connected to db!");
    app.listen(4000, () => console.log("Server Up and running"));
});

// view engine configuration
app.set("view engine", "ejs");

routes(app);

// POST METHOD
// app.post('/',async (req, res) => {
//     const todoTask = new TodoTask({
//         content: req.body.content
//     });
//     try {
//         await todoTask.save();
//         res.redirect("/");
//     } catch (err) {
//         res.redirect("/");
//     }
// });


// Post

addPost.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('/todos', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        }
        body: JSON.stringify({
            content: contentValue.value
        });
    }).then(res => res.json())
        .then(data => {
            const dataArr = [];
            dataArr.push(data);
            listHtml(dataArr);
        });
});


// UPDATE
// app
//     .route("/edit/:id")
//     .get((req, res) => {
//         const id = req.params.id;
//         TodoTask.find({}, (err, tasks) => {
//             res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
//         });
//     })
//     .post((req, res) => {
//         const id = req.params.id;
//         TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
//             if (err) return res.send(500, err);
//             res.redirect("/");
//         });
// });




//DELETE



// app.delete("/todos", (req, res) => {
//     const id = req.params.id;
//     TodoTask.findByIdAndRemove(id, err => {
//         if (err) return res.send(500, err);
//         res.redirect("/");
//     });
// });
const tasksListEllement = document.getElementById('tasksList');

tasksListEllement.addEventListener('click', ()=>{
    e.prevetDefault();
    let delButtonPressed = e.target.id == 'delete-task';
    let editButtonPressed = e.target.id == 'edit-task';

  
   //delete
   if (delButtonPressed){
       fetch('/remove/:id', {method: 'DELETE'})
   }

   if (editButtonPressed){
       let taskContent = parent.querySelector('.todo-list-item-name').textContent;

       tasksListEllement.value = taskContent;
      tasksList fetch('/edit/:id', {method: 'PUT'})
   }


})   