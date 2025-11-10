const express = require("express");
const users = require("./MOCK_USERS_DATA.json")

const app = express();
const PORT = 8000;

// End Points
app.get("/",
  (req, res) => {
    return res.send(`Go to "/users".`)
  }
);

// GET /users - Render HTML Doc
app.get("/users",
  (req, res) => {
    const html = `
      <ul>
        ${users.map((user) => `
          <li>${user.name}</li>
          <li>${user.gender}</li>
          <li>${user.email}</li>
        `)}
      </ul>
    `;
    res.send(html);
  }
);

// GET /users - List all users
app.get("/api/users",
  (req, res) => {
    return res.json(users);
  }
);

// GET /users/[id] - Get the user with [id]
app.get("/api/users/:id",
  (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    const response = user ? user : `No user with this id: ${id} found.`;
    return res.json(response);
  }
);

// POST /api/users - Create new user
app.post("/api/users",
  (req, res) => {
    console.log("POST - Status Pending")
  }
);

// PATCH /api/user/[id] - Edit the user with [id]
app.patch("/api/user/:id",
  (req, res) => {
    const id = Number(req.params.id);
    console.log(`PATCH - Status Pending for id:${id}`);
  }
);

// DELETE /api/users/[id] - Delete the user with [id]
app.delete("/api/user/:id",
  (req, res) => {
    const id = Number(req.params.id);
    console.log(`DELETE - Status Pending for id:${id}`);
  }
);

////////////////////////////////
// Combine similar end points //
////////////////////////////////
// app
//   .route("/api/user/:id")
//   .get((req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find(user => user.id === id);
//     const response = user ? user : `No user with this id: ${id} found.`;
//     return res.json(response);
//   })
//   .put((req, res) => {
//     const id = Number(req.params.id);
//     console.log(`PUT - Status Pending for id:${id}`);
//   })
//   .delete((req, res) => {
//     const id = Number(req.params.id);
//     console.log(`DELETE - Status Pending for id:${id}`);
//   })

app.listen(PORT, () => {
  console.log("Server running at Port:", PORT);
})