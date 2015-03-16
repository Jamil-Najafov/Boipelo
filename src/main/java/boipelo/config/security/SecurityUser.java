package boipelo.config.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import boipelo.domain.user.Role;
import boipelo.domain.user.User;

public class SecurityUser extends User implements UserDetails {

	private static final long serialVersionUID = 1L;

	public SecurityUser(User user) {
		if (user != null) {

			this.setPassword(user.getPassword());
			this.setLogin(user.getLogin());
			this.setRoles(user.getRoles());
			this.setEmail(user.getEmail());
			this.setId(user.getId());

		}
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {

		Collection<GrantedAuthority> authorities = new ArrayList<>();
		Set<Role> userRoles = this.getRoles();

		if (userRoles != null) {
			for (Role role : userRoles) {
				SimpleGrantedAuthority authority = new SimpleGrantedAuthority(
						role.getRoleName());
				authorities.add(authority);
			}
		}
		return authorities;
	}

	@Override
	public Long getId() {
		return super.getId();
	}

	@Override
	public String getPassword() {
		return super.getPassword();
	}

	@Override
	public String getUsername() {
		return super.getLogin();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
