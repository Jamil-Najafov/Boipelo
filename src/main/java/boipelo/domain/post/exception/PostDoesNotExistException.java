package boipelo.domain.post.exception;

import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(org.springframework.http.HttpStatus.NOT_FOUND)
public class PostDoesNotExistException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public PostDoesNotExistException(String postId) {
		super(String.format("Profile '%d' does not exist.", postId));
	}

}
