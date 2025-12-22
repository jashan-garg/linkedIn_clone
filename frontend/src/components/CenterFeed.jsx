/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useRef } from 'react';
import { userDataContext } from '../context/UserContext';
import Post from './Post';
import PostSkeleton from './PostSkeleton';
import Spinner from './Spinner';
import BackToTop from './BackToTop';

function CenterFeed() {
    const { postData, getPost, page, setPage, hasMore, loadingPosts } =
        useContext(userDataContext);

    const observer = useRef(null);
    const lastPostRef = useRef(null);
    const debounceRef = useRef(false);

    useEffect(() => {
        if (!hasMore || loadingPosts) return;

        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !debounceRef.current) {
                debounceRef.current = true;

                setPage((prev) => prev + 1);

                // Debounce for 800ms
                setTimeout(() => {
                    debounceRef.current = false;
                }, 800);
            }
        });

        if (lastPostRef.current) {
            observer.current.observe(lastPostRef.current);
        }
    }, [postData, hasMore, loadingPosts]);

    useEffect(() => {
        getPost(page);
    }, [page]);

    return (
        <section className="col-span-12 md:col-span-6 space-y-4">
            {postData.map((post, index) => {
                const postComponent = (
                    <Post
                        key={post._id}
                        id={post._id}
                        author={post.author}
                        like={post.like}
                        comment={post.comment}
                        description={post.description}
                        image={post.image}
                        createdAt={post.createdAt}
                    />
                );

                if (index === postData.length - 1) {
                    return (
                        <div ref={lastPostRef} key={post._id}>
                            {postComponent}
                        </div>
                    );
                }

                return postComponent;
            })}

            {/* Skeleton loaders WHEN loading next batch */}
            {loadingPosts && page > 1 && (
                <>
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                </>
            )}

            {/* Spinner at very bottom */}
            {loadingPosts && <Spinner />}

            {!hasMore && (
                <p className="text-center text-gray-500 py-4">No more posts</p>
            )}
            <BackToTop />
        </section>
    );
}

export default CenterFeed;
