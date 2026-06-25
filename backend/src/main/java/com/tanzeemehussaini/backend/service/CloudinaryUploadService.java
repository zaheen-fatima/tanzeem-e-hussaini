//package com.tanzeemehussaini.backend.service;
//
//import com.cloudinary.Cloudinary;
//import com.cloudinary.utils.ObjectUtils;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.util.Map;
//
//@Service
//@RequiredArgsConstructor
//public class CloudinaryUploadService {
//
//    private final Cloudinary cloudinary;
//
//    public String uploadVideo(MultipartFile file) {
//
//        try {
//            Map uploadResult = cloudinary.uploader().upload(
//                    file.getBytes(),
//                    ObjectUtils.asMap(
//                            "resource_type", "video",
//                            "folder", "tanzeem/videos"
//                    )
//            );
//
//            return uploadResult.get("secure_url").toString();
//
//        } catch (Exception e) {
//            throw new RuntimeException("Video upload failed");
//        }
//    }
//
//    public String uploadImage(MultipartFile file) {
//
//        try {
//            Map uploadResult = cloudinary.uploader().upload(
//                    file.getBytes(),
//                    ObjectUtils.asMap(
//                            "resource_type", "image",
//                            "folder", "tanzeem/images"
//                    )
//            );
//
//            return uploadResult.get("secure_url").toString();
//
//        } catch (Exception e) {
//            throw new RuntimeException("Image upload failed");
//        }
//    }
//}

package com.tanzeemehussaini.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryUploadService {

    private final Cloudinary cloudinary;

    public String uploadVideo(MultipartFile file) {

        try {
            if (file == null || file.isEmpty()) {
                throw new RuntimeException("No video file selected");
            }

            Map uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap(
                            "resource_type", "video",
                            "folder", "tanzeem/videos"
                    )
            );

            return uploadResult.get("secure_url").toString();

        } catch (Exception e) {
            throw new RuntimeException("Video upload failed: " + e.getMessage());
        }
    }

    public String uploadImage(MultipartFile file) {

        try {
            if (file == null || file.isEmpty()) {
                throw new RuntimeException("No image file selected");
            }

            Map uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap(
                            "resource_type", "image",
                            "folder", "tanzeem/images"
                    )
            );

            return uploadResult.get("secure_url").toString();

        } catch (Exception e) {
            throw new RuntimeException("Image upload failed: " + e.getMessage());
        }
    }
}