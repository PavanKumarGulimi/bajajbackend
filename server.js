const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.post("/bfhl", (req, res) => {
  console.log(req.body);
  const requestBody = req.body;

  const alpha = requestBody.data.filter((a) => isNaN(a));
  console.log(alpha);
  const nums = requestBody.data.filter((a) => !isNaN(a));
  console.log(nums);

  return res.json({
    is_success: true,
    user_id: "pavan",
    college_email_id: "pavan@srmap.edu.in",
    college_roll_no: "AP21110011319",
    numbers: nums,
    alphabets: alpha,
  });
});
app.get("/bfhl", (req, res) => {
  return res.json({ operation_code: 1 });
});

app.listen(3000, () => {
  console.log(`Server running on port ${3000}`);
});