const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const processData = (data) => {
    let numbers = [];
    let alphabets = [];
    let highestLowercase = null;

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (isNaN(item) && typeof item === 'string') {
            alphabets.push(item);
            if (item === item.toLowerCase() && (!highestLowercase || item > highestLowercase)) {
                highestLowercase = item;
            }
        }
    });

    return { numbers, alphabets, highestLowercase };
};

const upload = multer();

app.post('/bfhl', upload.single('file'), (req, res) => {
    const { data, file_b64 } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: "Invalid data array" });
    }

    const { numbers, alphabets, highestLowercase } = processData(data);


    let fileValid = false;
    let fileMimeType = null;
    let fileSizeKB = null;
    
    if (file_b64) {
        const fileBuffer = Buffer.from(file_b64, 'base64');
        fileSizeKB = (fileBuffer.length / 1024).toFixed(2);
        fileMimeType = "unknown"; 
        fileValid = true;
    }

    res.json({
        is_success: true,
        user_id: "pavan_kumar_gulimi_03062003",
        email: "pavankumar_gulimi@srmap.edu.in",
        roll_number: "AP21110011319",
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKB
    });
});


app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});