import React, { FC } from "react";
import Layout from "../components/layout";
import { ContentPage } from "../models/page.model";
import SEO from "../components/seo";
import { PageProps, graphql, Link } from "gatsby";
import MarkdownIt from "markdown-it";
import { Navigation } from "../components/navigation";

const md = new MarkdownIt();

interface ContentPageProps {
  page: ContentPage;
}

const ContentPageTemplate: FC<PageProps<ContentPageProps>> = ({ data }) => {
  const { page } = data;
  const content = md.render(page.content);
  return (
    <Layout>
      <SEO title={page.title} />
      <h1 className="big-title">{page.title}</h1>
      <Navigation page={page} />
      <div
        className="page-content"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
      <Navigation page={page} />
    </Layout>
  );
};

export default ContentPageTemplate;

export const query = graphql`
  query($slug: String!) {
    page: strapiPage(slug: { eq: $slug }) {
      content
      title
      type
      index
      slug
      next {
        title
        slug
      }
      previous {
        title
        slug
      }
    }
  }
`;
