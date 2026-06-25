package com.tanzeemehussaini.backend.controller;

import com.tanzeemehussaini.backend.service.CloudinaryUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/uploads")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UploadController {

    private final CloudinaryUploadService cloudinaryUploadService;

    @PostMapping("/video")
    public String uploadVideo(
            @RequestParam("file") MultipartFile file) {

        return cloudinaryUploadService.uploadVideo(file);
    }

    @PostMapping("/image")
    public String uploadImage(
            @RequestParam("file") MultipartFile file) {

        return cloudinaryUploadService.uploadImage(file);
    }
}