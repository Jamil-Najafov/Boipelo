package boipelo.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import boipelo.domain.user.User;
import boipelo.repositories.UserRepository;

@Component
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String userName)
			throws UsernameNotFoundException {
		User user = userRepository.findUserByLogin(userName);
		if (user == null) {
			throw new UsernameNotFoundException("UserName " + userName
					+ " not found");
		}
		return new SecurityUser(user);
	}

}