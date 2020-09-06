import React, { FC } from "react";
import SEO from "../components/seo";
import Layout from "../components/layout";
import "../components/layout.css";
import "../components/main.css";
import { PageProps } from "gatsby";
import { useTsvFormatter } from "../hooks/useTSVFormatter";
import { TextField, makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles({
  wrapper: {
    marginTop: 100,
  },
});

const MakeFlashcardsPage: FC<PageProps> = () => {
  const [value, parsed, setValue] = useTsvFormatter("");

  console.log(parsed);

  const c = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const getClipboard = async () => {
    const text = await navigator?.clipboard?.readText();
    if (text) {
      setValue(text);
    }
  };

  return (
    <Layout>
      <SEO title="Make Flashcards" />
      <div className={c.wrapper}>
        {/* <TextField
        value={value}
        onChange={handleChange}
        className={c.wrapper}
        multiline
      ></TextField> */}

        <Button onClick={getClipboard}>Paste</Button>

        <div>{JSON.stringify(parsed)}</div>
      </div>
    </Layout>
  );
};

export default MakeFlashcardsPage;
