const PopularPostsSidebar = ({ title, posts }) => {
    return (
        <div className="sidebar-left border-1 main-secondary-background border-color mt-20 pb-25 mb-10">
            <h6 className="text-lg-bold white-color">{title}</h6>
            <div className="box-popular-posts">
                <ul>
                    {posts.map((post, index) => (
                        <li key={index}>
                            <div className="card-post">
                                <div className="card-image">
                                    <a href={post.link || "#"}>
                                        <img src={post.imageSrc} alt="Travila" />
                                    </a>
                                </div>
                                <div className="card-info">
                                    <a className="text-xs-bold white-color" href={post.link || "#"}>
                                        {post.title}
                                    </a>
                                    <span className="price text-sm-bold white-color">{post.price}</span>
                                    {post.oldPrice && (
                                        <span className="price-through text-sm-bold neutral-500">{post.oldPrice}</span>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default PopularPostsSidebar;
