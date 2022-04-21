import React from "react";
import {
  Container,
  Typography,
  LinearProgress, Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useShowLoader } from "../../../hooks/util-hooks";
import DraftArticle from './DraftArticle';
import { useArticles } from '../../../hooks/articles/useArticles';
import { useDraftArticle } from '../../../hooks/articles/useDraftArticle';
import ArticlePreview from './ArticlePreview';
import { StyledMasonry } from './ArticlePreview.styles';

const Articles = function () {
  const { loading, articles } = useArticles();
  const { draftArticle, ...draftArticleActions } = useDraftArticle();
  const showLoader = useShowLoader(loading, 200);

  return (
    <>
      <Container className="main-container" maxWidth="lg">
        {loading ? (
          showLoader ? (
            <LinearProgress />
          ) : null
        ) : (
          <div>
            <Typography component="p" variant="h5">
              {`Found ${articles.length} article${
                articles.length === 1 ? "" : "s"
              }`}
            </Typography>
            <br />
            <br />
            <br />
            <StyledMasonry>
              {articles.map(article => (
                <ArticlePreview key={article._id} article={article} />
              ))}
            </StyledMasonry>
          </div>
        )}
        <Fab color="primary" aria-label="add" onClick={_ => draftArticleActions.createDraftArticle()}>
          <AddIcon />
        </Fab>
      </Container>

      <DraftArticle
        draftArticle={draftArticle}
        draftArticleActions={draftArticleActions}
      />
    </>
  );
}

export default Articles;
