import React from 'react';
import Helmet from 'react-helmet';
import PostTemplateDetails from '../components/PostTemplateDetails';

class PostTemplate extends React.Component {
  render() {
    const siteMetadata = this.props.data.site.siteMetadata;
    const { title } = siteMetadata;
    const post = this.props.data.markdownRemark;
    const { title: postTitle } = post.frontmatter;

    return (
      <div>
        <Helmet>
          <title>{`${postTitle} - ${title}`}</title>
        </Helmet>
        <PostTemplateDetails siteMetadata={siteMetadata} post={post} />
      </div>
    );
  }
}

export default PostTemplate;

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        subtitle
        author {
          name
          twitter
        }
        url
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        tagSlugs
      }
      frontmatter {
        title
        tags
        date
        description
        link
      }
    }
  }
`;
