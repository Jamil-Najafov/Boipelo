package boipelo.restcontrollers;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.UUID;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import boipelo.domain.image.Image;
import boipelo.domain.user.User;
import boipelo.repositories.UserRepository;

@RestController
public class ProfilePictureUploadController {

	@Autowired
	private UserRepository userRepository;

	@Value("${folder.images}")
	private String imagesFolderPath;

	@RequestMapping(value = "/api/upload", method = RequestMethod.GET)
	public String provideUploadInfo() {
		return "You can upload a file by posting to this same URL.";
	}

	@RequestMapping(value = "/api/upload", method = RequestMethod.POST, produces = "text/plain; charset=utf-8")
	@ResponseStatus(HttpStatus.OK)
	public String handleFileUpload(@RequestParam("file") MultipartFile file) {

		Authentication authentication = SecurityContextHolder.getContext()
				.getAuthentication();

		if (authentication == null)
			return ("Not authorized.");

		if (file.isEmpty())
			return "You failed to upload " + file.getOriginalFilename()
					+ " because the file was empty.";

		String originalFilename = file.getOriginalFilename();

		String originalFileExtension = originalFilename.substring(file
				.getOriginalFilename().lastIndexOf("."));

		UUID uuid = UUID.randomUUID();
		User user = (User) authentication.getPrincipal();

		user = userRepository.findUserByLogin(user.getLogin());

		user.setProfilePicture(new Image(uuid, originalFilename, originalFileExtension));
		userRepository.save(user);

		try {

			file.transferTo(new File(imagesFolderPath + uuid
					+ originalFileExtension));

			return "You successfully uploaded " + originalFilename + "!";

		} catch (Exception e) {

			return "You failed to upload " + file.getOriginalFilename()
					+ " => " + e.getMessage();

		}
	}

	@RequestMapping(value = "/api/users/{userId}/profilepicture", method = RequestMethod.GET, headers = "Accept=image/jpeg, image/jpg, image/png, image/gif")
	@ResponseStatus(HttpStatus.OK)
	public HttpEntity<byte[]> getProfilePicture(@PathVariable Long userId)
			throws IOException {

		
		User user = userRepository.findOne(userId);
		Image profilePicture = user.getProfilePicture();
		
		File file;
		
		if (profilePicture == null){
			file = new File(imagesFolderPath + "defaultprofilepicture.png");
		}else{
		
			file = new File(imagesFolderPath + profilePicture.getId()
					+ profilePicture.getOriginalFileExtension());
		}

		FileInputStream inputStream = new FileInputStream(file);
		BufferedImage img = ImageIO.read(inputStream);
		ByteArrayOutputStream bao = new ByteArrayOutputStream();
		ImageIO.write(img, "png", bao);
		byte[] image = bao.toByteArray();
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.IMAGE_PNG); // or what ever type it is
		headers.setContentLength(image.length);
		
		return new HttpEntity<byte[]>(image, headers);

	}
}