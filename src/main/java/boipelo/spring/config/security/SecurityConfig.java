package boipelo.spring.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
@EnableGlobalMethodSecurity(prePostEnabled=true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private RESTAuthenticationEntryPoint authenticationEntryPoint;

	@Autowired
	private CustomUserDetailsService customUserDetailsService;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.formLogin().loginPage("/login").loginProcessingUrl("/login").and()
				.logout().logoutUrl("/logout").deleteCookies("JSESSIONID")
				.permitAll().logoutSuccessUrl("/").and().authorizeRequests()
				.antMatchers("/", "/register").permitAll().anyRequest()
				.authenticated().and().csrf().disable();

		http.exceptionHandling().authenticationEntryPoint(
				authenticationEntryPoint);

	}

	@Override
	protected void configure(AuthenticationManagerBuilder registry)
			throws Exception {

		/*
		 * registry.inMemoryAuthentication().withUser("siva") // #1
		 * .password("siva").roles("USER").and().withUser("admin") // #2
		 * .password("admin").roles("ADMIN", "USER");
		 */

		// registry.jdbcAuthentication().dataSource(dataSource);
		registry.userDetailsService(customUserDetailsService);
	}

}
