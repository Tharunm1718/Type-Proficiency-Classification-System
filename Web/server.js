let express = require("express");
let app = express();
let path = require("path");
let axios = require("axios");

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
});

app.get("/", (req, res) => {
    res.render("main.ejs");
});

app.post("/", async (req, res) => {
    try {
        const typingData = req.body.userInput;

        const flaskResponse = await axios.post(
            "https://type-proficiency-classification-sys.vercel.app/api/predict",
            {
                typing_speed: typingData.typing_speed,
                avg_key_delay: typingData.avg_key_delay,
                backspace_count: typingData.backspace_count,
                pause_count: typingData.pause_count,
                error_rate: typingData.error_rate,
                total_time: typingData.total_time
            },
            {
                headers: { "Content-Type": "application/json" }
            }
        );
        const prediction = flaskResponse.data.typing_level;
        console.log("Prediction from Flask:", prediction);
        res.json({ typing_level: prediction });
    } catch (error) {
        console.error("Error calling Flask API:", error.message);
        res.status(500).json({ error: "ML prediction failed" });
    }
});

app.get("/about", (req, res) => {
    res.render("about.ejs", { level: req.query.level });
});