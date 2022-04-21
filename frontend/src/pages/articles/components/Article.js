import React, { Fragment } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useShowLoader } from '../../../hooks/util-hooks';
import { useArticle } from '../../../hooks/articles/useArticle';
import { useParams } from 'react-router-dom';
import {Container, Divider, IconButton, LinearProgress} from '@mui/material';
import DraftComment from './DraftComment';
import { useDraftComment } from '../../../hooks/comments/useDraftComment';
import { useComment } from '../../../hooks/comments/useComment';
import Comment from './Comment';
import Author from '../../../components/Author';
import {useLike} from '../../../hooks/likes/useLike';

const Article = function () {
  const { id: articleId } = useParams();

  const { likeArticle } = useLike();
  const { loading, article } = useArticle(articleId);
  const { draftComment, createDraftComment, ...draftCommentActions } = useDraftComment(articleId);
  const { loading: commentLoading, ...commentActions } = useComment();

  const showLoader = useShowLoader(loading, 200);

  return (
    <Container className="main-container" maxWidth="lg">
      {loading ? (
        showLoader ? (
          <LinearProgress />
        ) : null
      ) : (
        <Box sx={{ paddingBottom: '10rem' }}>
          <Box sx={{ minWidth: 275, paddingBottom: '3rem' }}>
            <Typography variant="h1" color="text.primary" gutterBottom>
              {article.title}
            </Typography>
            <Typography variant="body1">
              {article.body.split('\n').map((t, idx) => (
                <Fragment key={idx}>
                  {t}
                  <br />
                  <br />
                </Fragment>
              ))}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton sx={{ marginRight: '.5rem' }} onClick={_ => likeArticle(articleId)}>
                👏
              </IconButton>

              <Box sx={{ marginRight: '1rem' }}>
                <Typography variant="body2" color="primary.main">
                  {article?.likes?.length} Likes
                </Typography>
              </Box>

              <IconButton sx={{ marginRight: '.5rem' }} onClick={_ => createDraftComment()}>
                💬
              </IconButton>

              <Box sx={{ marginRight: '1rem' }}>
                <Typography variant="body2" color="primary.main">
                  {article?.comments?.length} Comments
                </Typography>
              </Box>

              <Author author={article.author} />
            </Box>

          </Box>

          <DraftComment
            articleId={articleId}
            draftComment={draftComment}
            draftCommentActions={draftCommentActions}
            commentActions={commentActions}
          />


          <Typography variant="h5" component="h2" gutterBottom>
            Comments
          </Typography>

          <Divider />

          <Box>
            {article.comments.map((comment) => (
              <Comment comment={comment} key={comment._id} />
            ))}
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default Article;

