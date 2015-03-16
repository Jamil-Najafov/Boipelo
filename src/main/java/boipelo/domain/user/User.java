package boipelo.domain.user;

import java.util.HashSet;
import java.util.Set;

import org.neo4j.graphdb.Direction;
import org.springframework.data.neo4j.annotation.Fetch;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.Indexed;
import org.springframework.data.neo4j.annotation.NodeEntity;
import org.springframework.data.neo4j.annotation.RelatedTo;
import org.springframework.data.neo4j.annotation.RelatedToVia;

import boipelo.domain.image.Image;
import boipelo.domain.post.Post;

import com.fasterxml.jackson.annotation.JsonIgnore;

@NodeEntity
public class User {

	@GraphId
	Long nodeId;

	@Indexed(unique = true)
	String login;

	private Set<Role> roles = new HashSet<>();

	private String password;

	private String email;

	@Fetch
	@RelatedTo(type = "PROFILE_PICTURE")
	@JsonIgnore
	private Image profilePicture;

	@RelatedToVia(type = "ADDED_FRIEND")
	@Fetch
	Set<Friendship> friendships;

	@RelatedTo(type = "POSTED_TO", direction = Direction.INCOMING)
	@Fetch
	Set<Post> timeline;

	public String getEmail() {
		return email;
	}

	public Set<Friendship> getFriendships() {
		return friendships;
	}

	public Long getId() {
		return nodeId;
	}

	public String getLogin() {
		return login;
	}

	public String getPassword() {
		return password;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setFriendships(Set<Friendship> friendships) {
		this.friendships = friendships;
	}

	public void setId(Long id) {
		this.nodeId = id;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public Set<Post> getTimeline() {
		return timeline;
	}

	public void setTimeline(Set<Post> timeline) {
		this.timeline = timeline;
	}

	public Image getProfilePicture() {
		return profilePicture;
	}

	public void setProfilePicture(Image profilePicture) {
		this.profilePicture = profilePicture;
	}

}