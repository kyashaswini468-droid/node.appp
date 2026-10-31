const express = require("express");
const app = express();

app.use(express.json());

let students = [
    { id: 1, name: "Asha", age: 19 },
    { id: 2, name: "Ravi", age: 20 },
];

let nextId = 3;

// READ all students (optional filter: /students?age=20)
app.get("/students", (req, res) => {
    const { age } = req.query;

    if (age) {
        return res.json(
            students.filter((s) => s.age === Number(age))
        );
    }

    res.json(students);
});

// READ one student
app.get("/students/:id", (req, res) => {
    const student = students.find(
        (s) => s.id === Number(req.params.id)
    );

    if (!student) {
        return res.status(404).json({ error: "Student not found" });
    }

    res.json(student);
});

// CREATE
app.post("/students", (req, res) => {
    const { name, age } = req.body;

    if (!name || !age) {
        return res.status(400).json({
            error: "Name and age are required",
        });
    }

    const student = { id: nextId++, name, age };
    students.push(student);

    res.status(201).json(student);
});

// UPDATE
app.put("/students/:id", (req, res) => {
    const student = students.find(
        (s) => s.id === Number(req.params.id)
    );

    if (!student) {
        return res.status(404).json({ error: "Student not found" });
    }

    student.name = req.body.name ?? student.name;
    student.age = req.body.age ?? student.age;

    res.json(student);
});

// DELETE
app.delete("/students/:id", (req, res) => {
    const index = students.findIndex(
        (s) => s.id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({ error: "Student not found" });
    }

    students.splice(index, 1);

    res.json({ message: "Student deleted" });
});

// Start server
app.listen(3000, () => {
    console.log("API running on port 3000");
});