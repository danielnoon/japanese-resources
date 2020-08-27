import React, { FC } from "react";
import Layout from "../components/layout";
import { DeckPage } from "../models/page.model";
import SEO from "../components/seo";
import { PageProps, graphql } from "gatsby";
import { FlashcardDeck } from "../components/flashcard-deck";
import { Navigation } from "../components/navigation";

interface DeckPageProps {
  page: DeckPage;
}

const DeckPageTemplate: FC<PageProps<DeckPageProps>> = ({ data }) => {
  const { page } = data;
  const decks = page.decks;

  return (
    <Layout>
      <SEO title={page.title} />
      <h1 className="big-title">{page.title}</h1>
      {decks.map((deck, i) => (
        <FlashcardDeck
          name={deck.name}
          deck={JSON.parse(deck.content)}
          key={i}
        ></FlashcardDeck>
      ))}
      <Navigation page={page} />
    </Layout>
  );
};

export default DeckPageTemplate;

export const query = graphql`
  query($slug: String!) {
    page: strapiPage(slug: { eq: $slug }) {
      decks {
        name
        content
      }
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
