package boipelo.domain.post;

import org.neo4j.graphdb.Direction;
import org.springframework.data.neo4j.annotation.Fetch;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.NodeEntity;
import org.springframework.data.neo4j.annotation.RelatedTo;

import boipelo.domain.user.User;

@NodeEntity
public class Comment {

	@GraphId
	Long nodeId;

	String content;
	
	Long createdAt;

	@RelatedTo(type = "COMMENTED_BY", direction = Direction.OUTGOING)
	@Fetch
	User commenter;
	
	@RelatedTo(type = "COMMENTED_TO", direction = Direction.OUTGOING)
	@Fetch
	Post commentedTo;

	public Long getId() {
		return nodeId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public User getCommenter() {
		return commenter;
	}

	public void setCommenter(User commenter) {
		this.commenter = commenter;
	}
	
	public Post getCommentedTo() {
		return commentedTo;
	}

	public void setCommentedTo(Post commentedTo) {
		this.commentedTo = commentedTo;
	}

	public void setCreatedAt(Long createdAt) {
		this.createdAt = createdAt;
	}

	public Long getCreatedAt() {
		return this.createdAt;
	}
	
}
