import React, { FC } from "react";
import Layout from "../components/layout";
import { DeckPage } from "../models/page.model";
import SEO from "../components/seo";

interface DeckPageProps {
  page: DeckPage;
}

const DeckPageTemplate: FC<DeckPageProps> = ({ page }) => (
  <Layout>
    <SEO title={page.title} />
  </Layout>
);

export default DeckPageTemplate;
