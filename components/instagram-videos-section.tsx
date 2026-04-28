const instagramPosts = [
  {
    id: "DXBK5T3y51N",
    url: "https://www.instagram.com/p/DXBK5T3y51N/",
    title: "Instagram video 1",
  },
  {
    id: "DXgH3ONyrl-",
    url: "https://www.instagram.com/p/DXgH3ONyrl-/",
    title: "Instagram video 2",
  },
];

export default function InstagramVideosSection() {
  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[860px]">
        <div className="grid justify-center gap-4 md:grid-cols-2">
          {instagramPosts.map((post) => (
            <article
              key={post.id}
              className="mx-auto w-full max-w-[380px] rounded-[20px] border border-[#f2d7d6] bg-white p-4 shadow-[0_12px_35px_rgba(232,38,37,0.08)]"
            >
              <div className="overflow-hidden rounded-[8px] border border-[#d8d8d8] bg-white">
                <iframe
                  src={`${post.url}embed/`}
                  title={post.title}
                  className="h-[665px] w-full overflow-hidden"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  loading="lazy"
                  scrolling="no"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
