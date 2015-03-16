package boipelo.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import boipelo.domain.user.Friendship;

@RepositoryRestResource(collectionResourceRel = "friendships", path = "friendships")
public interface FriendshipRepository extends
		PagingAndSortingRepository<Friendship, Long> {

}
