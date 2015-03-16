package boipelo.domain.post;

import java.util.Set;

import org.neo4j.graphdb.Direction;
import org.springframework.data.neo4j.annotation.Fetch;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.NodeEntity;
import org.springframework.data.neo4j.annotation.RelatedTo;

import boipelo.domain.user.User;

@NodeEntity
public class Post {

	@GraphId
	Long nodeId;

	String content;

	@RelatedTo(type = "POSTED_BY", direction = Direction.OUTGOING)
	@Fetch
	User poster;

	@RelatedTo(type = "COMMENTED_TO", direction = Direction.INCOMING)
	@Fetch
	Set<Comment> comments;
	
	@RelatedTo(type = "POSTED_TO", direction = Direction.OUTGOING)
	@Fetch
	User postedTo;

	public Set<Comment> getComments() {
		return comments;
	}

	public void setComments(Set<Comment> comments) {
		this.comments = comments;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public User getPoster() {
		return poster;
	}

	public void setPoster(User poster) {
		this.poster = poster;
	}

	public Long getId() {
		return nodeId;
	}

	public void setId(Long nodeId) {
		this.nodeId = nodeId;
	}
	
	public User getPostedTo() {
		return postedTo;
	}

	public void setPostedTo(User postedTo) {
		this.postedTo = postedTo;
	}

}
