import React from "react";
import { Link } from "gatsby";
import "./index.css";

import SEO from "../components/seo";
import Layout from "../components/layout";

const IndexPage = () => (
  <Layout>
    <SEO title="Welcome" />
    <div className="center">
      <div className="jumbotron">
        <h1 className="bigg-title">こんにちは！</h1>
        <div className="explanation">
          <h2 className="intro-title">Japanese 101 Resources</h2>
          <p className="info">
            Flash cards, notes, clarification, and more! Click the link below to
            get started!
          </p>
        </div>
        <Link to="/intro">
          <button className="btn">
            <div className="button-inner">
              Intro <i className="icon md-36">chevron_right</i>
            </div>
          </button>
        </Link>
      </div>
    </div>
    {/* <p>
      As someone who has been learning Japanese for several years, I thought I
      would make a repository for resources to help study for the course! Along
      the way, I will attempt to clarify many confusing aspects of learning
      Japanese coming from a European language background. I am an advocate of
      learning Japanese without trying to approach it as if it were a European
      language, and instead, explaining the natural meanings of types of speech
      and the agglutinative nature of the language.
    </p> */}
  </Layout>
);

export default IndexPage;
