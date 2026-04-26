function PhotoGrid({ posts }) {
    const mediaPosts = posts.filter(p => p.media);

    return (
        <div className="grid grid-cols-3 gap-2 mt-4">

            {mediaPosts.map(post => (
                <img
                    key={post._id}
                    src={post.media}
                    className="w-full h-40 object-cover rounded"
                />
            ))}

        </div>
    );
}

export default PhotoGrid;