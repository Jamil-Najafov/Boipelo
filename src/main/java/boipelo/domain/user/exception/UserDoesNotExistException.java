package boipelo.domain.user.exception;

import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(org.springframework.http.HttpStatus.NOT_FOUND)
public final class UserDoesNotExistException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public UserDoesNotExistException(String profileId) {
		super(String.format("Profile '%d' does not exist.", profileId));
	}

}
