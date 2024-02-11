import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyWord } = useParams();

  const [search, setSearch] = useState(keyWord || "");

  const submitHandler = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search/${search}`);
    } else {
      navigate("/");
    }
    setSearch("");
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Group controlId="keyWord">
        <Form.Control
          type="text"
          name="q"
          value={search}
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
          className="mr-sm-2 ml-sm-5"
        ></Form.Control>
      </Form.Group>
      <Button type="submit" variant="outline-light" className="p-2 mx-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
