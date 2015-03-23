package boipelo.domain.user;

import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.access.prepost.PreAuthorize;

@RepositoryEventHandler(User.class)
public class UserEventHandler {

    @HandleBeforeSave
    // Application logic polluting the domain.
    @PreAuthorize("#user.getId() == principal.id")
    public void checkUpdateAuthority(User user) {
        //only authority check
    }

}
