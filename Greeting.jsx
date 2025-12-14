import React, { useState } from "react";

export default function Greeting() {
  // state
  const [page, setPage] = useState(1);

  const limit = 5;
  const data = [];

  // numbers banao
  for (let i = 1; i <= 50; i++) {
    data.push(i);
  }

  // pagination logic
  const start = (page - 1) * limit;
  const end = page * limit;
  const show = data.slice(start, end);

  const next = () => {
    if (page < Math.ceil(data.length / limit)) {
      setPage(page + 1);
    }
  };

  const prev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      <h1>Pagination</h1>

      {/* page par numbers */}
      {show.map((num) => (
        <span key={num} style={{ margin: "5px" }}>
          {num}
        </span>
      ))}

      <br /><br />

      <button onClick={prev}>Prev</button>
      <button onClick={next}>Next</button>
    </div>
  );
}
