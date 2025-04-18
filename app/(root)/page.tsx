import SearchForm from "@/components/SearchForm";
import { Post } from "@/types/post";
import PostCardMain from "@/components/PostCardMain";
import land from "@/./public/land.svg";


export default async function Home({ searchParams }: { searchParams: { query?: string } }) {
  const query = searchParams.query || "";
  let posts: Post[] = [];

  try {
    const res = await fetch(`http://localhost:5000/posts?search=${query}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch posts");

    posts = await res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect With Tech Fellows
        </h1>
        <p className="sub-heading !max-w-3xl !text-black !font-bold">Submit Ideas, Get noticed!</p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p>{query ? `Search results for "${query}"` : "All Startups"}</p>

        <ul className="mt-7 card_grid">
          {posts.length > 0 ? (
            posts.map((post) => <PostCardMain key={post._id} post={post} />)
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}
