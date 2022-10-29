import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { format } from "date-fns";

import { Projects } from "../data/projects";
import { Travel } from "../data/travel";
import { SiteDescription, SiteTitle } from "../data/about";

import { Badge } from "../components/badge";
import { Section } from "../components/section";
import { Layout } from "../components/layout";
import { Container } from "../components/container";
import { Item } from "../components/item";
import { PhotoCard } from "../components/photo-card";
import { ExternalLink } from "../components/external-link";
import { Navigation } from "../components/navigation";

import Avatar from "../../public/assets/blog/authors/akshays.jpg";
import { HeartIcon } from "@heroicons/react/solid";

import { ArrowSmRightIcon, ExternalLinkIcon } from "@heroicons/react/outline";
import { PageTitle } from "../components/page-title";
import { Button } from "../components/button";

import { compareDesc } from "date-fns";
import { DevToBlog } from "src/@types/blog";

const latestPostsLimit = 5;

export const getStaticProps = async () => {
  const response = await fetch(
    "https://dev.to/api/articles?username=akshaysrepo"
  );
  let latestPosts = await response.json();
  return {
    props: { latestPosts },
  };
};

type Props = {
  latestPosts: DevToBlog[];
};

const Index = ({ latestPosts }: Props) => {
  console.log({ latestPosts });
  return (
    <Layout>
      <NextSeo
        title={SiteTitle}
        description={SiteDescription}
        canonical={process.env.NEXT_PUBLIC_SITE_URL}
        openGraph={{
          url: process.env.NEXT_PUBLIC_SITE_URL,
          title: SiteTitle,
          description: SiteDescription,
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?title=${SiteTitle}`,
            },
          ],
          site_name: SiteTitle,
        }}
      />
      <Navigation />
      <Container>
        <section className="flex flex-col-reverse justify-between gap-x-12 sm:flex-row">
          <header>
            <PageTitle>Akshay S</PageTitle>
            <h2 className="mt-1 text-lg font-semibold leading-tight tracking-tight">
              Frontend developer at{" "}
              <ExternalLink href="https://www.brainwired.in/">
                Brainwired
              </ExternalLink>
            </h2>
            <p className="mt-4 text-base">
              I work to make the web a better place to spend time in, by making
              it hassle-free, optimized, easy to use, and user-friendly.
              <br />
              If you want to reach out,{" "}
              <ExternalLink href="mailto:akshayshan28@gmail.com">
                write me an email.
              </ExternalLink>
            </p>
          </header>
          <div className="flex-shrink-0 overflow-hidden">
            <Image
              src={Avatar}
              width="100"
              height="100"
              alt="avatar"
              className="rounded-full"
            />
          </div>
        </section>
        <Section>
          <Section.Title
            as="h2"
            action={
              <Link href="https://dev.to/akshaysrepo">
                <Button data-testid="btn-blog-show-all">
                  <span className="inline-flex items-center justify-center px-1">
                    Show all{" "}
                    <ArrowSmRightIcon className="ml-1 inline h-5 w-5" />
                  </span>
                </Button>
              </Link>
            }
          >
            Blog
          </Section.Title>
          <Section.Content>
            {latestPosts.map((post) => {
              return (
                <Link key={post.id} href={`/blog/}`}>
                  <Item>
                    <Item.Title>{post.title}</Item.Title>
                    <Item.Subtitle>{post.description}</Item.Subtitle>
                    <Item.Description>
                      {post.tag_list.map((tech) => {
                        return (
                          <Badge className="mr-2" key={tech}>
                            {tech.toUpperCase()}
                          </Badge>
                        );
                      })}
                    </Item.Description>
                    <Item.Description>
                      <HeartIcon className="h-4 w-4" color="red" />{" "}
                      <div className="ml-1 mr-4">
                        {post.positive_reactions_count}{" "}
                      </div>
                      <div>
                        {format(new Date(post.published_at), "MMM dd, yyyy")}
                      </div>
                      <div className="ml-2">
                        {" "}
                        {post.reading_time_minutes} min read{" "}
                      </div>
                    </Item.Description>
                  </Item>
                </Link>
              );
            })}
          </Section.Content>
        </Section>
        <Section>
          <Section.Title as="h2">Projects</Section.Title>
          <Section.Content>
            {Projects.map((project) => {
              return (
                <ExternalLink
                  className="block outline-none"
                  key={project.title}
                  href={project.link}
                  data-testid={project.title}
                >
                  <Item>
                    <Item.Title>
                      <span className="inline-flex items-center">
                        {project.title}{" "}
                        <ExternalLinkIcon className="ml-1 inline h-5 w-5" />
                      </span>
                      <div className="my-2 hidden space-x-2 font-mono sm:my-0 sm:ml-auto sm:flex">
                        {project.techStack.map((tech) => {
                          return <Badge key={tech}>{tech}</Badge>;
                        })}
                      </div>
                    </Item.Title>
                    <Item.Subtitle>{project.description}</Item.Subtitle>
                  </Item>
                </ExternalLink>
              );
            })}
          </Section.Content>
        </Section>
        <Section>
          <Section.Title as="h2">Visited places</Section.Title>
          <Section.Content>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {Travel.map((dest) => {
                return (
                  <PhotoCard
                    key={dest.title}
                    img={dest.img}
                    title={dest.title}
                    subTitle={dest.placesVisited}
                  />
                );
              })}
            </div>
          </Section.Content>
        </Section>
      </Container>
    </Layout>
  );
};

export default Index;
