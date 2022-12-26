import { useEffect } from "react";
import { useFetcher, useParams } from "@remix-run/react";

export default function PostRoute() {
  const fetcher = useFetcher();
  const params = useParams();

  useEffect(() => {
    if (params?.slug !== undefined && fetcher.state !== "loading") {
      fetcher.load(`/api/posts/${params.slug}`);
    }
  }, [params.slug, fetcher]);

  return (
    <div
      className="postDisplay"
      dangerouslySetInnerHTML={{ __html: fetcher.data?.html }}
    />
  );
}
