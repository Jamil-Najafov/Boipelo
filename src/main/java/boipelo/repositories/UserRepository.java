package boipelo.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

import boipelo.domain.user.User;

@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface UserRepository extends PagingAndSortingRepository<User, Long> {

	// the "0" parameter is a workaround for a bug in SDN
	User findUserByLogin(@Param("0") String login);

	//@PreAuthorize("#user.getId() == principal.id")
	@Override
	User save(@Param("user") User user);

}
