# **🧠 Typing Behavior Analysis Using Machine Learning**

## **📌 Project Overview**

This project analyzes a user’s typing behavior in real-time and classifies their typing proficiency as **Beginner**, **Intermediate**, or **Advanced** using a machine learning classification model.

Unlike traditional typing tests that focus only on speed (WPM), this system evaluates behavioral patterns such as pauses, corrections, flight time, and typing rhythm to provide a holistic assessment.

## **🎯 Objectives**

* **Capture Data:** Collect real-time keystroke dynamics through a web interface.  
* **Analyze:** Extract meaningful behavioral features from raw input.  
* **Classify:** Use a Random Forest Classifier to determine proficiency.  
* **Visualize:** Display results via an interactive, user-friendly UI.

## **🛠️ Tech Stack**

| Component | Technologies |
| :---- | :---- |
| **Frontend** | HTML5, CSS3, JavaScript, EJS (Templating) |
| **Backend** | Node.js, Express.js |
| **ML API** | Python, Flask |
| **Machine Learning** | scikit-learn, NumPy, Joblib |

## **🧩 System Architecture**

The data flows from the user's browser through the Node.js middleware to the Python ML engine for prediction.

graph TD;  
    User\[User / Browser\] \--\>|Typing Data| Frontend\[Frontend Interface\];  
    Frontend \--\>|Raw JSON Data| Node\[Node.js \+ Express Middleware\];  
    Node \--\>|Forward Data| Flask\[Flask ML API\];  
    Flask \--\>|Feature Extraction| Model\[Random Forest Model\];  
    Model \--\>|Prediction Class| Flask;  
    Flask \--\>|Result| Node;  
    Node \--\>|Render UI| User;

## **📊 Feature Extraction**

The system calculates specific behavioral metrics beyond simple speed:

* **Typing Speed (CPM):** Characters per minute.  
* **Average Key Delay:** The average time gap (latency) between key presses.  
* **Backspace Count:** The frequency of error corrections.  
* **Pause Count:** Number of significant halts during typing.  
* **Error Rate:** The ratio of backspaces/deletes to total keystrokes.  
* **Total Time:** The total duration taken to complete the paragraph.

## **🤖 Machine Learning Model**

* **Model Type:** Supervised Classification  
* **Algorithm:** Random Forest Classifier  
* **Why Random Forest?**  
  * Handles non-linear feature interactions effectively.  
  * Robust against noise and overfitting.  
  * Highly suitable for tabular behavioral data.

### **Target Classes**

1. **Beginner** 🐢  
2. **Intermediate** 🐇  
3. **Advanced** 🚀

## **▶️ How to Run the Project**

Follow these steps to set up the project locally.

### **1️⃣ Clone the Repository**

git clone \[https://github.com/your-username/typing-behavior-analysis.git\](https://github.com/your-username/typing-behavior-analysis.git)  
cd typing-behavior-analysis

### **2️⃣ Setup Flask ML API (Python)**

Navigate to the machine learning directory and install dependencies.

cd model  
pip install \-r requirements.txt  
python app.py

*The Flask server typically runs on http://localhost:5000*

### **3️⃣ Run Node.js Server (Backend)**

Open a new terminal, navigate to the server directory, and start the app.

cd server  
npm install  
node server.js

*The Node server typically runs on http://localhost:3000*

### **4️⃣ Access the Application**

Open your web browser and go to:  
http://localhost:3000

## **🔄 Workflow**

1. **Input:** User types a specific paragraph displayed on the web interface.  
2. **Capture:** JavaScript listeners capture keydown/keyup timestamps.  
3. **Processing:** Features are computed and sent to the Node.js server.  
4. **Prediction:** Node.js forwards data to the Flask API, where the Random Forest model predicts the level.  
5. **Output:** The result is returned and displayed on the results card.

## **⚠️ Limitations**

* **Fixed Content:** Currently uses a static paragraph for analysis.  
* **Dataset:** Trained on a limited dataset; accuracy may vary for edge cases.  
* **Context:** Does not currently account for physical user conditions (e.g., fatigue).

## **🔮 Future Enhancements**

* \[ \] Integrate text accuracy/semantic analysis into the ML model.  
* \[ \] Implement adaptive difficulty for typing paragraphs.  
* \[ \] Collect a larger, real-world dataset to improve model precision.  
* \[ \] Add user authentication to track performance over time.

## **🎓 Academic Relevance**

This project serves as a practical demonstration of:

* Full-stack web development (connecting Node.js and Python).  
* Real-time data capture and processing.  
* Applied Machine Learning integration in web apps.  
* RESTful API system design.

## **🙏 Acknowledgements**

* [Scikit-learn Documentation](https://scikit-learn.org/)  
* [Flask Documentation](https://flask.palletsprojects.com/)  
* [Express.js Documentation](https://expressjs.com/)

\<p align="center"\>  
Made with ❤️ by \[Your Name/Team Name\]  
\</p\>