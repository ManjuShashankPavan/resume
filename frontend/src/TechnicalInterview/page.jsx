import React, { useState, useEffect } from "react";
import parse from "html-react-parser";

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");
  const [problem, setProblem] = useState(null);
  const [problemStatement, setProblemStatement] = useState("");

  const fetchProblem = async () => {
    try {
      const res = await fetch("https://codeforces.com/api/problemset.problems");
      const data = await res.json();
      const problems = data.result.problems;
      const random = problems[Math.floor(Math.random() * problems.length)];
      setProblem(random);
      setCode(`function solve() {\n  // Your code here\n}`);
      setOutput("");
      setStatus("");
      fetchProblemStatement(random.contestId, random.index);
    } catch (error) {
      console.error("Failed to fetch problem:", error);
    }
  };

  const fetchProblemStatement = async (contestId, index) => {
    try {
      const url = `https://codeforces.com/contest/${contestId}/problem/${index}`;
      const response = await fetch(url);
      const html = await response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const statement = doc.querySelector(".problem-statement");
      setProblemStatement(statement ? statement.innerHTML : "<p>Problem statement not found.</p>");
    } catch (error) {
      console.error("Failed to fetch problem statement:", error);
      setProblemStatement("<p>Error loading problem statement.</p>");
    }
  };

  useEffect(() => {
    fetchProblem();
  }, []);

  const handleChange = (e) => {
    setCode(e.target.value);
    setOutput("");
    setStatus("");
  };

  const runCode = () => {
    try {
      const result = new Function(code)();
      setOutput(String(result));
      setStatus("✅ Run Successful");
    } catch (err) {
      setOutput("Error: " + err.message);
      setStatus("❌ Error");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#0f1117] font-sans text-white">
      {/* Left - Problem Statement & Editor */}
      <div className="w-full md:w-1/2 p-6 border-b-2 md:border-b-0 md:border-r-2 border-gray-700 overflow-y-auto">
        <div className="mb-4">
          <h2 className="text-cyan-300 text-xl mb-1">🧩 Problem</h2>
          {problem ? (
            <div>
              <h3 className="font-semibold">{problem.name}</h3>
              <div className="mt-2 text-sm text-gray-300">
                {parse(problemStatement)}
              </div>
            </div>
          ) : (
            <p>Loading problem...</p>
          )}
        </div>
        <button
          className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded"
          onClick={fetchProblem}
        >
          🔀 Get New Problem
        </button>
      </div>

      {/* Right - Code Editor & Output */}
      <div className="w-full md:w-1/2 p-6">
        <h2 className="text-cyan-300 text-xl mb-2">🧠 Code Editor</h2>
        <textarea
          className="w-full h-64 p-3 bg-gray-800 text-white rounded border border-gray-600 resize-none"
          value={code}
          onChange={handleChange}
        />
        <button
          onClick={runCode}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          ▶️ Run Code
        </button>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-cyan-300">📤 Output</h3>
          <pre className="bg-gray-900 p-3 rounded border border-gray-700 text-green-400">
            {output}
          </pre>
          <p className="mt-1 text-sm">{status}</p>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
