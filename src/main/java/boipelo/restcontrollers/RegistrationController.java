package boipelo.restcontrollers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import boipelo.domain.user.User;
import boipelo.repositories.UserRepository;

@RestController
public class RegistrationController {

	@Autowired
	private UserRepository userRepository;

	@RequestMapping(method = RequestMethod.POST, value = "/register")
	@ResponseStatus(HttpStatus.CREATED)
	HttpHeaders createUser(@RequestBody User user) {

		userRepository.save(user);

		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(ControllerLinkBuilder.linkTo(UserRepository.class)
				.slash(user.getLogin()).toUri());

		return headers;

	}

	@ExceptionHandler(IllegalArgumentException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	String handleIllegalArgument(Exception e) {
		return e.getMessage();
	}

}
