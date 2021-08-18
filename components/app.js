import "./display";
import "./form";
import AMPonent from "amponent";

export default AMPonent.make("app-app", {
  render: function (box, props, el) {
    return `<main>
        <h1>Alex's Todo App</h1>
        <button>Create Todo</button>
        <display-display></display-display>
        ${box.showForm ? `<form-form></form-form>` : ""}
        </main>`;
  },
  box: {
    todos: [],
    showForm: false,
    url: "http://localhost:10000/todos",
    reminder: "",
    completed: false,
    action: "create",
    _id: "",
  },
  after(box, props, el) {
    el.$s("button").addEventListener("click", () => this.toggleForm());
  },
  firstBefore(box, props, el) {
    console.log("cheese");
    el.getTodos();
  },
  funcs: {
    async getTodos() {
      const box = this.box;

      const response = await fetch(box.url);
      const data = await response.json();

      this.stuffBox({ todos: data });
    },
    toggleForm() {
      this.stuffBox({ showForm: !this.box.showForm });
    },
    resetState() {
      this.stuffBox({
        showForm: false,
        reminder: "",
        completed: false,
        action: "create",
        _id: "",
      });

      this.getTodos();
    },
    async handleCreate(todo) {
      console.log("weee");
      await fetch(this.box.url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });

      this.resetState();
    },
    async handleUpdate(todo) {
      await fetch(this.box.url + `/${todo._id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });

      this.resetState();
    },
    async handleDelete(todo) {
        await fetch(this.box.url + `/${todo._id}`, {
          method: "delete",
        });
  
        this.resetState();
      },
  },
});
