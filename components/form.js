import AMPonent from "amponent"

export default AMPonent.make("form-form", {
    render: function (box, props, el){

        const app = document.querySelector("app-app")

        return `<form id=${app.box.id} do=${app.box.action}>
        <input type=text value=${app.box.reminder}>
        <input type=checkbox ${app.box.completed ? "checked=true": ""}>
        <input type=submit value=submit>
        </form>`
    },
    after(box, props, el){
        const form = el.$s("form")
        form.addEventListener("submit", (event) => this.handleSubmit(event))
    },
    funcs: {
        handleSubmit(e){
            e.preventDefault()
            const app = document.querySelector("app-app")
            const text = this.$s("[type=text]")
            const checkbox = this.$s("[type=checkbox]")
            const todo = {reminder: text.value, completed: checkbox.checked}

            if(app.box.action === "create"){
                app.handleCreate(todo)
            }

            if (app.box.action === "update"){
                todo._id = app.box._id
                app.handleUpdate(todo)
            }
            
        }
    }
})