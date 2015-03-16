package boipelo.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import boipelo.domain.post.Comment;
import boipelo.domain.user.User;

@RepositoryRestResource(collectionResourceRel = "comments", path = "comments")
public interface CommentRepository extends
		PagingAndSortingRepository<Comment, Long> {

	// the "0" parameter is a workaround for a bug in SDN
	public Page<Comment> findByCommenter(@Param("0") User user, Pageable p);

}