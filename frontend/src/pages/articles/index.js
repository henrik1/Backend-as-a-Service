import React from "react";
import { Routes, Route } from "react-router-dom";
import Articles from './components/Articles';
import Article from './components/Article';

const Page = function () {

  return (
    <Routes>
      <Route path="/:id" exact element={<Article />} />
      <Route path="/" exact element={<Articles />} />
    </Routes>
  );
}

export default Page;
