import GridPostList from "@/components/shared/gridpost-list";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useGetPosts, useSearchPosts } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { FilterIcon, Loader2, Search } from "lucide-react";
import {  useState } from "react";
// import { useInView } from "react-intersection-observer";



export type SearchResultProps = {
  isSearchFetching: boolean;
  searchedPosts: {documents: Models.Document[]} | undefined; 
};

const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultProps) => {
  if (isSearchFetching) {
    return <div className="w-full flex items-center justify-center"><Loader2 className="h-10 w-10 animate-spin" /></div>;
  } else if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  } else {
    return (
      <p className="text-light-4 mt-10 text-center w-full">No results found</p>
    );
  }
};

const Explore = () => {
  // const { ref, inView } = useInView();
  // const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const { data: posts } = useGetPosts();

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(debouncedSearch);

  // useEffect(() => {
  //   if (inView && !searchValue) {
  //     // fetchNextPage();
  //   }
  // }, [inView, searchValue]);

  if (!posts)
    return (
      <div className="flex-center w-full h-full">
        <Loader2 className="w-16 h-16 animate-spin" />
      </div>
    );

  const shouldShowSearchResults = searchValue !== "";
  // const shouldShowPosts = !shouldShowSearchResults && 
  //   posts.documents.every((item) => item?.documents.length === 0);
  const shouldShowPosts = !shouldShowSearchResults && 
    posts.documents.length === 0;

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex items-center gap-1 px-4 w-full rounded-lg bg-dark-4">
         <Search />
          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => {
              const { value } = e.target;
              setSearchValue(value);
            }}
          />
        </div>
      </div>

      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>

        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
         <FilterIcon />
        </div>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts }
          />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
          // posts.documents.map((item, index) => (
            <GridPostList  posts={posts.documents} />
          // ))
        )}
      </div>

      {/* {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader2 className="w-16 h-16 animate-spin" />
        </div>
      )} */}
    </div>
  );
};

export default Explore;