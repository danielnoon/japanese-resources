import React from "react";
import { Link } from "gatsby";
import "./index.css";

import SEO from "../components/seo";
import Layout from "../components/layout";

const IntroPage = () => (
  <Layout>
    <SEO title="Intro" />
    <h1>Intro</h1>
    <p>
      As someone who has been learning Japanese for several years, I thought I
      would make a repository for resources to help study for the course! Along
      the way, I will attempt to clarify many confusing aspects of learning
      Japanese coming from a European language background. I am an advocate of
      learning Japanese without trying to approach it as if it were a European
      language, and instead, explaining the natural meanings of types of speech
      and the agglutinative nature of the language.
    </p>
  </Layout>
);

export default IntroPage;
