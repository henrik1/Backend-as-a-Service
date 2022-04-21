import styled from 'styled-components';

export const StyledMasonry = styled.div`
  column-count: 2;
  column-gap: 3em;

  >* {
    display: inline-block;
    margin-bottom: 6rem;
    width: 100%;
    p {
      margin-bottom: 1.5rem;
    }
  }
`;
