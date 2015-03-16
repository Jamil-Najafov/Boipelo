package boipelo.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import boipelo.domain.post.Post;
import boipelo.domain.user.User;

@RepositoryRestResource(collectionResourceRel = "posts", path = "posts")
public interface PostRepository extends PagingAndSortingRepository<Post, Long> {

	// the "0" parameter is a workaround for a bug in SDN
	public Page<Post> findByPoster(@Param("0") User user, Pageable p);

}