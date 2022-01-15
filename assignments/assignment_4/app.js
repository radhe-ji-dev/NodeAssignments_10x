const express = require("express");

// Connecting port
const app = express();

// Seting up the environment
app.set("view engine", "ejs");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.listen(3000, () => {
  console.log("Port 3000 is listening");
});
app.use(express.static(__dirname + "/public"));

// to use put and delete method over rides
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// Connecting Data Base
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/assignment_4", {})
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log(err));

// Making Schema for User
const userSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
    unique: true,
  },
  isPromoted: {
    type: "string",
    default: "Null",
  },
});

// Creating model for User Collection
const userCollection = new mongoose.model("User", userSchema);

// -------------------CRUD OPERATION STARTS-------------------------------------------

// READ: Reading documents of User Collection
const getDocsOfUser = async () => {
  try {
    const Docs = await userCollection.find();
    return Docs;
  } catch (err) {
    console.log(err);
  }
};

// Route Home
app.get("/", (req, res) => {
  getDocsOfUser().then((data) => {
    res.render("homepage.ejs", { data: data });
  });
});

// Route Form
app.get("/form", (req, res) => {
  res.render("form.ejs");
});

// CREAT: Inserting Values to the User collection
const insertDocToUser = async (doc) => {
  try {
    const Docs = new userCollection(doc);
    const res = await Docs.save();
  } catch (err) {
    console.log(err);
  }
};
// Handing Post request from Form
app.post("/users/add", (req, res) => {
  // console.log(req.body)
  const obj = {
    name: req.body.name,
    email: req.body.email,
    isPromoted: req.body.isPromoted,
  };
  insertDocToUser(obj);
  getDocsOfUser().then((data) => {
    res.redirect("/");
  });
});

// UPDATE: Updating the isPromoted field of document
const updateDocofUser = async (_id) => {
  try {
    userCollection.findOne({ _id: _id }, { isPromoted: 1 }).then((data) => {
      prevVal = data.isPromoted;
      if (prevVal == "true") {
        prevVal = "false";
      } else {
        prevVal = "true";
      }
      userCollection
        .findByIdAndUpdate(_id, { isPromoted: prevVal }, { new: true })
        .then((res) => {
          console.log(res);
        });
    });

    // const res = await userCollection.findByIdAndUpdate(id,{isPromoted:})
  } catch (err) {
    console.log(err);
  }
};
// Handeling put request

app.put("/users/:_id", (req, res) => {
  updateDocofUser(req.params._id);
  getDocsOfUser().then((data) => {
    res.redirect("/");
  });
});

//DELETING: Deleting doc User
const deleteDocofUser = async (_id) => {
  userCollection
    .findByIdAndDelete(_id)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Handling delete request

app.delete("/users/:_id", (req, res) => {
  deleteDocofUser(req.params._id).then((data) => {
    res.redirect("/");
  });
});
