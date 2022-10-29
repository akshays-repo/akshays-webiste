import React from 'react';
import Link from 'next/link';
import { format, compareDesc } from 'date-fns';
import { NextSeo } from 'next-seo';

import { Section } from '../../components/section';
import { Container } from '../../components/container';
import { Layout } from '../../components/layout';
import { BlogSiteDescription, BlogSiteTitle, BlogSiteUrl } from '../../data/about';
import { Item } from '../../components/item';
import { Navigation } from '../../components/navigation';
import { Badge } from '../../components/badge';

// export async function getStaticProps() {
//   const posts = allBlogs.sort((a, b) => {
//     return compareDesc(new Date(a.date), new Date(b.date));
//   });
//   const tags = Array.from(new Set(posts.map((post) => post.tags).flat()));
//   return { props: { posts, tags } };
// }

// interface Props {
//   posts: Blog[];
//   tags: Array<string>;
// }

const Blog = () => {
  return (
    <Layout>
      <NextSeo
        title={BlogSiteTitle}
        description={BlogSiteDescription}
        canonical={BlogSiteUrl}
        openGraph={{
          url: BlogSiteUrl,
          title: BlogSiteTitle,
          description: BlogSiteDescription,
          images: [{ url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?title=${BlogSiteTitle}` }],
          site_name: BlogSiteTitle,
        }}
      />
      <Navigation />
      <Container>
        <Section>
          <Section.Title>Tags</Section.Title>
          <Section.Content>
            {/* <div className="flex flex-wrap gap-1 font-mono">
              {tags.map((tag) => (
                <Link href={`/tags/${tag}`} key={tag}>
                  <Badge className="cursor-pointer">#{tag}</Badge>
                </Link>
              ))}
            </div> */}
          </Section.Content>
        </Section>
        <Section>
          <Section.Title>All posts</Section.Title>
          <Section.Content>
            {[1, 23, 3, 43, 3434].map((post) => {
              return (
                <Link key={post} href={`/blog/}`}>
                  <Item>
                    <Item.Title>{'title'}</Item.Title>
                    <Item.Subtitle>{'description'}</Item.Subtitle>
                    <Item.Description>
                      {/* {format(new Date(post.date), 'MMM dd, yyyy')} */}
                    </Item.Description>
                  </Item>
                </Link>
              );
            })}
          </Section.Content>
        </Section>
      </Container>
    </Layout>
  );
};

export default Blog;
