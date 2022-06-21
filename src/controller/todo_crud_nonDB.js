let todos = [
  { id: 1, name: "Ahmad AfifM", isDone: true },
  { id: 2, name: "Azerino Yoga", isDone: false },
  { id: 3, name: "Wira Sableng", isDone: false },
  { id: 4, name: "Debby Idha", isDone: true },
];

// Template
// try {
//   res.send({

//   });
// } catch (error) {
//   console.log(error);
//   res.send({
//     status: "failed!",
//     message: "Server Error!",
//   });
// }

exports.getTodos = async (req, res) => {
  try {
    res.send({
      status: "success!",
      data: todos,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed!",
      message: "Server Error!",
    });
  }
};

exports.getTodo = async (req, res) => {
  try {
    const id = req.params.id;

    const data = todos.find((todo) => todo.id == id);

    if (!data) {
      res.send({
        status: `Failed !`,
        message: `Data id:${id} Not Found !`,
      });
    } else {
      res.send({
        status: "success!",
        data: data,
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed!",
      message: "Server Error!",
    });
  }
};

exports.addTodo = async (req, res) => {
  try {
    const data = req.body;

    todos.push(data);

    res.send({
      status: "success!",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed!",
      message: "Server Error!",
    });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    todos = todos.map((todo) => {
      if (todo.id == id) {
        return data;
      } else {
        return todo;
      }
    });

    res.send({
      status: "success!",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed!",
      message: "Server Error!",
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    todos = todos.filter((todo) => todo.id != id);
    res.send({
      status: `Success !`,
      message: `delete data id:${id} !`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed!",
      message: "Server Error!",
    });
  }
};
