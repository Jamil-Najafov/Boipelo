package boipelo.domain.image;

import java.util.UUID;

import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.Indexed;
import org.springframework.data.neo4j.annotation.NodeEntity;

@NodeEntity
public class Image {
	
	@GraphId
	Long nodeId;
	
	@Indexed(unique = true)
	private UUID uuid;
	
	private String originalFilename;
	private String originalFileExtension;
	
	public Image() {
		super();
	}
	
	public Image(UUID uuid, String originalFilename, String originalFileExtension) {

		setId(uuid);
		setOriginalFilename(originalFilename);
		setOriginalFileExtension(originalFileExtension);		
		
	}

	public UUID getId() {
		return uuid;
	}

	public void setId(UUID uuid) {
		this.uuid = uuid;
	}

	public String getOriginalFilename() {
		return originalFilename;
	}

	public void setOriginalFilename(String originalFilename) {
		this.originalFilename = originalFilename;
	}
	
	public String getOriginalFileExtension() {
		return originalFileExtension;
	}

	public void setOriginalFileExtension(String originalFileExtension) {
		this.originalFileExtension = originalFileExtension;
	}

}
