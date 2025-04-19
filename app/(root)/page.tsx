import SearchForm from "@/components/SearchForm";
import { Post } from "@/types/post";
import PostCardMain from "@/components/PostCardMain";


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
      <section className="pink_container !items-start !justify-start !gap-0 px-20">
        <h1 className="text-[48px] font-extrabold text-black leading-tight mb-4 text-left max-w-2xl">
          Pitch Your Startup, <br /> Connect With Tech Fellows
        </h1>
        <p className="!text-black !font-bold text-xl mb-8 text-left max-w-xl">
          Submit Ideas, Get noticed!
        </p>
        <div className="w-full max-w-xl">
          <SearchForm query={query} />
        </div>
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
