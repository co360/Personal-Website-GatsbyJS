import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import PublishedOnDate from '../Icons/PublishedOnDate';
import Tags from '../Icons/Tags';
import Category from '../Icons/Category';
import { ALL_FILTER } from '../ALL_FILTER';
import { IBlogPost } from '../BlogTypes';
import IconText from '../../Shared/IconText';
import { FaBook } from 'react-icons/fa';
import '../../../styles/layout/blog/posts/_card.scss';

interface IBlogCardProps {
    post: IBlogPost;
    categoryFilter: string;
    tagFilters: string[];
}

const Card = ({ post, categoryFilter, tagFilters }: IBlogCardProps) => {
    const { node } = post;
    const { title, date, path, featuredImage, category, tags } = node.frontmatter;
    const mightHideCard = isShown(categoryFilter, category, tagFilters, tags) ? '' : 'hide-card';

    return (
        <div className={`margin-container project-container blog-card col-xs-12 col-sm-6 col-md-4 col-lg-4 ${mightHideCard}`}>
            <div className="-curved-border -layered-box-shadow">
                <div key={node.id}>
                    <Img className="container-top-image" fluid={featuredImage.childImageSharp.fluid} />
                    <div className="content">
                        <div className="icons">
                            <PublishedOnDate date={date} />
                            <Category category={category} />
                            <Tags tags={tags} />
                        </div>
                        <h2>{title}</h2>
                        <p>{node.excerpt}</p>
                        <Link className="btn" to={path} aria-label={`Read more about ${title}`}>
                            <IconText icon={<FaBook />} text="Read More" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

const isShown = (
    categoryFilter: string, 
    currentCategory: string, 
    tagFilters: string[], 
    currentTags: string[]
): boolean => ( 
    (categoryFilter === ALL_FILTER || currentCategory === categoryFilter) 
    && hasTag(tagFilters, currentTags)
);

const hasTag = (tagFilters: string[], currentTags: string[]): boolean => {
    if (tagFilters.length === 0)
        return true;

    for (const currentTag of currentTags)
        for (const tagFilter of tagFilters)
            if (tagFilter === currentTag)
                return true;  

    return false;
}

export default Card;