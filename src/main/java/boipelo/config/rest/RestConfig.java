package boipelo.config.rest;

import java.net.URI;
import java.net.URISyntaxException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;

import boipelo.domain.user.UserEventHandler;

@Configuration
@Import(RepositoryRestMvcConfiguration.class)
public class RestConfig extends RepositoryRestMvcConfiguration {

	@Override
	protected void configureRepositoryRestConfiguration(
			RepositoryRestConfiguration config) {
		super.configureRepositoryRestConfiguration(config);
		try {
			config.setBaseUri(new URI("/api"));
		} catch (URISyntaxException e) {
			e.printStackTrace();
		}
	}

	@Bean
	public UserEventHandler userEventHandler() {
		return new UserEventHandler();
	}
}