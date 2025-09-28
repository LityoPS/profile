import React, { useState } from "react";
import "./App.css";
import ProjectModal from "./ProjectModal";
import proj1 from "./assets/proj1.png";
import proj2 from "./assets/proj2.png";
import proj3 from "./assets/proj3.png";
import proj4 from "./assets/proj4.png";
import proj5 from "./assets/proj5.png";

export default function ProjectGrid() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      title: "Financial Tracker Website with AI Forecasting",
      img: proj1,
      tools: "Python, LSTM, Flask, React, Node.js, MongoDB, Github, Figma",
      description:
        "A website that helps user manage their finances by having essential features like income/expense tracking, organized through categories and visualized through graphs for insight on users’ earnings and spendings. It incorporates several AI features, most notably an income/expense predictor that forecasts the user’s upcoming financial trends. The application also includes several additional features, such as notes, a timer, and more, to support the user’s daily activities.",
      contributors: ["Fernando Gunawan", "Nicholas Tristan", "Ignatius Kevin Wijaya", "Akmal Hendrian Malik"],
    },
    {
      title: "Traffic Sign Recognition using CNN",
      img: proj2,
      tools: "Python, TensorFlow, CNN, Flask, React, Node.js, Google Colab, Github",
      description:
        "A website that helps user to identify and understand traffic signs. Users can upload an image of a traffic sign, which is then classified into the trained categories of traffic sign data using a CNN-based model. Once identified, It then uses a pre-trained LLM to generate informative descriptions of the recognized traffic signs.",
      contributors: ["Vincentius Jacob Gunawan", "Ravellino Suwandi"],
    },
    {
      title: "Research Paper on Battery SoH Prediction",
      img: proj3,
      tools: "Microsoft Word, Mendeley",
      description:
        "A paper that evaluates several machine learning  models (Random Forest, XGBoost, SVM) using NASA’s dataset of Li-ion batteries to determine which ML model performs best at predicting a battery’s State of Health (SoH). This prediction is crucial for identifying when a battery is no longer suitable for use (< 80% SoH).",
      notes: "Accepted Research Paper by GECOST - Pending Presentation",
      contributors: ["Fernando Gunawan", "Pieter Allen"],
    },
    {
      title: "Violence Detection System using CNN",
      img: proj4,
      tools: "Python, TensorFlow, CNN, HTML, CSS, JavaScript, Flask",
      description:
        "A web application that asks the user to upload a video to analyze. The program proceeds to detect violence by using a CNN-based model and records each timestamp that contains the predicted violence. It also generates a copy of the video with subtitles either overlayed with  “Violence Detected” or “NonViolence Detected” for each frame of the video.",
      contributors: ["Jovan Keane Christiantio", "Ronald Wong"],
    },
    {
      title: "Static Food Catering Website",
      img: proj5,
      tools: "HTML, CSS, JavaScript, Figma",
      description:
        "A simple static website that has a Homepage, About Us, Register, Testimonials, and Products pages. It is built using  HTML, CSS, and JavaScript to create a responsive and functional frontend.",
      notes: "Includes prediction graph.",
    },
  ];


  return (
    <>
      <div className="project-grid">
        {projects.map((p, i) => (
          <div
            key={i}
            className="project-card"
            onClick={() => setSelectedProject(p)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setSelectedProject(p);
            }}
          >
            <img src={p.img} alt={p.title} />
            <div className="overlay">
              <span>{p.title}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Portal modal is rendered outside normal DOM stacking via the component */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

