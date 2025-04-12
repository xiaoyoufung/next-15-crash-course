// import { auth } from "@/auth";
import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";

type StartupCardType = {
  _createdAt: string;
  views: number;
  author: { _id: number, name: string };
  _id: number;
  description: string;
  image: string;
  category: string;
  title: string;
};

export default async function Home({searchParams}: { searchParams: Promise<{query?:string}> }) {
  const query = (await searchParams).query;

  const post = [ {
    _createdAt: new Date().toISOString(),
    views: 100,
    author: {_id: 1, name: "John Doe"},
    _id: 1,
    description: "This is a description",
    image: "https://i.ytimg.com/vi/6v6dbxPlsXs/maxresdefault.jpg",
    category: "Robots",
    title: "We Robots",
  }]

  return (
    <>
      <section className="pink_container pattern">
        <h1 className="heading">Pitch your startup, <br />
          Connect with Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitched, and Get noticed by Investors.
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-[30px] font-semibold">
          {query ? `Search results for "${query}"` : "Latest Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {post?.length > 0 ? (
            post.map((post: StartupCardType) => (
              <StartupCard
                key={post._id}
                post={post}
              />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>

      </section>
    </>
  );
}
