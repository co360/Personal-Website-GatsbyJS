import React, { useState } from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/layout';
import SEO from '../components/seo';
import InViewAnimation from '../components/InViewAnimation';
import BlogCard from '../components/Blog/BlogCard';
import BlogCategoryDropdown from '../components/Blog/BlogCategoryDropdown';
import TagDropdown from '../components/Blog/TagDropdown';
import { ALL_FILTER } from '../components/Blog/ALL_FILTER';

const BlogPosts = ({ data }) => {
    const { edges, categories, tags } = data.allMarkdownRemark;
    const [currentCategory, setCurrentCategory] = useState(getInitialCategoryFilter());
    const [currentTags, setCurrentTags] = useState([]);

    return (
        <Layout>
            <InViewAnimation>
                <div className="container">
                    <SEO title="Blog" />
                    <div className="page-header">
                        <h1>Blog Posts</h1>
                    </div>

                    <div className='blog-filters'>
                        <BlogCategoryDropdown 
                            categories={categories.map(category => category.category)} 
                            filter={currentCategory} 
                            setFilter={setCurrentCategory} 
                        />

                        <TagDropdown
                            tags={tags.map(tag => tag.tag)}
                            categoryFilter={currentCategory}
                            tagFilters={currentTags}
                            setTagFilters={setCurrentTags}
                        />
                    </div>

                    {edges.map(post => <BlogCard post={post} categoryFilter={currentCategory} tagFilters={currentTags} />)}
                </div>
            </InViewAnimation>
        </Layout>     
    );
}

const getInitialCategoryFilter = () => {
    const locationSearch = typeof window !== 'undefined' && window.location.search; // Needs window type check to pass Gatsby build
    const queryStringCategoryOrAll = new URLSearchParams(locationSearch).get('category') || ALL_FILTER;
    return queryStringCategoryOrAll;
};

export const pageQuery = graphql`
    query BlogIndexQuery {
        allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
            categories: group(field: frontmatter___category) {
                category: fieldValue
            }
            tags: group(field: frontmatter___tags) {
                tag: fieldValue
            }
            edges {
                node {
                    id
                    excerpt
                    frontmatter {
                        path
                        title
                        date(formatString: "MMMM DD, YYYY")
                        featuredImage {
                            childImageSharp {
                                fluid(maxWidth: 800) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                        category
                        tags
                    }
                }
            }
        }
    }
`

export default BlogPosts;