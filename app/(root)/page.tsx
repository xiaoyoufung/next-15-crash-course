// import { auth } from "@/auth";
import SearchForm from "../../components/SearchForm";
import StartupCard, {StartupTypeCard} from "@/components/StartupCard";
import { STARTUP_QUERY } from "@/lib/queries";
import { client } from "@/sanity/lib/client";

// type StartupCardType = {
//   _createdAt: string;
//   views: number;
//   author: { _id: number, name: string };
//   _id: number;
//   description: string;
//   image: string;
//   category: string;
//   title: string;
// };

export default async function Home({searchParams}: { searchParams: Promise<{query?:string}> }) {
  const query = (await searchParams).query;

  const posts = await client.fetch(STARTUP_QUERY);

  console.log(JSON.stringify(posts, null, 2));

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
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
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
