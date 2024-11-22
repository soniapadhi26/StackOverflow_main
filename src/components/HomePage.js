import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import "./HomePage.css";
import { FaRegCommentDots, FaRegEye, FaThumbsUp } from "react-icons/fa";

function HomePage() {
  // State declarations
  const [questions, setQuestions] = useState([]);
  const [filter, setFilter] = useState("interesting");
  const filters = ["interesting", "bountied", "hot", "week", "month"];
  const [fetchedQuestions, setFetchedQuestions] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch questions from the API
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true); // Set loading state
      const fetchedData = {};

      try {
        // Fetch questions for each filter type
        await Promise.all(
          filters.map(async (item) => {
            let response;
            if (item === "interesting") {
              response = await axios.get(
                `https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow`
              );
            } else if (item === "bountied") {
              response = await axios.get(
                `https://api.stackexchange.com/2.3/questions/featured?order=desc&sort=activity&site=stackoverflow`
              );
            } else {
              response = await axios.get(
                `https://api.stackexchange.com/2.3/questions?order=desc&sort=${item}&site=stackoverflow`
              );
            }
            fetchedData[item] = response.data.items;
          })
        );
        setFetchedQuestions(fetchedData); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false); // Reset loading state
      }
    };

    fetchQuestions();
  }, [filters]); // Include filters as a dependency to avoid stale closures

  // Update questions when the filter changes
  useEffect(() => {
    if (fetchedQuestions[filter]) {
      setQuestions(fetchedQuestions[filter]);
    }
  }, [filter, fetchedQuestions]);

  return (
    <div className="homepage">
      <Header />
      <Sidebar />

      <main className="main-content">
        {/* Top Section */}
        <div className="top-section">
          <h2>Top Questions</h2>
        </div>

        {/* Filters */}
        <div className="filters">
          {filters.map((item) => (
            <button
              key={item}
              className={`filter-button ${filter === item ? "active" : ""}`}
              onClick={() => setFilter(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
          <button className="ask-btn1">Ask Question</button>
        </div>

        {/* Questions */}
        <div className="questions">
          {loading ? (
            <p>Loading questions...</p>
          ) : questions.length > 0 ? (
            questions.map((question) => (
              <div className="question-card" key={question.question_id}>
                <h3>{question.title}</h3>
                <p>
                  {question.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </p>
                <div className="meta">
                  <span>
                    <FaThumbsUp className="icon" title="Votes" />{" "}
                    {question.score}
                  </span>
                  <span>
                    <FaRegCommentDots className="icon" title="Answers" />{" "}
                    {question.answer_count}
                  </span>
                  <span>
                    <FaRegEye className="icon" title="Views" />{" "}
                    {question.view_count}
                  </span>
                  {filter === "bountied" && question.bounty_amount && (
                    <span className="bounty">
                      Bounty: {question.bounty_amount} reputation (Closes:{" "}
                      {new Date(
                        question.bounty_closes_date * 1000
                      ).toLocaleString()}
                      )
                    </span>
                  )}
                </div>
                <span className="asked">
                  Asked{" "}
                  {new Date(question.creation_date * 1000).toLocaleString()}
                </span>
              </div>
            ))
          ) : (
            <p>No questions available.</p>
          )}
        </div>
      </main>

      <RightSidebar />
    </div>
  );
}

export default HomePage;
