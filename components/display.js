import AMPonent from "amponent"

export default AMPonent.make("display-display", {
    render: function (box, props, el){

        const app = document.querySelector("app-app")

        const todos = app?.box?.todos

        const todohtml = todos?.map(todo => `
        <div>
        
        <h3 id=${todo._id}>${todo.reminder} - ${todo.completed ? "O" : "X"}</h3>
        <button id=${todo._id}>Delete</button>
        
        </div>`).join("")

        return `<article>
        ${todohtml}
        </article>`
    },
    after(box, props, el){
        const app = document.querySelector("app-app")

        const h3s = el.$sa("h3")
        const buttons = el.$sa("button")

        for (let h3 of h3s){
            h3.addEventListener("click", (event) => {
                const todo = app.box.todos.find(t => t._id === event.target.id)
                app.stuffBox({
                    showForm: true,
                    reminder: todo.reminder,
                    completed: todo.completed,
                    action: "update",
                    _id: todo._id,
                  })
            })
        }

        for (let button of buttons){
            button.addEventListener("click", (event) => {
                const todo = app.box.todos.find(t => t._id === event.target.id)
                app.handleDelete(todo)
            })
        }
    },
    box: {
        app: document.querySelector("app-app")
    }
})