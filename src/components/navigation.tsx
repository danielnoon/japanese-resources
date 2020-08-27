import React, { FC } from "react";
import { Page } from "../models/page.model";
// import AniLink from "gatsby-plugin-transition-link/AniLink";
import { Link } from "gatsby";

interface NavigationProps {
  page: Page;
}

export const Navigation: FC<NavigationProps> = ({ page }) => (
  <div className="navigation">
    {page.previous ? (
      <Link to={"/" + page.previous.slug} className="button-link">
        <button className="btn">
          <div className="button-inner">
            <i className="icon md-36">chevron_left</i>
            {page.previous.title}
          </div>
        </button>
      </Link>
    ) : (
      <div className="spacer" />
    )}
    {page.next ? (
      <Link to={"/" + page.next.slug} className="button-link">
        <button className="btn">
          <div className="button-inner">
            {page.next.title}
            <i className="icon md-36">chevron_right</i>
          </div>
        </button>
      </Link>
    ) : (
      <div className="spacer" />
    )}
  </div>
);
