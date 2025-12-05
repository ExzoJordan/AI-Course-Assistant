AI Course Assistant Project

This AI course assistant scan copied syllubus text and gives assignment deadlines, summaries of those assignments, and gives advice
on what practices to use to help you be successful in the class. This project demonstrates the intergration of AI as a support tool to help students
stay on track with their course work

TECH STACK

Frontend: React
Backend: Flask 
AI Processing: Groq model
I used VS code with the help of AI to create and edit the code.

HOW TO RUN THE PROJECT

1.)Clone git repository and download the files
2.)Run backend by opening terminal on the backend folder (cd backend)
3.)install the requirements (pip install -r requirements.txt)
4.) Inside backend create .env file containing (GROQ_API_KEY=REPLACE_WITH_YOUR_KEY) - Due to security reasons I cannot disclose my API key so you would 
have to create your own on the groq website.
5.)Run the backend server using (python app.py)

6.)Open a terminal for the frontend folder (cd frontend)
7.) install dependencies using (npm install)
8.)Run frontend using (npm start)

Project should run locally on your computer.

HOW TO USE THE WEBSITE

1.)Copy and paste syllubus text into the UI
2.)Click the submission button
3.) The AI will analyze and give deadlines,summaries, and class success tips in the output.




